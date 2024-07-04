import React from "react";
import placeholderImg from "./assets/preview-placeholder.png";
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";

function FileInput({ name, onChange }) {
  const handleFileChange = (e) => {
    console.log(e);
    const nextFile = e.target.files[0];
    onChange(name, nextFile);
  };
  return (
    <div className="FileInput">
      <img className="FileInput-preview" src={placeholderImg} />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/*" // 이미지만 선택(image/png, image/jpeg)
        onChange={handleFileChange}
      />
      <button className="FileInput-clear-button">
        <img src={resetImg} />
      </button>
    </div>
  );
}

export default FileInput;
