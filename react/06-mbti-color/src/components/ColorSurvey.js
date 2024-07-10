import React from "react";
import styles from "./ColorSurvey.module.css";
import colorList from "../lib/mock.json";

function ColorSurvey({ mbtiData }) {
  // ({mbtiData(객체)}) 를 넣어서 해줘두 됨.  ==> 구조분해
  // cosnt mbtiData = props.mbtiData;
  // cosnt {mbtiData} = props;
  const { colorCode, reatedAt, updatedAt, id, mbti } = mbtiData;

  // colorList.map((m) => {
  //   console.log(m.colorCode);
  // });

  return (
    <div className={styles.colorSurvey}>
      <div className={styles.id}>{id}</div>
      {/* <div className={styles.id}>{mbtiData.id}</div> */}
      <div className={styles.mbti}>{mbti}</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src="/images/arrow.svg" />
      </div>
      <div
        className={styles.colorChip}
        style={{ backgroundColor: `${colorCode}` }}
      ></div>
      <div className={styles.colorCode}>{colorCode}</div>
    </div>
  );
}

export default ColorSurvey;
