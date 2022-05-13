import React, { useState } from "react";
import "./AdminAddTag.css";
import Modal from "react-modal";
import { KAFKA_MIDDLEWARE_URL } from "../../config/configBackend";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "35%",
    left: "30%",
    right: "30%",
    bottom: "35%",
  },
  overlay: { zIndex: 1000 },
};

export default function AdminAddTag({ handleModalClose }) {
  const [tagName, setTagName] = useState("");
  const [tagDescr, setTagDescr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [msgClass,setMsgClass]  = useState("");

  function handleChange(event) {
    if (event.target.name === "tag-name") {
      setTagName(event.target.value);
    } else {
      setTagDescr(event.target.value);
    }
  }

  //   function handleValidation() {}

  function handleSubmit(event) {
    event.preventDefault();
    fetch(KAFKA_MIDDLEWARE_URL + "admin/add-tag", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tagName,
        descr: tagDescr,
      }),
    })
      .then((res) => res.json())
      .then((jsonresp) => {
        console.log(jsonresp);
        if (jsonresp.data) {
          setMsgClass("modal__sucess");
          setErrorMsg(jsonresp.data.message);
          setTimeout(() => {
            handleModalClose();
          }, 3000);
        } else {
          console.log(
            "error occurred while adding tag",
            jsonresp.error.message
          );
          setMsgClass("modal__error");
          setErrorMsg(jsonresp.error.message)
          setTimeout(() => {
            setErrorMsg("")
          }, 3000);
        }
      })
      .catch();
  }

  return (
    <Modal isOpen="true" style={customStyles} contentLabel="Example Modal">
      <form onSubmit={handleSubmit}>
        <div className="modal__container">
          <div className="modal__header">Add Tag Here</div>
          <div className={msgClass}>{errorMsg}</div>
          <div className="tagform__input">
            <label htmlFor="tag-name" className="label1">Tag Name</label>
            <input
            type="text"
              name="tag-name"
              id="tag-name"
              value={tagName}
              onChange={handleChange}
            />
            <label htmlFor="tag-descr" className="label2">Tag Description</label>
            <textarea
              name="tag-descr"
              id="tag-descr"
              value={tagDescr}
              onChange={handleChange}
            />
          </div>
          <div className="tagform__buttons">
            <button
              className="s-btn s-btn__primary tagform_button"
              disabled={tagName == "" || tagDescr == "" || errorMsg!=""}
            >
              Add Tag
            </button>
            <button
              className="s-btn s-btn__filled s-btn__danger"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
