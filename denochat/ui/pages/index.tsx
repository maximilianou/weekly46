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