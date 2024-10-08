import React, { useState } from "react";
import { CustomSvg } from "../../../components";
import ModalDelete from "./ModalDelete";
import "./DeleteFieldButton.scss";

export default function DeleteFieldButton({ id, onDelete }) {
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div>
      <div
        className={"delete-field-button"}
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
