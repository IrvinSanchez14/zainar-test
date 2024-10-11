import React, { Suspense, lazy, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useListPosts from '../../hooks/useListPost';
import useSummary from '../../hooks/useSummary';
import SummaryContent from '../SummaryContent';

const Card = lazy(() => import('../../atoms/Card'));
const Header = lazy(() => import('../Header'));

const Loading = () => <div>Loading...</div>;
const ErrorFallback = ({ error }: { error: Error }) => <div>Error: {error.message}</div>;

const ListPosts: React.FC = React.memo(() => {
  const {
    isLoading,
    error,
    posts,
    newMessages,
    handleOpenModal,
  } = useListPosts();

  const combinedPosts = useMemo(() => {
    const allPosts = [...posts];
    newMessages.forEach((newMsg) => {
      if (!allPosts.some((post) => post.id === newMsg.id)) {
        allPosts.push(newMsg);
      }
    });
    return allPosts;
  }, [posts, newMessages]);
  
  const { totalUsers, totalTweets, tweetsInLastFiveMinutes } = useSummary(combinedPosts);
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <div className="p-4">
          <Header handleOpenModal={handleOpenModal} />
          <SummaryContent totalTweets={totalTweets} totalUsers={totalUsers} tweetsInLastFiveMinutes={tweetsInLastFiveMinutes} />
          <div>
            {combinedPosts.map(({ title, body }, index) => (
              <Card key={index} title={title} body={body} />
            ))}
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
});

export { ListPosts };
