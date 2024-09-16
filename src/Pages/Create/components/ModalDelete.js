import React from "react";

export default function ModalDelete({ onDelete, setDeleteModal, id }) {
  return (
    <div className={"modal-delete"}>
      <p className={"modal-delete-title"}>Are you sure to delete?</p>
      <div className={"modal-delete-actions"}>
        <button
          className={"modal-delete-actions-btn"}
          onClick={() => onDelete(id)}
        >
          Yes
        </button>
        <button
          className={"modal-delete-actions-btn"}
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
