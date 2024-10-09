import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useListPosts from '../../hooks/useListPost';

const Card = lazy(() => import('../../atoms/Card'));
const Modal = lazy(() => import('../Modal'));
const Header = lazy(() => import('../Header'));
const Notification = lazy(() => import('../Notification'));
const ContentModal = lazy(() => import('../ContentModal'));

const Loading = () => <div>Loading...</div>;
const ErrorFallback = ({ error }: { error: Error }) => <div>Error: {error.message}</div>;

const ListPosts: React.FC = React.memo(() => {
  const {
    form,
    openModal,
    isLoading,
    error,
    posts,
    showNotification,
    newMessages,
    handleOpenModal,
    closeModal,
    handleShowNewMessages,
    changeInput,
    handleSendMessage,
  } = useListPosts();

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <div>
          <Header handleOpenModal={handleOpenModal} />
          {showNotification && (
            <Notification newMessages={newMessages} handleShowNewMessages={handleShowNewMessages} />
          )}
          {posts.map(({ title, body }, index) => (
            <Card key={index} title={title} body={body} />
          ))}
          <Modal open={openModal} onClose={closeModal}>
            <ContentModal form={form} changeInput={changeInput} handleSendMessage={handleSendMessage} />
          </Modal>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
});

export { ListPosts };
