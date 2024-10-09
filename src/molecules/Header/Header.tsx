import React from 'react';

interface HeaderProps {
  handleOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ handleOpenModal }) => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Zainar</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <button 
              onClick={handleOpenModal} 
              className="hover:underline"
              aria-label="Add Post"
            >
              Add Post
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export { Header };
