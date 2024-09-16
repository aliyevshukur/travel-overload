import React, { useState } from "react";

import "../Create/style.scss";
import { CustomButton, CustomSvg } from "../../components";
import { DetailsInput } from "./components";
import ModalAdd from "./components/ModalAdd";
import TextField from "./components/TextField";
import ImageField from "./components/ImageField";

export const Create = () => {
  const [isDetails, setDetails] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState({});
  const [fields, setFields] = useState([{ id: 0, type: "text", text: "" }]);
  const [modalFields, setModalFields] = useState(false);

  const addTextField = () => {
    setModalFields(false);
    let id = 0;
    if (fields.length > 0) {
      id = fields.length;
    }
    setFields([
      ...fields,
      {
        id: id,
        type: "text",
        text: "",
      },
    ]);
  };

  const addImageField = () => {
    setModalFields(false);
    setFields([
      ...fields,
      {
        id: fields[fields.length - 1].id + 1,
        type: "image",
        file: null,
        imagePreviewUrl: null,
      },
    ]);
  };

  function deleteField(id) {
    const index = fields.findIndex((field) => field.id === id);
    const updatedFields = fields;
    updatedFields.splice(index, 1);
    setFields([...updatedFields]);
  }

  function clickedAside(e) {
    if (e.target === e.currentTarget) {
      console.log("clicked aside");
      setModalFields(false);
    }
  }

  function handleImageChange(e, id, isThumbnail) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      //If loaded image is not thumbnail then update data in fields array
      if (isThumbnail) {
        setThumbnailImage({ file: file, imagePreviewUrl: reader.result });
      } else {
        const updatedFields = fields.map((field) => {
          if (field.id === id) {
            return {
              ...field,
              file: file,
              imagePreviewUrl: reader.result,
            };
          } else {
            return field;
          }
        });
        setFields(updatedFields);
      }
    };
    reader.readAsDataURL(file);
    console.log(e.target.files[0]);
  }

  function handleTextChange(id, value) {
    const updatedFields = fields.map((field) => {
      console.log(id);
      if (field.id === id) {
        const updatedField = {
          ...field,
          text: value,
        };
        console.log(JSON.stringify(updatedField));
        return updatedField;
      } else {
        return field;
      }
    });
    setFields(updatedFields);
  }

  function createBlog() {
    console.log("first");
  }

  function formatBlogData(fields) {
    const blog = {
      title: fields[0].text,
      context: fields,
    };
  }

  return (
    <div className={"create-container"} onClick={(e) => clickedAside(e)}>
      <div className={"create-header"}>
        {/* Load Title or Back button */}
        <div className={isDetails ? "back" : "title"}>
          {!isDetails ? (
            <>
              {/* Input where title of a blog is entered */}
              <p className={"title-text"}>Title</p>
              <TextField field={fields[0]} isTitle={true} />
              <ImageField
                isThumbnail={true}
                handleImageChange={handleImageChange}
                field={thumbnailImage}
              />
            </>
          ) : (
            <div className={"back-btn"} onClick={() => setDetails(false)}>
              <CustomSvg
                name={"chervonLeft"}
                width={"12"}
                height={"22"}
                color={"#18A0FB"}
              />
              <p className={"back-btn-text"}>Geri</p>
            </div>
          )}
        </div>

        <div className={"actions"}>
          {/* Post button */}
          <CustomButton
            title={"Post"}
            className={"actions-post"}
            onClick={() => createBlog()}
          />
          {/* Hide details button when details are shown */}
          {!isDetails ? (
            <CustomButton
              title={"Details"}
              className={"actions-details"}
              onClick={() => setDetails(true)}
            />
          ) : null}
        </div>
      </div>
      <div className={"content"} onClick={(e) => clickedAside(e)}>
        {!isDetails ? (
          <div className={"fields"}>
            {fields.map((field) => {
              switch (field.type) {
                case "text":
                  return (
                    <TextField
                      field={field}
                      deleteField={deleteField}
                      handleTextChange={handleTextChange}
                      key={field.id}
                    />
                  );
                case "image":
                  return (
                    <ImageField
                      field={field}
                      handleImageChange={handleImageChange}
                      deleteField={deleteField}
                    />
                  );
                default:
                  return null;
              }
            })}

            {/* Add field button */}
            <div className={"add-button"}>
              {/* Add butotn */}
              <div onClick={() => setModalFields(!modalFields)}>
                <CustomSvg name={"plusCircle"} width={"50"} height={"50"} />
              </div>
              {/* Add pop up */}
              {modalFields ? (
                <ModalAdd
                  addTextField={addTextField}
                  addImageField={addImageField}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className={"details"}>
            <div className={"details-one"}>
              <DetailsInput type={"notSmall"} />
              <DetailsInput type={"notSmall"} />
              <DetailsInput type={"notSmall"} />
              <DetailsInput type={"notSmall"} />
            </div>
            <div className={"details-two"}>
              <div className={"details-two-item"}>
                <DetailsInput type={"notSmall"} />
                <DetailsInput />
              </div>
              <div className={"details-two-item"}>
                <DetailsInput type={"notSmall"} />
                <DetailsInput />
              </div>
              <div className={"details-two-item"}>
                <DetailsInput type={"notSmall"} />
                <DetailsInput />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
