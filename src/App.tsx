import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Posts = lazy(() => import('./pages/Posts'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/*" element={<Navigate to="/posts" />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
