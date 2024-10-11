import { useEffect, useCallback } from 'react';
import { Post } from '../types/posts-slice.types';

const useRandomMessage = (send: (message: string) => void, postsLength: number) => {
  const randomTweets = useCallback((): Post => {
    const titles = ['New Post Zaniar', 'Update Zaniar', 'Announcement from Zaniar', 'Random Topic Zaniar'];
    const bodies = [
      'This is a random post from Zaniar',
      'Here is some new content from Zaniar',
      'Check out this update from Zaniar',
      'Just sharing a random topic.',
    ];

    return {
      id: postsLength + 1,
      title: titles[Math.floor(Math.random() * titles.length)],
      body: bodies[Math.floor(Math.random() * bodies.length)],
      userId: Math.floor(Math.random() * 1001),
      timestamp: new Date().toISOString(),
    };
  }, [postsLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = randomTweets();
      send(JSON.stringify(newMessage));
    }, 5000);

    return () => clearInterval(interval);
  }, [send, randomTweets]);
};

export default useRandomMessage;
