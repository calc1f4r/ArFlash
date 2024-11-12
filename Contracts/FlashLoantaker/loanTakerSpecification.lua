Handlers.add('onloanrecieved', Handlers.utils.hasMatchingTag('Action', 'LoanReceived'), function(msg)
    local quantity = tonumber(msg.Tags.Quantity)
    local tokenProcessId = msg.Tags.TokenProcessId -- Get TokenProcessId from message tags
    local feePercentage = tonumber(msg.Tags.Fee) -- Get Fee percentage from message tags
    assert(type(quantity) == 'number', 'Quantity must be a number')
    assert(type(tokenProcessId) == 'string', 'TokenProcessId must be a string')
    assert(type(feePercentage) == 'number', 'Fee must be a number')

    local feeAmount = quantity * feePercentage / 100
    local totalApprove = quantity + feeAmount

    -- Transfer tokens from msg.From to this contract using TransferFrom
    ao.send({
        Target = tokenProcessId, -- Use TokenProcessId from parameter
        Tags = {
            Action = 'TransferFrom',
            Owner = msg.From,
            Recipient = ao.id,
            Quantity = tostring(quantity)
        }
    })


--[[
Perform whatever you want to do with the received tokens here
For example, you can use the received tokens to provide liquidity to a pool, or to trade on a DEX

--]]

    -- Approve msg.From to spend the quantity received plus fees
    ao.send({
        Target = tokenProcessId, -- Use TokenProcessId from parameter
        Tags = {
            Action = 'Approve',
            Spender = msg.From,
            Quantity = tostring(totalApprove)
        }
    })
end)
