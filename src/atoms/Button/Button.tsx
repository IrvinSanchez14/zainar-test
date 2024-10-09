import React, { useCallback } from 'react';

interface IButton {
    handleSendMessage: () => void;
    title: string
}

const Button: React.FC<IButton> = React.memo(({ handleSendMessage, title }) => {
    const memoizedHandleSendMessage = useCallback(handleSendMessage, [handleSendMessage]);

    return (
        <button
            className="rounded-md bg-slate-800 py-2.5 px-5 border border-transparent text-center text-base text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={memoizedHandleSendMessage}
        >
            {title}
        </button>
    );
});

export { Button };