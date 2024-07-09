import React from "react";
import styles from "./ColorSurvey.module.css";
import colorList from "../lib/mock.json";

function ColorSurvey(props) {
  colorList.map((m) => {
    console.log(m.colorCode);
  });
  return (
    <>
      {colorList.map((m) => {
        const { colorCode, reatedAt, updatedAt, id, mbti } = m;
        return (
          <div className={styles.colorSurvey}>
            <div className={styles.id}>{id}</div>
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
      })}
    </>
  );
}

export default ColorSurvey;
