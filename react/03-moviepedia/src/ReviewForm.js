import React, { useState } from "react";
import FileInput from "./FileInput.js";
import RatingInput from "./RatingInput.js";
import "./ReviewForm.css";

function ReviewForm(props) {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // handleChange(name, value);
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <form className="ReviewForm">
      <div>
        <FileInput name="imgUrl" onChange={handleChange} />
        {/* onChange={handleChange} 값을 전달하는 용도. 프롭 */}
      </div>

      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          onChange={handleInputChange} // html 같은 {함수실행}
        />
        <RatingInput />
        <textarea
          name="content"
          placeholder="내용을 입력해주세요."
          onChange={handleInputChange}
        />
        <button>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
