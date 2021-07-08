addEventListener("fetch", (event) => {
  const response = new Response("Hi Deno Chat Step One!!", {
    headers: { "content-type": "text/plain"}
  });
  event.responseWith(response);
});