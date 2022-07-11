## Nextjs Frontend for Hardat Raffle 
This is Next.js frontend for the [Hardhat Raffle](https://github.com/PCWCFA/hardhat-raffle-fcc).

## Getting Started

If you would like to deploy your version of the raffle, on either Localhost or Rinkeby, run one of the below commands. For Rinkeby deployment, create a .env with the Rinkeby URL and key.

Localhost
```bash
hh node
```
Rinkeby: 
```bash
hh deploy --network rinkeby
```

Then update next-js-smartcontract-lottery/constants/contractAddresses.json with the contract address and next-js-smartcontract-lottery/constants/abi.json with the contract ABI. 

OR

You can choose to interact with the raffle already deployed on Rinkeby. The contract address is in contractAddresses.json.  

## License 
Distributed under the MIT License. See LICENSE.txt for more information.

