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
  })

const app  = new Application();

app.use(router.routes());
app.use( oakCors() );
app.use(router.allowedMethods());

addEventListener('fetch', app.fetchEventHandler());

