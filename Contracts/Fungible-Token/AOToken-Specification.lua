local json = require('json')

-- Initialize Balances and Allowances tables if they don't exist
if not Balances then Balances = {} end
if not Allowances then Allowances = {} end

-- Set token name if not already set
if Name ~= 'TOKENNAME' then Name = 'TOKENNAME' end

-- Set token symbol if not already set
if Ticker ~= 'COIN' then Ticker = 'COIN' end

-- Set token denomination if not already set
if Denomination ~= 10 then Denomination = 10 end

-- Set token logo if not already set
if not Logo then Logo = '' end

-- Handler for 'info' action
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send({
    Target = msg.From,
    Tags = { Name = Name, Ticker = Ticker, Logo = Logo, Denomination = tostring(Denomination) }
  })
end)

-- Handler for 'balances' action
Handlers.add('balances', Handlers.utils.hasMatchingTag('Action', 'Balances'), function(msg)
  ao.send({ Target = msg.From, Data = json.encode(Balances) })
end)

-- Handler for 'balance' action
Handlers.add('balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), function(msg)
  local bal = '0'

  -- If Target is provided, return the Target's balance, otherwise return the Sender's balance
  if (msg.Tags.Target and Balances[msg.Tags.Target]) then
    bal = tostring(Balances[msg.Tags.Target])
  elseif Balances[msg.From] then
    bal = tostring(Balances[msg.From])
  end

  local targetAccount = msg.Tags.Target or msg.From

  ao.send({
    Target = msg.From,
    Tags = { Target = targetAccount, Balance = bal, Ticker = Ticker, Data = json.encode(tonumber(bal)) }
  })
end)

-- Handler for 'transfer' action
Handlers.add('transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), function(msg)
  assert(type(msg.Tags.Recipient) == 'string', 'Recipient is required!')
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

  if not Balances[msg.From] then Balances[msg.From] = 0 end
  if not Balances[msg.Tags.Recipient] then Balances[msg.Tags.Recipient] = 0 end

  local qty = tonumber(msg.Tags.Quantity)
  assert(type(qty) == 'number', 'qty must be number')

  if Balances[msg.From] >= qty then
    Balances[msg.From] = Balances[msg.From] - qty
    Balances[msg.Tags.Recipient] = Balances[msg.Tags.Recipient] + qty

    -- Only send notifications if the Cast tag is not set
    if not msg.Tags.Cast then
      -- Debit-Notice message template
      local debitNotice = {
        Target = msg.From,
        Action = 'Debit-Notice',
        Recipient = msg.Recipient,
        Quantity = tostring(qty),
        Data = Colors.gray ..
            "You transferred " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " to " .. Colors.green .. msg.Recipient .. Colors.reset
      }
      -- Credit-Notice message template
      local creditNotice = {
        Target = msg.Recipient,
        Action = 'Credit-Notice',
        Sender = msg.From,
        Quantity = tostring(qty),
        Data = Colors.gray ..
            "You received " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " from " .. Colors.green .. msg.From .. Colors.reset
      }

      -- Add forwarded tags to the credit and debit notice messages
      for tagName, tagValue in pairs(msg) do
        if string.sub(tagName, 1, 2) == "X-" then
          debitNotice[tagName] = tagValue
          creditNotice[tagName] = tagValue
        end
      end

      -- Send Debit-Notice and Credit-Notice
      ao.send(debitNotice)
      ao.send(creditNotice)
    end
  else
    ao.send({
      Target = msg.Tags.From,
      Tags = { Action = 'Transfer-Error', ['Message-Id'] = msg.Id, Error = 'Insufficient Balance!' }
    })
  end
end)

-- Handler for 'allowance' action
Handlers.add('allowance', Handlers.utils.hasMatchingTag('Action', 'Allowance'), function(msg)
  local allowance = '0'
  if Allowances[msg.From] and Allowances[msg.From][msg.Tags.Spender] then
    allowance = tostring(Allowances[msg.From][msg.Tags.Spender])
  end

  ao.send({
    Target = msg.From,
    Tags = { Owner = msg.From, Spender = msg.Tags.Spender, Allowance = allowance }
  })
end)

