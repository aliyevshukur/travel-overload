import React, { useState } from "react";

import "../Create/style.scss";
import { CustomButton, CustomSvg } from "../../components";
import { DetailsInput } from "./components";
import ModalAdd from "./components/ModalAdd";
import TextField from "./components/TextField";
import ImageField from "./components/ImageField";
import { connect } from "react-redux";
import { postBlog } from "../../store/blogs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const mapStateToProps = (state) => ({});

export const Create = connect(mapStateToProps)(({ dispatch }) => {
  const [isDetails, setDetails] = useState(false);
  const [fields, setFields] = useState([
    { id: 0, type: "text", text: "" }, // Title field
    { id: 1, type: "image", url: "" }, // Thumbnail field
    { id: 2, type: "text", text: "" }, // First context field
  ]);
  const [modalFields, setModalFields] = useState(false);
  const history = useHistory();

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
        url: "",
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
      setModalFields(false);
    }
  }

  function handleImageChange(e, id, isThumbnail) {
    e.preventDefault();
    const url = e.target.value;

    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        const updatedField = {
          ...field,
          url: url,
        };
        return updatedField;
      } else {
        return field;
      }
    });
    console.log(`URL on change : ${JSON.stringify(updatedFields)}`);

    setFields(updatedFields);
  }

  function handleTextChange(id, value) {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        const updatedField = {
          ...field,
          text: value,
        };
        return updatedField;
      } else {
        return field;
      }
    });
    setFields(updatedFields);
  }

  function createBlog(e) {
    e.preventDefault();
    const blog = formatBlogData();
    dispatch(postBlog(blog));
    history.push("/new");
  }

  function formatBlogData() {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    const blog = {
      title: fields[0].text,
      context: fields,
      thumbnailImage: fields[1].url,
      postDate: formattedDate,
      author: "Henry Roberts",
      authorImage:
        "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    return blog;
  }

  return (
    <div className={"create-container"} onClick={(e) => clickedAside(e)}>
      <form className={"create-header"} onSubmit={createBlog}>
        {/* Load Title or Back button */}
        <div className={isDetails ? "back" : "title"}>
          {!isDetails ? (
            <>
              {/* Input where title of a blog is entered */}
              <p className={"title-text"}>Title</p>
              <TextField
                field={fields[0]}
                isTitle={true}
                handleTextChange={handleTextChange}
              />
              <ImageField
                isThumbnail={true}
                handleImageChange={handleImageChange}
                field={fields[1]}
              />
            </>
          ) : (
            <CustomButton onClick={() => setDetails(false)} title={"Back"} />
          )}
        </div>

        <div className={"actions"}>
          {/* Post button */}
          <CustomButton
            title={"Post"}
            className={"actions-post"}
            type={"submit"}
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
      </form>
      <div className={"content"} onClick={(e) => clickedAside(e)}>
        {!isDetails ? (
          <div className={"fields"}>
            {fields.slice(2).map((field) => {
              if (field.id === 0) {
                return field;
              }
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
});
