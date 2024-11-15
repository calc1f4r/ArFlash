# AOToken Specification

This document provides a comprehensive overview of the `AOToken-Specification.lua` file, which defines handlers for managing a fungible token using the `ao` framework. The contract includes handlers for token information, balance management, transfers, allowances, minting, and burning.

## Overview

The AOToken contract allows users to interact with a fungible token system, supporting functionalities similar to standard ERC20 tokens. Users can query token details, check balances, perform transfers, manage allowances, and control token supply through minting and burning (restricted to the contract owner).

## Handlers

### 1. **Info**

Retrieve general information about the token.

**Usage:**

```lua
Send({ Target = ao.id, Tags = { Action = "Info" } })
```

**Response:**

```lua
{
  Name = "TOKENNAME",
  Ticker = "COIN",
  Logo = "",
  Denomination = "10"
}
```

### 2. **Balances**

Retrieve the balances of all accounts.

**Usage:**

```lua
Send({ Target = ao.id, Tags = { Action = "Balances" } })
```

**Response:**

```lua
{
  "wallet1": balance1,
  "wallet2": balance2,
  -- ...
}
```

### 3. **Balance**

Check the balance of a specific account or the sender's account.

**Usage:**

```lua
-- Check balance of a specific account
Send({ Target = ao.id, Tags = { Action = "Balance", Target = "wallet_or_processid" } })

-- Check balance of the sender's account
Send({ Target = ao.id, Tags = { Action = "Balance" } })
Inbox[#Inbox].Tags
```

**Response:**

```lua
{
  Target = "wallet_or_processid",
  Balance = "10000",
  Ticker = "COIN"
}
```

### 4. **Transfer**

Transfer tokens to another wallet or process ID.

**Usage:**

```lua
Send({
  Target = ao.id,
  Tags = {
    Action = "Transfer",
    Recipient = "recipient_wallet_or_processid",
    Quantity = "10000"
  }
})
```

**Notifications:**

- **Debit Notice** to the sender:

  ```lua
  {
    Target = "sender_wallet_or_processid",
    Action = "Debit-Notice",
    Recipient = "recipient_wallet_or_processid",
    Quantity = "10000"
  }
  ```

- **Credit Notice** to the recipient:

  ```lua
  {
    Target = "recipient_wallet_or_processid",
    Action = "Credit-Notice",
    Sender = "sender_wallet_or_processid",
    Quantity = "10000"
  }
  ```

### 5. **Allowance**

Check the allowance set for a spender by the owner.

**Usage:**

```lua
Send({
  Target = ao.id,
  Tags = { Action = "Allowance", Spender = "spender_wallet_or_processid" }
})
```

**Response:**

```lua
{
  Owner = "your_wallet_or_processid",
  Spender = "spender_wallet_or_processid",
  Allowance = "5000"
}
```

### 6. **Approve**

Set the allowance for a spender.

**Usage:**

```lua
Send({
  Target = ao.id,
  Tags = {
    Action = "Approve",
    Spender = "spender_wallet_or_processid",
    Quantity = "500"
  }
})
```

**Response:**

```lua
{
  Action = "Approval",
  Spender = "spender_wallet_or_processid",
  Quantity = "5000"
}
```

### 7. **TransferFrom**

Transfer tokens from an account to another account using the allowance system.

**Usage:**

```lua
Send({
  Target = ao.id,
  Tags = {
    Action = "TransferFrom",
    from = "from_wallet_or_processid",
    to = "to_wallet_or_processid",
    Quantity = "3000"
  }
})
```

```lua
Send({Target = aotokenid, Tags = {Action = "TransferFrom", From = aotokenid, To = ao.id, Quantity = "30"}})
```

**Note:** The `msg.From` must have an allowance set by the `From` account to transfer tokens on their behalf. The `From` account should use the `Approve` function to set the allowance.

**Notifications:**

- **TransferFrom-Notice** to the sender (`msg.From`):

  ```lua
  {
    Action = "TransferFrom-Notice",
    From = "from_wallet_or_processid",
    To = "to_wallet_or_processid",
    Quantity = "3000"
  }
  ```

- **Debit Notice** to the from account:

  ```lua
  {
    Target = "from_wallet_or_processid",
    Action = "Debit-Notice",
    To = "to_wallet_or_processid",
    Quantity = "3000",
    Data = "Your tokens were transferred to to_wallet_or_processid"
  }
  ```

- **Credit Notice** to the to account:

  ```lua
  {
    Target = "to_wallet_or_processid",
    Action = "Credit-Notice",
    From = "from_wallet_or_processid",
    Quantity = "3000",
    Data = "You received tokens from from_wallet_or_processid"
  }
  ```

### 8. **Mint**

Mint new tokens and add them to the sender's balance.

**Usage:**

```lua
-- Only the process owner can mint tokens
Send({ Target = ao.id, Tags = { Action = "Mint", Quantity = "1000" } })
```

**Response:**

```lua
{
  Action = "Mint-Notice",
  Quantity = "1000",
  Balance = "new_balance"
}
```

### 9. **Burn**

Burn tokens from the sender's account.

**Usage:**

```lua
-- Only the process owner can burn tokens
Send({ Target = ao.id, Tags = { Action = "Burn", Quantity = "2000" } })
```

**Response:**

```lua
{
  Action = "Burn-Notice",
  Quantity = "2000",
  Balance = "new_balance"
}
```

## Notes

- The `TransferFrom` function uses the allowance system. The `Approve` function must be used by the owner to set an allowance for a spender (`msg.From`) before `TransferFrom` can be used.
- While the `Allowance` and `Approve` handlers are still present, they are not utilized by `TransferFrom`.
- Only the process owner (`env.Process.Id`) can perform `Mint` and `Burn` actions.

---

This document provides comprehensive examples and necessary documentation for interacting with the handlers defined in the `AOToken-Specification.lua` file, enabling effective management of a fungible token.
