import React, { Suspense, lazy } from 'react';

const ListPosts = lazy(() => import('../../molecules/ListPosts'));

const Posts: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ListPosts />
        </Suspense>
    );
};

export { Posts };
