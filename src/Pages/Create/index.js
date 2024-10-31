import React, { useState } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CustomButton, CustomSvg, CustomUploadWidget } from "../../components";
import { isTabletMode } from "../../store/appState";
import { postBlog } from "../../store/blogs";
import { getUser } from "../../store/user";
import "../Create/style.scss";
import DeleteFieldButton from "./components/DeleteFieldButton";
import ModalAdd from "./components/ModalAdd";
import TextField from "./components/TextField";

const Create = ({ dispatch, user, isTabletMode }) => {
  const [fields, setFields] = useState([
    { id: 0, type: "text", text: "" }, // Title field
    { id: 1, type: "image", url: "" }, // Thumbnail field
    { id: 2, type: "text", text: "" }, // First context field
  ]);
  const [modalFields, setModalFields] = useState(false);
  const history = useHistory();
  // console.log(`User, ${JSON.stringify(user)}`);
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
    // console.log("Formatted blog: " + JSON.stringify(blog));
    dispatch(postBlog(blog));
    history.push("/new");
  }

  function formatBlogData() {
    const date = new Date();
    const unixTimestamp = date.getTime() / 1000;

    const blog = {
      title: fields[0].text,
      context: fields,
      thumbnailImage: fields[1].url,
      postDate: unixTimestamp,
      author: user._id,
      views: 0,
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
        <h1 className={"title-text"}>Title</h1>
        <div className={"title"}>
          <TextField
            field={fields[0]}
            isTitle={true}
            handleTextChange={handleTextChange}
            className={"title-input"}
            required={true}
          />
        </div>
        <h1 className={"title-text"}>Description</h1>
        <div className={"title"}>
          <TextField
            field={fields[2]}
            isTitle={true}
            handleTextChange={handleTextChange}
            className={"title-input"}
            required={true}
          />
        </div>
      </div>
      <CustomUploadWidget
        handleImageChange={handleImageChange}
        isThumbnail={true}
        id={1}
        required={true}
        buttonText='Upload thumbnail'
      />

      <div className='seperator' />

      <div className={"content"} onClick={(e) => clickedAside(e)}>
        <div className={"content-fields"}>
          {fields.slice(3).map((field) => {
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
                  <div className='content-fields-image'>
                    <DeleteFieldButton
                      id={field.id}
                      onDelete={deleteField}
                      className='content-fields-image-delete'
                    />
                    <CustomUploadWidget
                      handleImageChange={handleImageChange}
                      key={field.id}
                      id={field.id}
                    />
                  </div>
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
      <CustomButton title={"Post"} className={"create-post"} type={"submit"} />
    </form>
  );
};

const mapStateToProps = (state) => ({
  isTabletMode: isTabletMode(state),
  user: getUser(state),
});

export default connect(mapStateToProps)(Create);
