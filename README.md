# weekly46

## Learning graphql and more

### Start having a codebase from dappuniversity, 
#### install ganache local blockchain network 
#### metamask wallet in your browser
- Makefile
```yaml
step46_50 dapp_ui_init:
	cd dapp/defi_tutorial && npm i
#step10 web3-client:
#	npm i -g truffle
step46_52 web3_ganache_install:
	curl https://github.com/trufflesuite/ganache/releases/download/v2.5.4/ganache-2.5.4-linux-x86_64.AppImage; mv ganache-2.5.4-linux-x86_64.AppImage /usr/local/bin/; chmod +x /usr/local/bin/ganache-2.5.4-linux-x86_64.AppImage; ln -s /usr/local/bin//usr/local/bin/ganache-2.5.4-linux-x86_64.AppImage /usr/local/bin/ganache;
step46_53 web3_browser_metamask:
	echo 'Install metamask in google chrome https://metamask.io/download.html'
step46_54 web3_ganache_run:
	cd dapp/defi_tutorial && ganache
```
### How you connect to the blockchain, in this case ganache running locally
- dapp/defi_tutorial/truffle-config.js # 
```js
require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // here is the port where ganache is attending soy we connect
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/', // here is changed public intentional contracts
  contracts_build_directory: './src/abis/', // 
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
```
### Adding TokenFarm Smart Contract to the codebase
#### Adding the Solidity contract
- dapp/defi_tutorial/src/contracts/TokenFarm.sol
```js
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.16;

contract TokenFarm{
  string public name = "Dapp Token Farm";
}
```
#### Adding Migration Deploy Contract to the network
- dapp/defi_tutorial/migrations/2_deploy_contracts.js
```js
const TokenFarm = artifacts.require('TokenFarm')

module.exports = function(deployer) {
  deployer.deploy(TokenFarm);
}
```

#### Deploy
- Makefile
```
step46_55 web3_compile_contracts:
	cd dapp/defi_tutorial && npm i -D truffle 
step46_56 web3_compile_contracts:
	cd dapp/defi_tutorial && ./node_modules/.bin/truffle compile

```