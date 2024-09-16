import React from "react";
import DeleteFieldButton from "./DeleteFieldButton";
import "./ImageField.scss";

export default function ImageField({
  field = { id: null, imagePreviewUrl: null },
  handleImageChange,
  deleteField,
  isThumbnail = false,
}) {
  return (
    <div className={"image-field"}>
      {isThumbnail && (
        <label className={"image-field-label"}>
          Please choose thumbnail for your post
        </label>
      )}
      <input
        type='file'
        accept='image/*'
        name='file'
        className={"image-field-input"}
        onChange={(e) => handleImageChange(e, field.id, isThumbnail)}
      />
      {isThumbnail && (
        <DeleteFieldButton id={field.id} onDelete={deleteField} />
      )}

      {field.imagePreviewUrl && (
        <img src={field.imagePreviewUrl} alt='editables' />
      )}
    </div>
  );
}
