import React from "react";
import { CustomSvg } from "../../../components";
import "./ModalAdd.scss";

export default function ModalAdd({ addTextField, addImageField }) {
  return (
    <div className={"modal"}>
      <div className={"modal-btn"}>
        <div className={"modal-btn-field"} onClick={addTextField}>
          <CustomSvg
            name={"text"}
            color={"#ffffff"}
            width={"30"}
            height={"30"}
          />
        </div>
        <div className={"modal-btn-image"} onClick={addImageField}>
          <CustomSvg
            name={"camera"}
            color={"#ffffff"}
            width={"30"}
            height={"30"}
          />
        </div>
      </div>
    </div>
  );
}
