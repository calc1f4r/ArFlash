--[[
    @title Flash Loan Protocol Implementation
    @notice Flash Loan Protocol Implementation on the Arweave blockchain
    @dev This module implements a flash loan protocol, allowing users to borrow and repay loans within a single transaction. 
    @version 1.0
    License: MIT
    Date: 2024-10-10
]]

-- Initialize protocol properties with default values if not set
FlashLoanPool = FlashLoanPool or {}   -- Mapping of token IDs to available liquidity
Fees = Fees or 0                      -- Total accumulated fees
Owner = Owner or ""                   -- Owner of the flash loan contract
local initialized = 0                 -- Initialization state

--[[
    @notice Checks if the protocol has been initialized.
    @return boolean - Returns true if initialized, false otherwise.
]]
local function requireInitialized()
    if initialized == 0 then
        print("Protocol not initialized!")
        return false
    end
    return true
end

--[[
    @notice Checks if the message sender is the owner.
    @param msg - The message containing the sender information.
    @return boolean - Returns true if the sender is the owner, false otherwise.
]]
local function requireOwner(msg)
    if msg.from ~= Owner then
        print("Only the owner can perform this action!")
        Handlers.utils.reply("Only the owner can perform this action!")(msg)
        return false
    end
    return true
end

--[[
    @notice Adds liquidity to the flash loan pool for a specific token.
    @param tokenId string - The ID of the token.
    @param amount number - The amount of tokens to add.
]]
local function addLiquidity(tokenId, amount)
    FlashLoanPool[tokenId] = (FlashLoanPool[tokenId] or 0) + amount
end

--[[
    @notice Removes liquidity from the flash loan pool for a specific token.
    @param tokenId string - The ID of the token.
    @param amount number - The amount of tokens to remove.
    @return boolean - Returns true if successful, false otherwise.
]]
local function removeLiquidity(tokenId, amount)
    local available = FlashLoanPool[tokenId] or 0
    if available >= amount then
        FlashLoanPool[tokenId] = available - amount
        return true
    else
        return false
    end
end

-- Handler for initializing the flash loan protocol
-- @notice Initializes the flash loan protocol. Can only be called once.
-- @param msg Contains the initialization parameters.
Handlers.add(
    "Initialize",
    Handlers.utils.hasMatchingTag("Action", "Initialize"),
    function (msg)
        if initialized == 1 then
            print("Protocol already initialized!")
            Handlers.utils.reply("Protocol already initialized!")(msg)
            return
        end
        Owner = msg.from
        initialized = 1
        print("Flash loan protocol initialized by " .. Owner)
        Handlers.utils.reply("Protocol initialized!")(msg)
    end
)

-- Handler for depositing liquidity
-- @notice Deposits liquidity into the flash loan pool.
-- @param msg Contains the deposit parameters: tokenId, amount
Handlers.add(
    "Deposit",
    Handlers.utils.hasMatchingTag("Action", "Deposit"),
    function (msg)
        if not requireInitialized() then return end
        local tokenId = msg.tokenId
        local amount = msg.amount
        -- Transfer tokens from the sender to the protocol
        Send({
            Target = tokenId,
            Action = "Transfer",
            from = msg.from,
            to = ao.id,
            value = amount
        })
        -- Update the liquidity pool
        addLiquidity(tokenId, amount)
        print("Deposited " .. amount .. " tokens of " .. tokenId)
        Handlers.utils.reply("Deposit successful!")(msg)
    end
)

-- Handler for withdrawing liquidity
-- @notice Withdraws liquidity from the flash loan pool.
-- @param msg Contains the withdrawal parameters: tokenId, amount
Handlers.add(
    "Withdraw",
    Handlers.utils.hasMatchingTag("Action", "Withdraw"),
    function (msg)
        if not requireInitialized() or not requireOwner(msg) then return end
        local tokenId = msg.tokenId
        local amount = msg.amount
        if removeLiquidity(tokenId, amount) then
            -- Transfer tokens from the protocol to the owner
            Send({
                Target = tokenId,
                Action = "Transfer",
                from = ao.id,
                to = msg.from,
                value = amount
            })
            print("Withdrew " .. amount .. " tokens of " .. tokenId)
            Handlers.utils.reply("Withdrawal successful!")(msg)
        else
            print("Insufficient liquidity to withdraw!")
            Handlers.utils.reply("Insufficient liquidity!")(msg)
        end
    end
)

-- Handler for executing a flash loan
-- @notice Executes a flash loan for a specific token and amount.
-- @param msg Contains the flash loan parameters: tokenId, amount, callback
Handlers.add(
    "FlashLoan",
    Handlers.utils.hasMatchingTag("Action", "FlashLoan"),
    function (msg)
        if not requireInitialized() then return end
        local tokenId = msg.tokenId
        local amount = msg.amount
        local fee = amount * 0.001  -- Assuming a fee of 0.1%
        local totalRepayment = amount + fee

        local available = FlashLoanPool[tokenId] or 0
        if available < amount then
            print("Insufficient liquidity for flash loan!")
            Handlers.utils.reply("Insufficient liquidity for flash loan!")(msg)
            return
        end

        -- Transfer the tokens to the borrower
        Send({
            Target = tokenId,
            Action = "Transfer",
            from = ao.id,
            to = msg.from,
            value = amount
        })

        -- Execute the callback action provided by the borrower
        if msg.callback then
            msg.callback()
        end

        -- Simulate repayment of the loan
        -- Here we assume the borrower has performed necessary actions and repaid the loan
        -- In a real implementation, you'd verify the repayment within the same transaction

        -- Update the liquidity pool with the repaid amount
        addLiquidity(tokenId, fee)  -- Only the fee is added as profit
        print("Flash loan of " .. amount .. " " .. tokenId .. " repaid with fee " .. fee)
        Handlers.utils.reply("Flash loan executed successfully!")(msg)
    end
)

-- Handler for checking the available liquidity
-- @notice Returns the available liquidity for a specific token.
-- @param msg Contains the liquidity parameters: tokenId
Handlers.add(
    "GetLiquidity",
    Handlers.utils.hasMatchingTag("Action", "GetLiquidity"),
    function (msg)
        if not requireInitialized() then return end
        local tokenId = msg.tokenId
        local available = FlashLoanPool[tokenId] or 0
        print("Available liquidity for " .. tokenId .. " is " .. available)
        Handlers.utils.reply(tostring(available))(msg)
    end
)

-- Handler for checking total fees accumulated
-- @notice Returns the total fees accumulated by the protocol.
-- @param msg Contains the fee parameters
Handlers.add(
    "GetFees",
    Handlers.utils.hasMatchingTag("Action", "GetFees"),
    function (msg)
        if not requireInitialized() then return end
        print("Total fees accumulated: " .. Fees)
        Handlers.utils.reply(tostring(Fees))(msg)
    end
)

-- Handler for owner to withdraw accumulated fees
-- @notice Allows the owner to withdraw accumulated fees.
-- @param msg Contains the withdrawal parameters
Handlers.add(
    "WithdrawFees",
    Handlers.utils.hasMatchingTag("Action", "WithdrawFees"),
    function (msg)
        if not requireInitialized() or not requireOwner(msg) then return end
        local amount = Fees
        Fees = 0
        -- Transfer fees to the owner
        -- Assuming fees are accumulated in a specific token
        Send({
            Target = "BaseToken",
            Action = "Transfer",
            from = ao.id,
            to = msg.from,
            value = amount
        })
        print("Withdrawn fees: " .. amount)
        Handlers.utils.reply("Fees withdrawn!")(msg)
    end
)