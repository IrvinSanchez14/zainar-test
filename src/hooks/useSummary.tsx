import { useMemo } from 'react';
import { Post } from '../types/posts-slice.types';

const useSummary = (posts: Post[]) => {
  const summary = useMemo(() => {
    const totalUsers = posts.reduce((acc, post) => acc.add(post.userId), new Set()).size;
    const totalTweets = posts.length;

    const tweetsInLastFiveMinutes = posts.filter(post => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const postDate = new Date(post.timestamp);
      return postDate >= fiveMinutesAgo;
    }).length;

    return { totalUsers, totalTweets, tweetsInLastFiveMinutes };
  }, [posts]);

  return summary;
};

export default useSummary;
