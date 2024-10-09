import { useState, useEffect, useCallback, ChangeEvent, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocketConnection from './useWebSocket';
import { usePosts } from './usePost';
import { RootState } from '../store/store';
import useNewMessages from './useNewMessages';
import { addPost, selectAllPosts, setPosts } from '../store/slices/posts.slice';
import { formReducer } from '../store/reducer/list-post.reducer';
import { Post } from '../types/posts-slice.types';

const useListPosts = () => {
  const dispatch = useDispatch();
  const { send, messages } = useWebSocketConnection(import.meta.env.VITE_SOCKET_URL);
  const [form, formDispatch] = useReducer(formReducer, { title: '', body: '' });
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, error } = usePosts();
  const posts = useSelector((state: RootState) => selectAllPosts(state));
  const { newMessages, showNotification, setShowNotification, setNewMessages } = useNewMessages(messages);

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    }
  }, [data, dispatch]);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const closeModal = useCallback(() => setOpenModal(false), []);

  const handleShowNewMessages = useCallback(() => {
    newMessages.forEach((message) => dispatch(addPost(message)));
    setNewMessages([]);
    setShowNotification(false);
  }, [dispatch, newMessages, setNewMessages, setShowNotification]);

  const changeInput = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    formDispatch({ type: 'SET_FORM', payload: { [name]: value } });
  }, []);

  const handleSendMessage = useCallback(() => {
    const newMessage: Post = {
      id: posts.length + (newMessages.length === 0 ? 1 : newMessages.length + 1),
      title: form.title,
      body: form.body,
      userId: Math.floor(Math.random() * 1001),
    };
    send(JSON.stringify(newMessage));
    formDispatch({ type: 'RESET_FORM' });
    closeModal();
  }, [form, posts.length, newMessages.length, send, closeModal]);

  return {
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
  };
};

export default useListPosts;
