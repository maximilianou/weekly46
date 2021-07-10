# weekly46

## Learning graphql and more
-----
-----
-----


### Deno Chat Deploy

- <https://denochat.simpledoers.com>
- <https://weekly46-denochat-ui.deno.dev/>

- <https://denochat-api.simpledoers.com>
- <https://weekly46-denochat-api.deno.dev>

#### Deno install

- https://deno.land/
- https://deno.com/blog/deploy-beta1
#### Deno deploy
- denochat/api/index.js
```js
addEventListener("fetch", (event) => {
  const response = new Response("Hi Deno Chat Step One!!", {
    status: 200, 
    headers: { "content-type": "text/plain"}
  });
  event.respondWith(response);
});
```

- https://github.com/maximilianou/weekly46/blob/main/denochat/api/index.js
- https://dash.deno.com/projects -> create new project -> weekly46-denochat-api
- https://dash.deno.com/projects -> settings -> Git -> https://github.com/maximilianou/weekly46/blob/main/denochat/api/index.js -> Link
- Install "Deno Deploy GitHub App" in your github account
- https://dash.deno.com/projects -> settings -> Domain 
- DNS - your domain name registered/subdomain redirecto to .. 
```
A     denochat-api.simpledoers.com  34... 
AAAA  denochat-api.simpledoers.com  26::0::: 
TXT   denochat-api.simpledoers.com  deno-com-validation=1...
```
- Validate - https://dash.deno.com/projects -> settings -> Domain
- TLS - Get Automatic Certificate - https://dash.deno.com/projects -> settings -> Domain

```bash
git add .
git commit -m 'feat(api): deploy deno Hi!!'
git push
```

### Deploy changes 2 oak middelware Application
- denochat/api/index.ts
```ts
import { Application  } from "https://deno.land/x/oak/mod.ts";
const app  = new Application();
app.use( (ctx) => {
  ctx.response.body = 'Hi, from oak deno module!!';
});
addEventListener('fetch', app.fetchEventHandler());
```

### Deploy changes 3 oak middelware Router

- denochat/api/index.ts
```ts
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
const messages = [];
const router = new Router();
router
  .get('/', (ctx, next) => {
    ctx.response.body = 'Deno Chat Server:';
  })
  .get('/messages', (ctx, next) => {
    ctx.response.body = messages;
  })
  .post('/messages', async (ctx, next) => {
    const message = await ctx.request.body().value;
    messages.push(message);
    ctx.response.body = messages;
  })
const app  = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
addEventListener('fetch', app.fetchEventHandler());
```

### Fresh - install ui ( like nextjs framework )


https://github.com/lucacasonato/fresh

- Makefile
```
step46_1303 denochat_ui:
	deno install -A -f --no-check -n fresh https://raw.githubusercontent.com/lucacasonato/fresh/main/cli.ts
	cd denochat && fresh init ui
```

### Run Local environment
- Makefile
```
step46_1304 denochat_deployctl_local:
	cd denochat/ui && deployctl run --no-check --watch main.ts
```

### ui Run Local fetch online api
- denochat/ui/pages/index.tsx
```tsx
import { h, IS_BROWSER, useState, useEffect, useCallback } from "../deps.ts";
interface Message {
  text: string;
}
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const getMessages = useCallback( async () => {
    const res = await fetch('https://denochat-api.simpledoers.com/messages');
    const data = await res.json();
    setMessages(data);
  }, []);
  useEffect( () => {
    getMessages();
  }, []);
  return (
    <div>
      {JSON.stringify(messages)}
    </div>
  );
}
```

### api oak cors

```ts
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
const messages = [];
const router = new Router();
router
  .get('/', (ctx, next) => {
    ctx.response.body = 'Deno Chat Server:';
  })
  .get('/messages', (ctx, next) => {
    ctx.response.body = messages;
  })
  .post('/messages', async (ctx, next) => {
    const message = await ctx.request.body().value;
    messages.push(message);
    ctx.response.body = messages;
  });
const app  = new Application();
app.use( oakCors() );
app.use(router.routes());
app.use(router.allowedMethods());
addEventListener('fetch', app.fetchEventHandler());
```
### ui local access api, and send messages

```tsx
import { h, IS_BROWSER, useState, useEffect, useCallback } from "../deps.ts";
interface Message {
  text: string;
}
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const getMessages = useCallback( async () => {
    const res = await fetch('https://denochat-api.simpledoers.com/messages');
    const data = await res.json();
    setMessages(data);
  }, []);
  useEffect( () => {
    getMessages();
  }, []);
  const onSendMessage = useCallback(async () => {
    await fetch('https://denochat-api.simpledoers.com/messages', {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify({
        text
      })
    });
    setText('');
    getMessages();
  }, [text]);
  return (
    <div>
      <input type='text' value={text} onChange={ (evt) => setText(evt.target.value) } />
      <button onClick={onSendMessage}>Add</button>
      <div>{JSON.stringify(messages)}</div>
    </div>
  );
}
```

### Breadcast channel chat deno oak
- https://deno.com/deploy/docs/runtime-broadcast-channel
- denochat/api/index.js
```js
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
const messages = [];
const channel = new BroadcastChannel('chat');
channel.onmessage = (event) => {
  messages.push(event.data);
}
const router = new Router();
router
  .get('/', (ctx, next) => {
    ctx.response.body = 'Deno Chat Server:';
  })
  .get('/messages', (ctx, next) => {
    ctx.response.body = messages;
  })
  .post('/messages', async (ctx, next) => {
    const message = await ctx.request.body().value;
    messages.push(message);
    channel.postMesssage(message);
    ctx.response.body = messages;
  });
const app  = new Application();
app.use( oakCors() );
app.use(router.routes());
app.use(router.allowedMethods());
addEventListener('fetch', app.fetchEventHandler());
```

### ui Deploy
- https://github.com/maximilianou/weekly46/blob/main/denochat/ui/main.ts
- https://dash.deno.com/projects -> create new project -> weekly46-denochat-ui
- https://dash.deno.com/projects -> settings -> Git -> https://github.com/maximilianou/weekly46/blob/main/denochat/ui/main.ts -> Link
- https://dash.deno.com/projects -> settings -> Domain 
- DNS - your domain name registered/subdomain redirecto to .. 
```
A     denochat.simpledoers.com  34... 
AAAA  denochat.simpledoers.com  26::0::: 
TXT   denochat.simpledoers.com  deno-com-validation=1...
```
- Validate - https://dash.deno.com/projects -> settings -> Domain
- TLS - Get Automatic Certificate - https://dash.deno.com/projects -> settings -> Domain



-----
-----
-----

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

-----
-----
-----

