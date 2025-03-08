import React from "react";

const ClassDeleteModal = ({ id }: { id: number }) => {
  return (
    <dialog id={`modal_delete_${id}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete this class !</h3>
        <p className="py-4">
          All data will be lost. Are you sure you want to delete this class ?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="bg-red-700 text-white btn hover:bg-red-800 border-0 mr-3">
              Delete
            </button>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ClassDeleteModal;
