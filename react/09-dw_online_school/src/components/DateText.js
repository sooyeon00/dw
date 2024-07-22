import React from "react";

function DateText({ value }) {
  if (!value) return;
  return new Date(value).toLocaleDateString("KO-KR");
}

export default DateText;
