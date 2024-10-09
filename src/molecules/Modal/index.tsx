import classNames from "classnames";
import React, { useCallback } from "react";
import { createPortal } from "react-dom";

interface IModal {
  open?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<IModal> = React.memo(({ children, open = true, onClose }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={classNames(
        "fixed inset-0 z-10 p-8 text-white bg-gray-600/90",
        { block: open, hidden: !open }
      )}
    >
      <div className="relative w-full max-w-sm mx-auto mt-8">
        <button
          className="absolute -top-2 -right-2 flex justify-center rounded-full h-8 w-8 bg-gray-600 cursor-pointer shadow-xl"
          onClick={handleClose}
          title="Close"
        >
          <span className="text-2xl leading-7 select-none">×</span>
        </button>
        <div className="overflow-hidden bg-white rounded shadow-xl">{children}</div>
      </div>
    </div>,
    document.body
  );
});

export default Modal;
