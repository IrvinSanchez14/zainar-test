import { ChangeEvent } from 'react';

import { renderHook, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import useListPosts from '../../hooks/useListPost';
import postsReducer from '../../store/slices/posts.slice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockWebSocket = {
  send: vi.fn(),
  messages: [],
};

vi.mock('./useWebSocket', () => ({
  default: () => mockWebSocket,
}));

vi.mock('./usePost', () => ({
  usePosts: () => ({
    data: [{ id: 1, title: 'Test Post', body: 'This is a test post', userId: 1 }],
    isLoading: false,
    error: null,
  }),
}));

vi.mock('./useNewMessages', () => ({
  default: () => ({
    newMessages: [],
    showNotification: false,
    setShowNotification: vi.fn(),
    setNewMessages: vi.fn(),
  }),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={configureStore({ reducer: {
        posts: postsReducer,
      }, })}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );

describe('useListPosts', () => {
    it('should initialize with default values', async () => {
        let result: ReturnType<typeof renderHook>['result'];

        await act(async () => {
          result = renderHook(() => useListPosts(), { wrapper }).result;
        });
    
        await waitFor(() => {
            const current = result.current as ReturnType<typeof useListPosts>;

            expect(current.form).toEqual({ title: '', body: '' });
            expect(current.openModal).toBe(false);
            expect(current.isLoading).toBe(true);
            expect(current.error).toBeNull();
            expect(current.posts).toEqual([]);
            expect(current.showNotification).toBe(false);
            expect(current.newMessages).toEqual([]);
        });
      });

  it('should handle opening and closing the modal', async () => {
    const { result } = renderHook(() => useListPosts(), { wrapper });

    await act( async() => {
      result.current.handleOpenModal();
    });
    expect(result.current.openModal).toBe(true);

    await act( async () => {
      result.current.closeModal();
    });
    expect(result.current.openModal).toBe(false);
  });

  it('should handle input changes', async() => {
    const { result } = renderHook(() => useListPosts(), { wrapper });

    await act( async() => {
      result.current.changeInput({ target: { name: 'title', value: 'New Title' } } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.form.title).toBe('New Title');
  });
});
