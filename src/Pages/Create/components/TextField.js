import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import DeleteFieldButton from "./DeleteFieldButton";
import "./TextField.scss";

export default function TextField({
  field,
  deleteField,
  handleTextChange,
  isTitle = false,
  className,
}) {
  const { id, text } = field;

  return (
    <div className={`textfield ${className}`} key={id}>
      <TextareaAutosize
        id={`${id}`}
        value={text}
        onChange={(e) => handleTextChange(id, e.target.value)}
        className={`textfield-input`}
        minRows={1}
        maxRows={2}
        required
      />

      {!isTitle && <DeleteFieldButton id={field.id} onDelete={deleteField} />}
    </div>
  );
}
