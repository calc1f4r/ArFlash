--[[
    @title ERC20 Token Implementation
    @notice ERC20 Token Implementation for aos Tokens on the Arweave blockchain
    @dev This module implements the ERC20 token standard, providing functionalities such as transfers, approvals, and allowances inspired by openzeppelin contracts in solidity. 
    @version 1.0
    License: MIT
    Date: 2024-10-09
    ]]

    -- Initialize token properties with default values if not set
    Name = Name or ""              -- Token name (e.g., "MyToken")
    Symbol = Symbol or ""          -- Token symbol (e.g., "MTK")
    Balances = Balances or {}      -- Mapping of addresses to token balances
    TotalSupply = TotalSupply or 0 -- Total number of tokens in circulation
    Allowances = Allowances or {}  -- Nested mapping of owner => spender => amount
    Owner= Owner or ""             -- Owner of the token contract
    -- Track initialization state to prevent multiple initializations
    local initialized = 0

    --[[
    @notice Checks if the token contract has been initialized.
    @return boolean - Returns true if initialized, false otherwise.
    ]]
    local function requireInitialized()
        if initialized == 0 then
            print("Token not initialized!")
            return false
        end
        return true
    end

    --[[
    @notice Checks if the message sender is the owner.
    @param msg.table - The message containing the sender information.
    @return boolean - Returns true if the sender is the owner, false otherwise.
    ]]
    local function requireOwner(msg)
        if msg.from == Owner then
            print("Only the owner can perform this action!")
            Handlers.utils.reply("Only the owner can perform this action!")(msg)
            return false
        end
        return true
    end

    --[[
    @notice Retrieves the token balance of a specified account.
    @param account string - The address of the account.
    @return number - The token balance of the account.
    ]]
    local function getBalance(account)
        return Balances[account] or 0
    end

    --[[
    @notice Updates the token balance of a specified account.
    @param account string - The address of the account.
    @param amount number - The new balance amount.
    ]]
    local function updateBalance(account, amount)
        Balances[account] = amount
    end

    --[[
    @notice Adjusts the token balance of a specified account by a given amount.
    @param account string - The address of the account.
    @param amount number - The amount to adjust (positive to increase, negative to decrease).
    ]]
    local function adjustBalance(account, amount)
        local balance = getBalance(account)
        updateBalance(account, balance + amount)
    end

    --[[
    @notice Retrieves the allowance set by an owner for a spender.
    @param owner string - The address of the token owner.
    @param spender string - The address authorized to spend the tokens.
    @return number - The remaining allowance.
    ]]
    local function getAllowance(owner, spender)
        if Allowances[owner] and Allowances[owner][spender] then
            return Allowances[owner][spender]
        else
            return 0
        end
    end

    --[[
    @notice Sets the allowance for a spender to spend tokens on behalf of an owner.
    @param owner string - The address of the token owner.
    @param spender string - The address authorized to spend the tokens.
    @param amount number - The amount to set as allowance.
    ]]
    local function setAllowance(owner, spender, amount)
        Allowances[owner] = Allowances[owner] or {}
        Allowances[owner][spender] = amount
    end

    -- Handler for initializing the token
    -- @notice Initializes the token with a name and symbol. Can only be called once.
    -- @param msg.table Contains the initialization parameters: name, symbol
    Handlers.add(
        "Initialize",
        Handlers.utils.hasMatchingTag("Action", "Initialize"),
        function (msg)
            print("Initializing token...")
            if initialized == 1 then
                print("Already initialized!")
                Handlers.utils.reply("Already initialized!")(msg)
                return 
            end
            Name = msg.name or Name
            Symbol = msg.symbol or Symbol
            initialized = 1
            print("Process initialized with Name: " .. Name .. " and Symbol: " .. Symbol)
            Handlers.utils.reply("Process initialized!")(msg)
        end
    )

    -- Handler for minting new tokens
    -- @notice Mints new tokens to a specified address, increasing the total supply.
    -- @param msg.table Contains the minting parameters: to, value
    Handlers.add(
        "Mint",
        Handlers.utils.hasMatchingTag("Action", "Mint"),
        function (msg)
            if not requireInitialized() or not requireOwner(msg) then return end
            local to = msg.account
            local value = msg.value

            -- Increase the balance of the recipient
            adjustBalance(to, value)
            -- Increase the total supply
            TotalSupply = TotalSupply + value

            print("Minted " .. value .. " tokens to " .. to)
            Handlers.utils.reply("Mint successful!")(msg)
        end
    )

    -- Handler for burning tokens
    -- @notice Burns tokens from a specified address, decreasing the total supply.
    -- @param msg.table Contains the burning parameters: from, value
    Handlers.add(
        "Burn",
        Handlers.utils.hasMatchingTag("Action", "Burn"),
        function (msg)
            print("In burning function")
            if not requireInitialized() or not requireOwner(msg) then return end
            local from = msg.account
            local value = msg.value

            -- Check if the sender has enough balance
            if getBalance(from) < value then
                print("Insufficient balance to burn!")
                Handlers.utils.reply("Insufficient balance!")(msg)
                return
            end

            -- Decrease the balance of the sender
            -- adjustBalance(from, -value)
            -- -- Decrease the total supply
            -- TotalSupply = TotalSupply - value

            -- print("Burned " .. value .. " tokens from " .. from)
            -- Handlers.utils.reply("Burn successful!")(msg)
        end
    )

    -- Handler for transferring tokens
    -- @notice Transfers tokens from one address to another.
    -- @param msg.table Contains the transfer parameters: from, to, value
    Handlers.add(
        "Transfer",
        Handlers.utils.hasMatchingTag("Action", "Transfer"),
        function (msg)
            if not requireInitialized() then return end
            local from = msg.from
            local to = msg.to
            local value = msg.value

            -- Check if the sender has enough balance
            if getBalance(from) < value then
                print("Insufficient balance to transfer!")
                Handlers.utils.reply("Insufficient balance!")(msg)
                return
            end

            -- Transfer the tokens
            adjustBalance(from, -value)
            adjustBalance(to, value)

            print("Transferred " .. value .. " tokens from " .. from .. " to " .. to)
            Handlers.utils.reply("Transfer successful!")(msg)
        end
    )

    -- Handler for approving a spender
    -- @notice Approves a spender to withdraw tokens from the owner's account, up to the specified value.
    -- @param msg.table Contains the approval parameters: owner, spender, value
    Handlers.add(
        "Approve",
        Handlers.utils.hasMatchingTag("Action", "Approve"),
        function (msg)
            if not requireInitialized() then return end
            local owner = msg.owner
            local spender = msg.spender
            local value = msg.value

            -- Set the allowance
            setAllowance(owner, spender, value)

            print(owner .. " approved " .. spender .. " to spend " .. value .. " tokens")
            Handlers.utils.reply("Approval successful!")(msg)
        end
    )

    -- Handler for transferring tokens using allowance
    -- @notice Allows a spender to transfer tokens from an owner's account to another account, using the allowance mechanism.
    -- @param msg.table Contains the transferFrom parameters: spender, from, to, value
    Handlers.add(
        "TransferFrom",
        Handlers.utils.hasMatchingTag("Action", "TransferFrom"),
        function (msg)
            if not requireInitialized() then return end
            local spender = msg.spender
            local from = msg.from
            local to = msg.to
            local value = msg.value

            -- Check if the spender has enough allowance
            local allowance = getAllowance(from, spender)
            if allowance < value then
                print("Allowance exceeded!")
                Handlers.utils.reply("Allowance exceeded!")(msg)
                return
            end

            -- Check if the owner has enough balance
            if getBalance(from) < value then
                print("Insufficient balance in owner's account!")
                Handlers.utils.reply("Insufficient balance!")(msg)
                return
            end

            -- Transfer the tokens
            adjustBalance(from, -value)
            adjustBalance(to, value)
            -- Decrease the allowance
            setAllowance(from, spender, allowance - value)

            print(spender .. " transferred " .. value .. " tokens from " .. from .. " to " .. to)
            Handlers.utils.reply("TransferFrom successful!")(msg)
        end
    )

    -- Handler for checking the balance of an account
    -- @notice Returns the token balance of a specified address.
    -- @param msg.table Contains the balanceOf parameters: account
    Handlers.add(
        "BalanceOf",
        Handlers.utils.hasMatchingTag("Action", "BalanceOf"),
        function (msg)
            if not requireInitialized() then return end
            local account = msg.account
            local balance = getBalance(account)

            print("Balance of " .. account .. " is " .. balance)
            Handlers.utils.reply(tostring(balance))(msg)
        end
    )

    -- Handler for getting the total supply of tokens
    -- @notice Returns the total supply of tokens in circulation.
    -- @param msg.table Contains the totalSupply parameters: Target, Action
       Handlers.add(
        "TotalSupply",
        Handlers.utils.hasMatchingTag("Action", "TotalSupply"),
        function (msg)
            if not requireInitialized() then return end

            print("TotalSupply is " .. TotalSupply)
            Handlers.utils.reply(tostring(TotalSupply))(msg)
        end
    )

    -- Handler for getting the name of the token
    -- @notice Returns the name of the token.
    -- @param msg.table Contains the name parameters: Target, Action
    Handlers.add(
        "Name",
        Handlers.utils.hasMatchingTag("Action", "Name"),
        function (msg)
            if not requireInitialized() then return end

            print("Token name is " .. Name)
            Handlers.utils.reply(Name)(msg)
        end
    )

    -- Handler for getting the symbol of the token
    -- @notice Returns the symbol of the token.
    -- @param msg.table Contains the symbol parameters: Target, Action
    Handlers.add(
        "Symbol",
        Handlers.utils.hasMatchingTag("Action", "Symbol"),
        function (msg)
            if not requireInitialized() then return end

            print("Token symbol is " .. Symbol)
            Handlers.utils.reply(Symbol)(msg)
        end
    )

    -- Handler for checking the allowance
    -- @notice Returns the remaining number of tokens that a spender is allowed to spend on behalf of an owner.
    -- @param msg.table Contains the allowance parameters: owner, spender
    Handlers.add(
        "Allowance",
        Handlers.utils.hasMatchingTag("Action", "Allowance"),
        function (msg)
            if not requireInitialized() then return end
            local owner = msg.owner
            local spender = msg.spender
            local remaining = getAllowance(owner, spender)

            print("Allowance from " .. owner .. " to " .. spender .. " is " .. remaining)
            Handlers.utils.reply(tostring(remaining))(msg)
        end
    )