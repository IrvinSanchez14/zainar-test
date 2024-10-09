import { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface WebSocketHook {
  messages: string[];
  send: (message: string) => void;
  readyState: ReadyState;
}

const useWebSocketConnection = (url: string): WebSocketHook => {
  const [messages, setMessages] = useState<string[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(url);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessages((prevMessages) => [...prevMessages, lastMessage.data]);
    }
  }, [lastMessage]);

  const send = useCallback((message: string) => {
    sendMessage(message);
  }, [sendMessage]);

  return {
    messages,
    send,
    readyState,
  };
};

export default useWebSocketConnection;
