import React, { useState } from "react";
import "../Create/style.scss";
import { CustomSvg } from "../../components";
import { DetailsInput } from "./components";

export const Create = () => {
  const [isDetails, setDetails] = useState(false);
  const [fields, setFields] = useState([{ id: 0, type: "text", text: "" }]);
  const [cross, setCross] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalFields, setModalFields] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);

  const [tools, setTools] = useState({ visibility: false, x: 0, y: 0 });

  const [selected, setSelected] = useState({
    fieldId: null,
    text: "",
    start: null,
    end: null,
  });

  const addTextField = () => {
    setModalFields(false);
    setFields([
      ...fields,
      {
        id: Math.random(),
        type: "text",
        text: "",
      },
    ]);
  };

  const textChanged = (id) => {
    let elem = document.getElementById(id);
    var editedText = elem.textContent || elem.innerText;
    const index = fields.findIndex((item) => item.id === id);
    let edited = fields;
    edited[index].text = editedText;
    setFields([...edited]);
  };

  const addImageField = () => {
    setModalFields(false);
    setImagePicker(true);
  };

  function onChangeImageHandler(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFields([
        ...fields,
        {
          id: Math.random(),
          type: "image",
          file: file,
          imagePreviewUrl: reader.result,
        },
      ]);
      console.log("Uploaded");
    };
    reader.readAsDataURL(file);
    setImagePicker(false);
    console.log(e.target.files[0]);
  }

  const crossIconPosition = (id) => {
    const index = fields.findIndex((item) => item.id === id);
    const textFields = fields.filter((item) => item.type === "text").length;
    if (fields[index].type === "image") {
      setCross(id);
    } else if (textFields > 1) {
      setCross(id);
    } else {
      setCross(null);
    }
  };

  function deleteField(id) {
    const index = fields.findIndex((item) => item.id === id);
    const updatedFields = fields;
    updatedFields.splice(index, 1);
    console.log(index);
    setFields([...updatedFields]);
  }
  function clickedAside(e) {
    if (e.target === e.currentTarget) {
      console.log("clicked aside");
      setModalFields(false);
      setCross(null);
      setDeleteTarget(null);
    }
  }

  function textSelected(id) {
    setTools({ visibility: false, x: 0, y: 0 });
    if (window.getSelection().toString().trim().length > 0) {
      let txt = window.getSelection(),
        range = txt.getRangeAt(0),
        boundary = range.getBoundingClientRect();
      let scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      const posX = (boundary.left + boundary.right) / 2 - 98;
      const posY = boundary.top - 70 + scrollTop;
      setTools({ visibility: true, x: posX, y: posY });

      let start = txt.anchorOffset,
        end = txt.focusOffset;
      if (start > end) {
        let swap = start;
        start = end;
        end = swap;
      }
      setSelected({ fieldId: id, text: txt.toString().trim(), start, end });
    }
  }

  function makeBold() {
    const index = fields.findIndex((item) => item.id === selected.fieldId);
    let fieldText = fields[index].text;

    let pStart = selected.start,
      pEnd = selected.end;

    let left = "",
      middle = "",
      right = "";

    let newFields = fields;

    let startingStars = fieldText.substring(pStart - 2, pStart),
      endingStars = fieldText.substring(pEnd, pEnd + 2);

    if (startingStars === "**" && endingStars === "**") {
      left = fieldText.substring(0, pStart - 2);
      middle = fieldText.substring(pStart, pEnd);
      right = fieldText.substring(pEnd + 2);
    } else {
      left = fieldText.substring(0, pStart);
      middle = " **" + fieldText.substring(pStart, pEnd).trim() + "** ";
      right = fieldText.substring(pEnd);
    }

    newFields[index].text = left + middle + right;
    setFields([...newFields]);
    console.log(fields[index].text);

    document.getElementById(selected.fieldId).innerHTML = left + middle + right;
  }

  return (
    <div className={"create-container"} onClick={(e) => clickedAside(e)}>
      <div className={"header"}>
        <div className={isDetails ? "back" : "title"}>
          {!isDetails ? (
            <>
              <p className={"title-text"}>Başlıq</p>
              <input
                className={"title-input"}
                type={"text"}
                placeholder={"Başlığı daxil edin"}
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
          <div className={"actions-post"}>
            <p className={"actions-post-text"}>Post</p>
            <CustomSvg
              name={"send"}
              width={"25"}
              height={"25"}
              color={"#FFFFFF"}
            />
          </div>
          {!isDetails ? (
            <div className={"actions-details"} onClick={() => setDetails(true)}>
              <p className={"actions-details-text"}>Detallar</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className={"content"} onClick={(e) => clickedAside(e)}>
        {tools.visibility ? (
          <div
            className={"tools"}
            style={{ top: `${tools.y}px`, left: `${tools.x}px` }}
          >
            <div className={"tools-btn"} onClick={makeBold}>
              <b className={"tools-btn-text"}>B</b>
            </div>
            <div className={"tools-btn"}>
              <i className={"tools-btn-text"} style={{ fontStyle: "italic" }}>
                I
              </i>
            </div>
            <div className={"tools-btn"}>
              <u
                className={"tools-btn-text"}
                style={{ textDecoration: "underlined" }}
              >
                U
              </u>
            </div>
            <div className={"tools-btn"}>
              <CustomSvg
                name={"link"}
                color={"#ffffff"}
                width={"30"}
                height={"30"}
              />
            </div>
          </div>
        ) : null}
        {!isDetails ? (
          <div className={"editables"}>
            {fields.map((item) => (
              <div
                className={"editables-item"}
                onMouseEnter={() => crossIconPosition(item.id)}
                key={item.id}
              >
                {item.type == "text" ? (
                  <p
                    id={`${item.id}`}
                    contentEditable={"true"}
                    className={"editables-item-text"}
                    onMouseUp={() => textSelected(item.id)}
                    onInput={() => textChanged(item.id)}
                  >
                    {item.text}
                  </p>
                ) : (
                  <img
                    src={item.imagePreviewUrl}
                    className={"editables-item-pic"}
                  />
                )}
                {imagePicker && item.id == fields[fields.length - 1].id ? (
                  <div className={"editables-item-browse"}>
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      className={"editables-item-browse-input"}
                      onChange={(e) => onChangeImageHandler(e)}
                    />
                    <button
                      onClick={() => setImagePicker(false)}
                      title="cancel"
                    >
                      cancel file upload
                    </button>
                  </div>
                ) : null}
                {cross == item.id ? (
                  <div
                    className={"editables-item-cross"}
                    onClick={() => setDeleteTarget(item.id)}
                  >
                    <CustomSvg name={"cross"} width={"30"} height={"30"} />
                  </div>
                ) : null}
                {deleteTarget == item.id ? (
                  <div className={"delete"}>
                    <p className={"delete-title"}>
                      Silmək istədiyinizdən əminsiniz?
                    </p>
                    <div className={"delete-actions"}>
                      <button
                        className={"delete-actions-btn"}
                        onClick={() => deleteField(item.id)}
                      >
                        Hə
                      </button>
                      <button
                        className={"delete-actions-btn"}
                        onClick={() => setDeleteTarget(null)}
                      >
                        Yox
                      </button>
                    </div>
                  </div>
                ) : null}
                {!imagePicker && item.id == fields[fields.length - 1].id ? (
                  <div
                    className={"editables-item-add"}
                    onClick={() => setModalFields(!modalFields)}
                  >
                    <CustomSvg name={"plusCircle"} width={"50"} height={"50"} />
                  </div>
                ) : null}
                {modalFields && item.id == fields[fields.length - 1].id ? (
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
                      <div
                        className={"modal-btn-image"}
                        onClick={addImageField}
                      >
                        <CustomSvg
                          name={"camera"}
                          color={"#ffffff"}
                          width={"30"}
                          height={"30"}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
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
