import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePosts } from './usePost';
import { setPosts } from '../store/slices/posts.slice';

const useFetchPosts = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = usePosts();

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    }
  }, [data, dispatch]);

  return { data, isLoading, error };
};

export default useFetchPosts;
