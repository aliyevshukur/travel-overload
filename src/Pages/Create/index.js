import React, { useState } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CustomButton, CustomSvg, CustomUploadWidget } from "../../components";
import CloudinaryImage from "../../components/CloudinaryImage";
import { isTabletMode } from "../../store/appState";
import { postBlog } from "../../store/blogs";
import "../Create/style.scss";
import { DetailsInput } from "./components";
import ImageField from "./components/ImageField";
import ModalAdd from "./components/ModalAdd";
import TextField from "./components/TextField";

const mapStateToProps = (state) => ({
  isTabletMode: isTabletMode(state),
});

export const Create = connect(mapStateToProps)(({ dispatch, isTabletMode }) => {
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

  function handleImageChange(url, isThumbnail, id) {
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

    if (fields[1].url === "") {
      alert("Please choose thumbnail url for your post");
      return;
    }

    const blog = formatBlogData();
    dispatch(postBlog(blog));
    history.push("/new");
  }

  function formatBlogData() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate);

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
    <form
      className={"create"}
      onClick={(e) => clickedAside(e)}
      onSubmit={createBlog}
    >
      <div className={"create-header"}>
        {isTabletMode && (
          <CustomButton
            title={"Post"}
            className={"actions-post"}
            type={"submit"}
          />
        )}
        <h1 className={"title-text"}>Title</h1>
        <div className='row-wrapper'>
          <div className={"title"}>
            <TextField
              field={fields[0]}
              isTitle={true}
              handleTextChange={handleTextChange}
              className={"title-input"}
              required={true}
            />
          </div>
          {!isTabletMode && (
            <CustomButton
              title={"Post"}
              className={"actions-post"}
              type={"submit"}
            />
          )}
        </div>
      </div>
      <h4 className='thumbnail-title'>Please upload thumbnail image</h4>
      <CustomUploadWidget
        handleImageChange={handleImageChange}
        isThumbnail={true}
        id={1}
        required={true}
      />

      <div className='seperator' />

      <div className={"content"} onClick={(e) => clickedAside(e)}>
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
                    required={field.id === 2}
                  />
                );
              case "image":
                return (
                  <CustomUploadWidget
                    handleImageChange={handleImageChange}
                    key={field.id}
                    id={field.id}
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
      </div>
    </form>
  );
});
