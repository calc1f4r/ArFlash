-- ...existing code...

-- Handler to initiate a flashloan
Handlers.add('flashLoan', Handlers.utils.hasMatchingTag('Action', 'FlashLoan'), function(msg)
    local token = msg.Tags.Token
    local amount = tonumber(msg.Tags.Amount)
    local borrower = msg.From
    local data = msg.Tags.Data

    if not self.liquidityPool[token] or self.liquidityPool[token] < amount then
        ao.send({
            Target = borrower,
            Tags = { Action = 'FlashLoanError', Error = 'Insufficient liquidity' }
        })
        return
    end

    self.liquidityPool[token] = self.liquidityPool[token] - amount
    self:_transfer(borrower, token, amount)

    -- Execute borrower callback
    borrower:onFlashLoan(self, token, amount, data)

    -- Verify repayment
    if not self.liquidityPool[token] or self.liquidityPool[token] < amount then
        error("Flashloan not repaid")
    end

    ao.send({
        Target = borrower,
        Tags = { Action = 'FlashLoanSuccess' }
    })
end)

-- Handler to repay a flashloan
Handlers.add('repayFlashLoan', Handlers.utils.hasMatchingTag('Action', 'RepayFlashLoan'), function(msg)
    local token = msg.Tags.Token
    local amount = tonumber(msg.Tags.Amount)

    if not self.liquidityPool[token] then
        self.liquidityPool[token] = 0
    end

    self.liquidityPool[token] = self.liquidityPool[token] + amount

    ao.send({
        Target = msg.From,
        Tags = { Action = 'RepayFlashLoanSuccess' }
    })
end)

-- ...existing code...
