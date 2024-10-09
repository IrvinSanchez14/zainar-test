import React, { useCallback, useState } from 'react';
import Button from '../../atoms/Button';

interface ContentModalProps {
  form: { title: string; body: string };
  changeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
}

const ContentModal: React.FC<ContentModalProps> = React.memo(({ form, changeInput, handleSendMessage }) => {
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const validate = useCallback(() => {
    const newErrors: { title?: string; body?: string } = {};
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.body) newErrors.body = 'Body is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const onSendMessage = useCallback(() => {
    if (validate()) {
      handleSendMessage();
    }
  }, [validate, handleSendMessage]);

  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 pt-5">
        <div className="w-full px-3 mb-6 md:mb-0">
          <div className="w-full px-3 pb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Title
            </label>
            <input
              value={form.title}
              onChange={changeInput}
              name="title"
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              type="text"
              placeholder="title post"
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>
          <div className="w-full px-3 pb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Body
            </label>
            <textarea
              value={form.body}
              onChange={changeInput}
              name="body"
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.body ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              placeholder="body post"
            />
            {errors.body && <p className="text-red-500 text-xs italic">{errors.body}</p>}
          </div>
          <div className="px-3 flex justify-end">
            <Button title="Send" handleSendMessage={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
});

export { ContentModal };
