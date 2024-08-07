import React, { useContext, useState, useTransition } from "react";
import FileInput from "./FileInput.js";
import RatingInput from "./RatingInput.js";
import "./ReviewForm.css";
import { LocaleContext, useLocale } from "./contexts/LocaleConext.js";
import useTranslate from "./hooks/useTranslate.js";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({
  onSubmit,
  handleSubmitSuccess,
  initialPreview,
  initialValues = INITIAL_VALUE,
  handleCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslate();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 버튼 비활성화
    setIsSubmitting(true);
    e.target.reset();

    const result = await onSubmit("movie", values);
    handleSubmitSuccess(result);
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
          initialPreview={initialPreview}
        />
        {/* onChange={handleChange} 값을 전달하는 용도. 프롭 */}
      </div>

      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder={t("title placeholder")}
          onChange={handleInputChange}
          value={values.title} // html 같은 {함수실행}
        />
        <RatingInput
          inputName="rating"
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name="content"
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
          value={values.content}
        />
        {handleCancel && (
          <button onClick={() => handleCancel(null)}>
            {t("cancel button")}
          </button>
        )}
        <button type="submit" disabled={isSubmitting}>
          {t("confirm button")}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
