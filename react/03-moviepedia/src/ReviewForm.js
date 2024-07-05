import React, { useState } from "react";
import FileInput from "./FileInput.js";
import RatingInput from "./RatingInput.js";
import "./ReviewForm.css";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({ addData, handleAddSuccess }) {
  const [values, setValues] = useState({ INITIAL_VALUE });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 버튼 비활성화
    setIsSubmitting(true);
    e.target.reset();

    const result = await addData("movie", values);
    handleAddSuccess(result);
    setValues(INITIAL_VALUE);
    // 버튼 활성화
    setIsSubmitting(false);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName="imgUrl"
          onChange={handleChange}
          value={values.imgUrl}
        />
        {/* onChange={handleChange} 값을 전달하는 용도. 프롭 */}
      </div>

      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          onChange={handleInputChange} // html 같은 {함수실행}
        />
        <RatingInput
          inputName="rating"
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name="content"
          placeholder="내용을 입력해주세요."
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isSubmitting}>
          확인
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
