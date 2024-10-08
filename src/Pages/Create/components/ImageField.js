import React from "react";
import DeleteFieldButton from "./DeleteFieldButton";
import "./ImageField.scss";

export default function ImageField({
  field,
  handleImageChange,
  deleteField,
  isThumbnail = false,
}) {
  const { id, url } = field;
  let label = "";

  if (isThumbnail) {
    label = "Please choose thumbnail url for your post:";
  } else {
    label = "Please choose image url for your post:";
  }

  return (
    <div className={"image-field"}>
      <label className={"image-field-label"}>{label}</label>

      <input
        type='input'
        className={"image-field-input"}
        onChange={(e) => handleImageChange(e, id, isThumbnail)}
        value={url}
        required
      />
      {isThumbnail && <DeleteFieldButton id={id} onDelete={deleteField} />}

      {url && <img src={url} alt='editables' />}
    </div>
  );
}
