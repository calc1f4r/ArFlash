This document provides a comprehensive overview of the `Arflash` protocol, which defines handlers for managing a flashloan protocol on arweave itself.

### Handlers 

1. `addLiquidity` : 
This handler allows liquidity providers to add tokens to the protocol. The tokens are transferred from the provider's account to the protocol's account, and the provider's balance is updated accordingly.

> Note : Approve the protocol the quantity before that 

```lua
Send({Target=ao.id,Tags={Action="addLiquidity",amount="1000"}})
```

2. `removeLiquidity`
This handler allows liquidity providers to remove tokens from the protocol. 

```lua
Send({Target=ao.id,Tags={Action="removeLiquidity", amount="1000"}})
```

3. `requestLoan`
 Request a flashloan from the protocol
 
```lua
Send({Target=ao.id,Tags={Action="requestLoan",amount="1000",Receiver="ao-token-id"}})
```