-- Handler for 'approve' action
Handlers.add('approve', Handlers.utils.hasMatchingTag('Action', 'Approve'), function(msg)
  assert(type(msg.Tags.Spender) == 'string', 'Spender is required!')
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

  if not Allowances[msg.From] then Allowances[msg.From] = {} end

  local qty = tonumber(msg.Tags.Quantity)
  assert(type(qty) == 'number', 'qty must be number')

  Allowances[msg.From][msg.Tags.Spender] = qty

  ao.send({
    Target = msg.From,
    Tags = { Action = 'Approval', Spender = msg.Tags.Spender, Quantity = tostring(qty) }
  })
end)

-- Handler for 'transferFrom' action
Handlers.add('transferFrom', Handlers.utils.hasMatchingTag('Action', 'TransferFrom'), function(msg)
  assert(type(msg.Tags.from) == 'string', 'From is required!')
  assert(type(msg.Tags.to) == 'string', 'To is required!')
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

  -- Convert quantity to number
  local from = msg.Tags.from
  local to = msg.Tags.to
  local qty = tonumber(msg.Tags.Quantity)
  assert(qty ~= nil, 'Quantity must be a valid number!')
  assert(qty > 0, 'Quantity must be greater than zero!')

  -- Ensure balances and allowances tables exist
  if not Balances[from] then Balances[from] = 0 end
  if not Balances[to] then Balances[to] = 0 end
  if not Allowances[from] then Allowances[from] = {} end

  -- Check allowance and balances
  local allowance = Allowances[from][msg.From] or 0
  assert(allowance >= qty, 'Allowance exceeded!')
  assert(Balances[from] >= qty, 'Insufficient Balance!')

  -- Perform transfer
  Balances[from] = Balances[from] - qty
  Balances[to] = Balances[to] + qty
  Allowances[from][msg.From] = allowance - qty

  -- Send success notifications
  ao.send({
    Target = msg.From,
    Tags = {
      Action = 'TransferFrom-Notice',
      From = from,
      To = to,
      Quantity = tostring(qty)
    }
  })
  ao.send({
    Target = from,
    Tags = {
      Action = 'Debit-Notice',
      To = to,
      Quantity = tostring(qty),
      Data = "Your tokens were transferred to " .. to
    }
  })
  ao.send({
    Target = to,
    Tags = {
      Action = 'Credit-Notice',
      From = from,
      Quantity = tostring(qty),
      Data = "You received tokens from " .. from
    }
  })
end)

-- Handler for 'mint' action
Handlers.add('mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), function(msg)
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')
  local qty = tonumber(msg.Tags.Quantity)
  assert(type(qty) == 'number', 'qty must be number')

  if msg.From == env.Process.Id then
    -- Add tokens to the token pool, according to Quantity
    Balances[msg.From] = Balances[msg.From] + qty
    ao.send({
      Target = msg.From,
      Tags = { Action = 'Mint-Notice', Quantity = tostring(qty), Balance = tostring(Balances[msg.From]) }
    })
  else
    ao.send({
      Target = msg.From,
      Tags = { Action = 'Mint-Error', ['Message-Id'] = msg.Id, Error = 'Unauthorized minting attempt!' }
    })
  end
end)

-- Handler for 'burn' action
Handlers.add('burn', Handlers.utils.hasMatchingTag('Action', 'Burn'), function(msg)
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')
  local qty = tonumber(msg.Tags.Quantity)
  assert(type(qty) == 'number', 'qty must be number')

  if msg.From == env.Process.Id then
    if not Balances[msg.From] then Balances[msg.From] = 0 end

    if Balances[msg.From] >= qty then
      Balances[msg.From] = Balances[msg.From] - qty

      ao.send({
        Target = msg.From,
        Tags = { Action = 'Burn-Notice', Quantity = tostring(qty), Balance = tostring(Balances[msg.From]) }
      })
    else
      ao.send({
        Target = msg.From,
        Tags = { Action = 'Burn-Error', ['Message-Id'] = msg.Id, Error = 'Insufficient Balance!' }
      })
    end
  else
    ao.send({
      Target = msg.From,
      Tags = { Action = 'Burn-Error', ['Message-Id'] = msg.Id, Error = 'Unauthorized burning attempt!' }
    })
  end
end)


