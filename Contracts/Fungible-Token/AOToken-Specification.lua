local json = require('json')

if not Balances then Balances = {} end
if not Allowances then Allowances = {} end

if Name ~= 'TOKENNAME' then Name = 'TOKENNAME' end


-- Symbol
if Ticker ~= 'COIN' then Ticker = 'COIN' end

-- The number of the token that should be treated as a single unit when quantities and balances are displayed to users.	
if Denomination ~= 10 then Denomination = 10 end


-- lOGO link
if not Logo then Logo = '' end

Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send({
    Target = msg.From,
    Tags = { Name = Name, Ticker = Ticker, Logo = Logo, Denomination = tostring(Denomination) }
  })
end)

Handlers.add('balances', Handlers.utils.hasMatchingTag('Action', 'Balances'),
             function(msg) ao.send({ Target = msg.From, Data = json.encode(Balances) }) end)


Handlers.add('balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), function(msg)
  local bal = '0'

  -- If not Target is provided, then return the Senders balance
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

    --[[
      Only Send the notifications to the Sender and Recipient
      if the Cast tag is not set on the Transfer message
    ]] --
    if not msg.Tags.Cast then
      -- Debit-Notice message template, that is sent to the Sender of the transfer
      local debitNotice = {
        Target = msg.From,
        Action = 'Debit-Notice',
        Recipient = msg.Recipient,
        Quantity = tostring(qty),
        Data = Colors.gray ..
            "You transferred " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " to " .. Colors.green .. msg.Recipient .. Colors.reset
      }
      -- Credit-Notice message template, that is sent to the Recipient of the transfer
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
        -- Tags beginning with "X-" are forwarded
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

Handlers.add('transferFrom', Handlers.utils.hasMatchingTag('Action', 'TransferFrom'), function(msg)
  assert(type(msg.Tags.Owner) == 'string', 'Owner is required!')
  assert(type(msg.Tags.Recipient) == 'string', 'Recipient is required!')
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

  local owner = msg.Tags.Owner
  local recipient = msg.Tags.Recipient
  local qty = tonumber(msg.Tags.Quantity)
  assert(type(qty) == 'number', 'Quantity must be a number')

  if not Balances[owner] then Balances[owner] = 0 end
  if not Balances[recipient] then Balances[recipient] = 0 end
  if not Allowances[owner] then Allowances[owner] = {} end

  local allowance = Allowances[owner][msg.From] or 0
  assert(allowance >= qty, 'Allowance exceeded')

  if Balances[owner] >= qty then
    Balances[owner] = Balances[owner] - qty
    Balances[recipient] = Balances[recipient] + qty
    Allowances[owner][msg.From] = allowance - qty

    -- Send notifications
    ao.send({
      Target = msg.From,
      Tags = {
        Action = 'TransferFrom-Notice',
        Owner = owner,
        Recipient = recipient,
        Quantity = tostring(qty)
      }
    })
    ao.send({
      Target = owner,
      Action = 'Debit-Notice',
      Tags = {
        Recipient = recipient,
        Quantity = tostring(qty),
        Data = "Your tokens were transferred to " .. recipient
      }
    })
    ao.send({
      Target = recipient,
      Action = 'Credit-Notice',
      Tags = {
        Sender = owner,
        Quantity = tostring(qty),
        Data = "You received tokens from " .. owner
      }
    })
  else
    ao.send({
      Target = msg.From,
      Tags = {
        Action = 'TransferFrom-Error',
        ['Message-Id'] = msg.Id,
        Error = 'Insufficient Balance!'
      }
    })
  end
end)

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


