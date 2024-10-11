import { useEffect, useState } from 'react';
import { Post } from '../types/posts-slice.types';

const useNewMessages = (messages: string[]) => {
  const [newMessages, setNewMessages] = useState<Post[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      try {
        const parsedMessage: Post = JSON.parse(latestMessage);
        setNewMessages((prevMessages) => {
          if (prevMessages.some(message => message.id === parsedMessage.id)) {
            return prevMessages;
          }
          return [parsedMessage, ...prevMessages];
        });
        setShowNotification(true);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    }
  }, [messages]);

  return { newMessages, showNotification, setShowNotification, setNewMessages };
};

export default useNewMessages;
