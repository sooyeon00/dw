import React from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";
import caltalogImg from "../assets/catalog.svg";

function ListPage({ head, $color, list }) {
  return (
    <>
      <div
        className={
          $color == true
            ? cn(styles.bg, styles.catalog)
            : cn(styles.bg, styles.community)
        }
      >
        <img className={styles.icon} src={caltalogImg} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{head}</h1>
          <p className={styles.description}>{list}</p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
