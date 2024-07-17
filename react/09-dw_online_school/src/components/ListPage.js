import React, { Children } from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";
import catalogImg from "../assets/catalog.svg";
import communityImg from "../assets/community.svg";

const dataDict = {
  catalog: {
    src: catalogImg,
    // title: "모든코스",
    // description: "자체 제작된 코스들로 기초를 쌓으세요.",
  },
  community: {
    src: communityImg,
    // title: "커뮤니티",
    // description: "DW 온라인스쿨의 2만 수강생들과 함께 공부해봐요.",
  },
};

function ListPage({ head, $color, list, variant, children }) {
  return (
    <>
      <div
        className={
          $color == true
            ? cn(styles.bg, styles.catalog)
            : cn(styles.bg, styles.community)
        }
      >
        <img className={styles.icon} src={dataDict[variant].src} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{head}</h1>
          <p className={styles.description}>{list}</p>
        </div>
      </div>
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default ListPage;
