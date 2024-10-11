import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';
import { Post, PostsState } from '../../types/posts-slice.types';

const selectId = (post: Post) => post.id ?? Math.random().toString(36).substring(2, 9);

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState: PostsState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      postsAdapter.setAll(
        state, 
        action.payload.map(post => ({ ...post, id: selectId(post) }))
      );
    },
    addPost(state, action: PayloadAction<Post>) {
      postsAdapter.addOne(
        state, 
        { ...action.payload, id: selectId(action.payload) }
      );
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;
export default postsSlice.reducer;

const selectPostsState = (state: RootState) => state.posts;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors<RootState>(selectPostsState);

export const selectPostsStatus = createSelector(
  selectPostsState,
  (state) => state.status
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error
);
