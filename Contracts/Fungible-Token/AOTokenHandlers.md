# AOToken Specification

This document provides a detailed overview of the `AOToken-Specification.lua` file, which defines the handlers for managing a fungible token using the `ao` framework. The file includes handlers for token information, balance management, transfers, allowances, minting, and burning.

### Handlers

1. **Getting Info**

   Retrieve information about the token.

   ```lua
   Send({ Target = ao.id, Action = "Info" })
   Inbox[#Inbox].Tags
   ```

2. **Transfer**

   Transfer tokens to another wallet or process ID.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'another wallet or processid', Quantity = '10000' }})
   ```

3. **Minting**

   Mint new tokens to the token pool.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "Mint", Quantity = '1000' }})
   ```

4. **Balance**

   Check the balance of a specific account or the sender's account.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "Balance", Target = 'wallet or processid' }})
   ```

5. **Balances**

   Retrieve the entire balances table.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "Balances" }})
   ```

6. **Allowance**

   Check the allowance set for a spender by the owner.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "Allowance", Spender = 'spender wallet or processid' }})
   ```

7. **Approve**

   Set the allowance for a spender.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "Approve", Spender = 'spender wallet or processid', Quantity = '5000' }})
   ```

8. **TransferFrom**

   Transfer tokens on behalf of an owner using the allowance.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "TransferFrom", Owner = 'owner wallet or processid', Recipient = 'recipient wallet or processid', Quantity = '3000' }})
   ```

9. **Burn**

   Burn tokens from the sender's account.

   ```lua
   Send({ Target = ao.id, Tags = { Action = "Burn", Quantity = '2000' }})
   ```

This document provides examples of how to interact with the various handlers defined in the `AOToken-Specification.lua` file, allowing for comprehensive management of a fungible token.
