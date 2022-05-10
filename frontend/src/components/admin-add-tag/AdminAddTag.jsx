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
        if(jsonresp.data){
            handleModalClose();

        }else{
            console.log('error occurred while adding tag',jsonresp.error.message)
        }
      })
      .catch();
  }

  return (
    <Modal isOpen="true" style={customStyles} contentLabel="Example Modal">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tag Name</label>
          <input name="tag-name" value={tagName} onChange={handleChange} />
        </div>
        <div>
          <label>Tag Description</label>
          <input name="tag-descr" value={tagDescr} onChange={handleChange} />
        </div>
        <div>
          <button
            className="s-btn s-btn__primary"
            disabled={tagName == "" || tagDescr == ""}
          >
            Add Tag
          </button>
          <button className="s-btn s-btn__secondary" onClick={handleModalClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
}
