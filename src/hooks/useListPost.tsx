import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocketConnection from './useWebSocket';
import { RootState } from '../store/store';
import useNewMessages from './useNewMessages';
import { addPost, selectAllPosts, setPosts } from '../store/slices/posts.slice';
import useForm from './useForm';
import useRandomMessage from './useRandomMessage';
import { Post } from '../types/posts-slice.types';
import useFetchPosts from './useFetchPost';

const useListPosts = () => {
  const dispatch = useDispatch();
  const { send, messages } = useWebSocketConnection(import.meta.env.VITE_SOCKET_URL);
  const [openModal, setOpenModal] = useState(false);
  const posts = useSelector((state: RootState) => selectAllPosts(state));
  const { newMessages, showNotification, setShowNotification, setNewMessages } = useNewMessages(messages);
  const { data, isLoading, error } = useFetchPosts();
  const { form, changeInput, resetForm } = useForm();
  useRandomMessage(send, posts.length);

  useEffect(() => {
    if (data) {
      const postsWithTimestamp = data.map((post: Post) => ({
        ...post,
        timestamp: new Date().toISOString(),
      }));
      dispatch(setPosts(postsWithTimestamp));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((message) => {
        try {
          const parsedMessage: Post = JSON.parse(message);
          const postWithTimestamp = { ...parsedMessage, timestamp: new Date().toISOString() };
          dispatch(addPost(postWithTimestamp));
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      });
    }
  }, [messages, dispatch]);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const closeModal = useCallback(() => setOpenModal(false), []);

  const handleShowNewMessages = useCallback(() => {
    newMessages.forEach((message) => {
      const postWithTimestamp = { ...message, timestamp: new Date().toISOString() };
      dispatch(addPost(postWithTimestamp));
    });
    setNewMessages([]);
    setShowNotification(false);
  }, [dispatch, newMessages, setNewMessages, setShowNotification]);

  const handleSendMessage = useCallback(() => {
    const newMessage: Post = {
      id: posts.length + newMessages.length + 1,
      title: form.title,
      body: form.body,
      userId: Math.floor(Math.random() * 1001),
      timestamp: new Date().toISOString(),
    };
    send(JSON.stringify(newMessage));
    resetForm();
    closeModal();
  }, [form, posts.length, newMessages.length, send, resetForm, closeModal]);

  const combinedPosts = [...posts];

  return {
    form,
    openModal,
    isLoading,
    error,
    posts: combinedPosts,
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
