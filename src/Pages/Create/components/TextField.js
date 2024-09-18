import React from "react";
import DeleteFieldButton from "./DeleteFieldButton";
import TextareaAutosize from "react-textarea-autosize";
import "./TextField.scss";

export default function TextField({
  field,
  deleteField,
  handleTextChange,
  isTitle = false,
}) {
  const { id, text } = field;

  return (
    <div className={"textfield"} key={id}>
      <TextareaAutosize
        id={`${id}`}
        value={text}
        onChange={(e) => handleTextChange(id, e.target.value)}
        className={"textfield-input"}
        required
      />

      {!isTitle && <DeleteFieldButton id={field.id} onDelete={deleteField} />}
    </div>
  );
}
