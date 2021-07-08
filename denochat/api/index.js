import { Application } from "https://deno.lang/x/oak/mod.ts";

const app  = new Application();

app.use( (ctx) => {
  ctx.response.body = 'Hi, from oak deno module!!';
});

addEventListener('fetch', app.fetchEventHandler());

//addEventListener("fetch", (event) => {
//  const response = new Response("Hi Deno Chat Step One!!", {
//    status: 200, 
//    headers: { "content-type": "text/plain"}
//  });
//  event.respondWith(response);
//});