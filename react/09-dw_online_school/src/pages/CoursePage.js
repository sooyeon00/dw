import React, { useEffect, useState } from "react";
import CourseIcon from "../components/CourseIcon";
import Card from "../components/Card";
import Button from "../components/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData } from "../api/firebase";
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

  const handleAddWishlistClick = () => {
    const member = JSON.parse(localStorage.getItem("member"));

    if (member) {
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
