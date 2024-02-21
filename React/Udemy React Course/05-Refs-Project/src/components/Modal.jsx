import { useRef, forwardRef, useImperativeHandle } from "react";

import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md "
    >
      {children}
      <form method="dialog" className="mt-5 text-right">
        <button className="bg-stone-800 py-2 px-6 text-stone-50 hover:bg-stone-950 rounded-md">
          {buttonCaption}
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
