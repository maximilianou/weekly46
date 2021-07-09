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
      mode: 'cors',
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
