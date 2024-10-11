import { ChangeEvent, useReducer } from 'react';
import { formReducer } from '../store/reducer/list-post.reducer';

const useForm = () => {
  const [form, formDispatch] = useReducer(formReducer, { title: '', body: '' });

  const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    formDispatch({ type: 'SET_FORM', payload: { [name]: value } });
  };

  const resetForm = () => {
    formDispatch({ type: 'RESET_FORM' });
  };

  return { form, changeInput, resetForm };
};

export default useForm;
