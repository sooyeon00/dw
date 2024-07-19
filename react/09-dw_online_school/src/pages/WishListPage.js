import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseItem from "../components/CourseItem";
import CloseButtonImg from "../assets/closeButton.svg";
import styles from "./WishListPage.module.css";
import { getData, getDatas, updateDatas } from "../api/firebase";
import Warn from "../components/Warn";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function WishListPage(props) {
  // courseList state 가 필요함
  const [items, setitems] = useState([]);
  const [courseList, setcouseList] = useState([]);
  const member = JSON.parse(localStorage.getItem("member"));

  // handleLoad 함수에서 로그인 사용자의 email로 member 문서 가져오고
  // 문서 안에 있는 courseList를 state에 set 해준다.
  const handleLoad = async () => {
    const { email } = member;
    const resultData = await getData("member", {
      field: "email",
      condition: "==",
      value: email,
    });
    setcouseList(resultData.courseList);
  };

  const handleDelete = async (course) => {
    const result = await updateDatas("member", member.docId, course, {
      type: "DELETE",
      fieldName: "courseList",
    });
    handleLoad();
  };

  // useEffect 안에서 handleLoad 함수 실행
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Container className={styles.Container}>
      <h1 className={styles.title}>나의 위시리스트</h1>
      {courseList.length === 0 ? (
        <>
          <Warn
            className={styles.emptyList}
            title="담아 놓은 코스가 없어요."
            description="카탈로그에서 나에게 필요한 코스를 찾아보세요."
          />
          <div className={styles.link}>
            <Link to="/courses">
              <Button>코스 찾아보기</Button>
            </Link>
          </div>
        </>
      ) : (
        <ul className={styles.items}>
          {courseList.map((item) => {
            return (
              <li className={styles.item} key={item.slug}>
                <CourseItem course={item} />
                <img
                  className={styles.delete}
                  src={CloseButtonImg}
                  onClick={() => handleDelete(item)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}

export default WishListPage;
