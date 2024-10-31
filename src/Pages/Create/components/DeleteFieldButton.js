import React, { useState } from "react";
import { CustomSvg } from "../../../components";
import "./DeleteFieldButton.scss";
import ModalDelete from "./ModalDelete/ModalDelete";

export default function DeleteFieldButton({ id, onDelete, className }) {
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div>
      <div
        className={`delete-field-button ${className}`}
        onClick={() => setDeleteModal(true)}
      >
        <CustomSvg name={"cross"} width={"30"} height={"30"} />
      </div>
      {deleteModal && (
        <ModalDelete
          onDelete={onDelete}
          setDeleteModal={setDeleteModal}
          id={id}
        />
      )}
    </div>
  );
}
