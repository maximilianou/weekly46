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

app.use( (ctx) => {
  ctx.response.body = 'Hi, from oak deno module!!';
});

addEventListener('fetch', app.fetchEventHandler());

