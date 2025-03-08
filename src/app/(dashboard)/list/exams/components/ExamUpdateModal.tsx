import React from "react";

const ExamUpdateModal = ({ id }: { id: number }) => {
  return (
    <dialog id={`modal_update_${id}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ExamUpdateModal;
