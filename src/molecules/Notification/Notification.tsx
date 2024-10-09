import React, { useCallback } from "react";
import { Post } from "../../types/posts-slice.types";

interface NotificationProps {
  newMessages: Post[];
  handleShowNewMessages: () => void;
}

const Notification: React.FC<NotificationProps> = React.memo(({ newMessages, handleShowNewMessages }) => {
  const handleClick = useCallback(() => {
    handleShowNewMessages();
  }, [handleShowNewMessages]);

  return (
    <div
      className="bg-slate-300 hover:bg-slate-200 cursor-pointer max-w-md mx-auto shadow-md overflow-hidden md:max-w-2xl"
      onClick={handleClick}
    >
      <div className="p-8">
        <div className="text-center text-blue-400" aria-live="polite">
          Show {newMessages.length} posts
        </div>
      </div>
    </div>
  );
});

export { Notification };
