# ERC20 Token Handlers Documentation

This document provides an overview of all the handlers available in the `Token.lua` ERC20 token implementation on the Arweave blockchain. Each handler corresponds to a specific action that can be performed on the token contract.
## Table of Contents

- [Initialize](#initialize)
- [Mint](#mint)
- [Burn](#burn)
- [Transfer](#transfer)
- [Approve](#approve)
- [TransferFrom](#transferfrom)
- [BalanceOf](#balanceof)
- [TotalSupply](#totalsupply)
- [Name](#name)
- [Symbol](#symbol)
- [Allowance](#allowance)
### Initialize

Initializes the token contract with a name and symbol. This action should be performed only once.

**Parameters**
- `Target` (string): The target token's ID (`ao.id` in this context).
- `Action` (string): `"Initialize"`
- `name` (string): The name of the token.
- `symbol` (string): The symbol of the token

**Usage Example**
```lua
Send({Target=ao.id, Action="Initialize",name="USDC",symbol="USD"})
```

### Mint

Mints new tokens to a specified address, increasing the total supply.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"Mint"`
- `to` (string): The address to receive the minted tokens.
- `value` (number): The number of tokens to mint.

**Usage Example**
```lua
Send({Target=ao.id, Action="Mint", account="kn3eqiTsOXNXE92Iz2WM-X3axAw4JEENZ7RQqBrscBg", value="100"})
```
### Burn

Burns tokens from a specified address, decreasing the total supply.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"Burn"`
- `from` (string): The address from which tokens will be burned.
- `value` (number): The number of tokens to burn.

**Usage Example**
```lua
Send({Target=ao.id, Action="Burn", from="0xHolderAddress", value="500"})
```

### Transfer

Transfers tokens from one address to another.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"Transfer"`
- `from` (string): The sender's address.
- `to` (string): The recipient's address.
- `value` (number): The number of tokens to transfer.

**Usage Example**
```lua
Send({Target=ao.id, Action="Transfer", from="0xSenderAddress", to="0xRecipientAddress", value="200"})
```

### Approve

Approves a spender to withdraw tokens from the owner's account, up to the specified value.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"Approve"`
- `owner` (string): The address of the token owner.
- `spender` (string): The address authorized to spend the tokens.
- `value` (number): The maximum number of tokens the spender can spend.
**Usage Example**

```lua
Send({Target=ao.id, Action="Approve", owner="0xOwnerAddress", spender="0xSpenderAddress", value="300"})
```

### TransferFrom

Allows a spender to transfer tokens from an owner's account to another account, using the allowance mechanism.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"TransferFrom"`
- `spender` (string): The address performing the transfer (must be approved).
- `from` (string): The owner's address.
- `to` (string): The recipient's address.
- `value` (number): The number of tokens to transfer.

**Usage Example**
```lua
Send({Target=ao.id, Action="TransferFrom", spender="0xSpenderAddress", from="0xOwnerAddress", to="0xRecipientAddress", value="150"})
```

### BalanceOf

Returns the token balance of a specified address.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"BalanceOf"`
- `account` (string): The address whose balance is to be checked.

**Usage Example**
```lua
Send({Target=ao.id, Action="BalanceOf", account="0xAccountAddress"})
```

### TotalSupply

Returns the total supply of tokens in circulation.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"TotalSupply"`

**Usage Example**
```lua
Send({Target=ao.id, Action="TotalSupply"})
```

### Name

Returns the name of the token.

**Parameters**
- `Target` (string): The target token's ID.
- `Action` (string): `"Name"`

**Usage Example**
```lua
Send({Target=ao.id, Action="Name"})
```

### Symbol
Returns the symbol of the token.

**Parameters**

- `Target (string)`: The target token's ID.
- `Action (string)`: "Symbol"

Usage Example
```lua
Send({Target=ao.id, Action="Symbol"})
```