local json = require('json')
if not TotalLiquidity then TotalLiquidity = 0 end
if not FEE_BPS then FEE_BPS = 7 end
-- Arflash token
if not Token then Token = "AOPvl2mFYyTlxUk1pqMYVgPNueFaC_7dxBMOo64oY0A" end

-- Initialize LiquidityProviders if not defined
if not LiquidityProviders then LiquidityProviders = {} end


-- Add Liquidity Handler
Handlers.add('addLiquidity', Handlers.utils.hasMatchingTag('Action', 'addLiquidity'), function(msg)
  local amount = tonumber(msg.Tags.amount)
  assert(amount and amount > 0, 'Invalid or missing liquidity amount')

  if not LiquidityProviders[msg.From] then LiquidityProviders[msg.From] = 0 end

  local amount=tostring(amount)
  ao.send({
    Target = Token,
    Tags = {
      Action = "TransferFrom",
      from = msg.From,
      to = ao.id,
      Quantity = amount
    }
  })


--   -- Update balances
  LiquidityProviders[msg.From] = LiquidityProviders[msg.From] + amount
  TotalLiquidity = TotalLiquidity + amount

  ao.send({
    Target = msg.From,
    Tags = { Action = 'LiquidityAdded', Provider = msg.From, Amount = tostring(amount) }
  })
end
)
-- Liquidity Retrieval Handler
Handlers.add('liquidity', Handlers.utils.hasMatchingTag('Action', 'Liquidity'), function(msg)
  local liquidity = '0'

  -- Check for a specific target account; otherwise, use sender's account
  local targetAccount = msg.Tags.Target or msg.From

  if LiquidityProviders[targetAccount] then
    liquidity = tostring(LiquidityProviders[targetAccount])
  end

  -- Respond with the liquidity details
  ao.send({
    Target = msg.From,
    Tags = {
      Action = 'LiquidityDetails',
      Target = targetAccount,
      Liquidity = liquidity,
      Data=json.encode(tonumber(liqudity))
    }
  })
end)

-- Remove Liquidity Handler
Handlers.add('removeLiquidity', Handlers.utils.hasMatchingTag('Action', 'RemoveLiquidity'), function(msg)
  local amount = tonumber(msg.Tags.Amount)
  assert(amount and amount > 0, 'Invalid amount')
  assert(LiquidityProviders[msg.From] and LiquidityProviders[msg.From] >= amount, 'Insufficient provider balance')
  assert(TotalLiquidity >= amount, 'Insufficient total liquidity')

  -- Update balances
  LiquidityProviders[msg.From] = LiquidityProviders[msg.From] - amount
  TotalLiquidity = TotalLiquidity - amount

  -- Transfer tokens back to provider
  ao.send({
    Target = Token,
    Tags = {
      Action = "Transfer",
      Recipient = msg.From,
      Quantity = tostring(amount)
    }
  })

  -- Emit event
  ao.send({
    Target = msg.From,
    Tags = { Action = 'LiquidityRemoved', Provider = msg.From, Amount = tostring(amount) }
  })
end)

-- -- Flash Loan Handler
-- Handlers.add('requestLoan', Handlers.utils.hasMatchingTag('Action', 'FlashLoan'), function(msg)
--   local amount = tonumber(msg.Tags.Amount)
--   local receiverAddress = msg.Tags.Receiver
--   assert(amount and amount > 0, 'Invalid loan amount')
--   assert(receiverAddress, 'Receiver address missing')
--   assert(TotalLiquidity >= amount, 'Insufficient liquidity in pool')

--   local fee = math.ceil(amount * FEE_BPS / 10000)
--   local totalRepayment = amount + fee

--   -- Check balance before transfer
--   local balanceBefore = tonumber(ao.Send({
--     Target = Token,
--     Tags = { Action = "BalanceOf", Account = ao.id }
--   }).receive().Tags.Balance)

--   -- Transfer funds to borrower
--   ao.Send({
--     Target = Token,
--     Tags = {
--       Action = "Transfer",
--       Recipient = receiverAddress,
--       Quantity = tostring(amount)
--     }
--   })

--   -- Notify borrower about the loan details
--   ao.Send({
--     Target = receiverAddress,
--     Tags = {
--       Action = 'OnLoanReceived',
--       Amount = tostring(amount),
--       Fee = tostring(fee),
--       TokenProcessId = ao.id
--     }
--   })

--   -- Check balance after repayment
--   local balanceAfter = tonumber(ao.Send({
--     Target = Token,
--     Tags = { Action = "BalanceOf", Account = ao.id }
--   }).receive().Tags.Balance)

--   -- Validate repayment with fee
--   assert(balanceAfter  >= totalRepayment, 'Loan repayment validation failed')

--   -- Emit event for successful loan
--   ao.Send({
--     Target = receiverAddress,
--     Tags = { Action = 'LoanRepaid', Amount = tostring(amount), Fee = tostring(fee) }
--   })
-- end)
