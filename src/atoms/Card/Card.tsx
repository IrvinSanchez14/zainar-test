import React from 'react';

interface ICard {
    title: string;
    body: string;
}

const Card: React.FC<ICard> = React.memo(({ title, body }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
                    <p className="mt-2 text-slate-500">{body}</p>
                </div>
            </div>
            <hr />
        </div>
    );
});

export { Card };
