The `onLoanReceived` handler expects the following parameters within the `msg` object:

- `msg.From`
  - **Type**: string
  - **Description**: The identifier of the entity sending the loan. This represents the account from which tokens will be transferred.
- `msg.Tags.Quantity`
  - **Type**: string (converted to number within the handler)
  - **Description**: The amount of tokens to be transferred from `msg.From` to the contract. This value determines both the transfer quantity and the subsequent approval amount after fees.
- `msg.Tags.TokenProcessId`
  - **Type**: string
  - **Description**: The process ID of the token contract (AOToken-Specification). This ID is used to specify which token contract to interact with for the `TransferFrom` and `Approve` actions.
- `msg.Tags.Fee`
  - **Type**: string (converted to number within the handler)
  - **Description**: The fee percentage to be applied to the transferred tokens. This percentage is used to calculate the fee amount, which is added to the approved quantity.

🚀 **Explanation**: 

### Parameter Extraction and Validation

The handler begins by extracting and converting the necessary parameters from the `msg` object:
- `quantity` is extracted from `msg.Tags.Quantity` and converted to a number.
- `tokenProcessId` is extracted from `msg.Tags.TokenProcessId`.
- `feeAmount` is extracted from `msg.Tags.Fee` and converted to a number.

Assertions are then used to ensure that the extracted parameters are of the expected types:
- `quantity` must be a number.
- `tokenProcessId` must be a string.
- `feeAmount` must be a number.

If any of these assertions fail, an error will be thrown, preventing further execution of the handler.