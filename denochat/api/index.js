addEventListener("fetch", (event) => {
  const response = new Response("Hi Deno Chat Step One!!", {
    status: 200, 
    headers: { "content-type": "text/plain"}
  });
  event.respondWith(response);
});