import React from "react";

const AssignmentCreateModal = () => {
  return (
    <dialog id="modal_create_assignment" className="modal">
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

export default AssignmentCreateModal;
