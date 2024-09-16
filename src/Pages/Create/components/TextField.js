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
  console.log(`Textfiled ${JSON.stringify(field)}`);

  // function handleOnChange(e) {
  //   if (isThumbnail) {
  //     const thumbnail = {
  //       file: e.target.value.file,
  //       imagePreviewUrl: e.target.result,
  //     };
  //     setThumbnailImage(e.target.value);
  //   } else {
  //     ;
  //   }
  // }

  return (
    <div className={"textfield"} key={id}>
      <TextareaAutosize
        id={`${id}`}
        value={text}
        onChange={(e) => handleTextChange(id, e.target.value)}
        className={"textfield-input"}
      />

      {!isTitle && <DeleteFieldButton id={field.id} onDelete={deleteField} />}
    </div>
  );
}
