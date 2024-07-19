import React, { useEffect, useState } from "react";
import CourseIcon from "../components/CourseIcon";
import Card from "../components/Card";
import Button from "../components/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData, updateDatas } from "../api/firebase";
import styles from "./CoursePage.module.css";
import Container from "../components/Container";

function CoursePage() {
  const props = useLocation(); // 간단한 정보만 사용.
  const { pathname } = props;
  const { courseSlug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState();
  //   const { title, summary, photoUrl, topics } = course;
  console.log(course);

  // if(course) {
  //  getCourseColor(course.code) }
  const courseColor = getCourseColor(course?.code);
  const headerStyle = {};

  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };

  const handleAddWishlistClick = async () => {
    const member = JSON.parse(localStorage.getItem("member"));

    if (member) {
      const result = await updateDatas("member", member.docId, course, {
        type: "ADD",
        fieldName: "courseList",
      });
      if (result) {
        navigate("/wishlist");
      } else {
        alert("코스 담기를 실패했습니다. \n관리자에게 문의하세요.");
      }
    } else {
      alert("로그인을 해주세요.");
      navigate("/login", { state: pathname });
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button variant="round" onClick={handleAddWishlistClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          return (
            <Card key={topic.slug} className={styles.topic}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
