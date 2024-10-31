import React from "react";
import { CustomButton } from "../../../../components";
import "./ModalDelete.scss";

export default function ModalDelete({
  onDelete,
  setDeleteModal,
  id,
  className,
  bubbleTail = "bottom-center",
}) {
  return (
    <div className={`modal-delete ${className} ${bubbleTail}`}>
      <p className={"modal-delete-title"}>Are you sure to delete?</p>
      <div className={"modal-delete-actions"}>
        <CustomButton
          title={"Delete"}
          className={"modal-delete-actions-btn"}
          onClick={() => onDelete(id)}
        />
        <CustomButton
          title={"Cancel"}
          className={"modal-delete-actions-btn"}
          onClick={() => setDeleteModal(false)}
        />
      </div>
    </div>
  );
}
