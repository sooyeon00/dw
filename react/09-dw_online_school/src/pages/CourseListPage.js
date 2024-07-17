import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPege.module.css";
import CourseItem from "../components/CourseItem";
import { getDatas } from "../api/firebase";

let listItems;

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  const [keyword, setkeyword] = useState();

  const handleKeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장한다.
    setkeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 전체 데이터를 가지고 있는 listItems를 활용해
    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    // [{..., ..., title: "프로그래밍 in javascript"}]
    const searchItems = listItems.filter(function (item) {
      return item.title.includes(keyword);
    });
    // 만든 배열을 items state에 set 해준다.
    setItems(searchItems);
    setItems(listItems.filter(({ title }) => title.includes(keyword))); // 짧게 바꾼 코드
  };

  const handleLoad = async () => {
    // 파이어베이스의 courses 컬렉션의 데이터를 가져온다. (파이어 베이스 함수 먼저 작성 후)
    const resultData = await getDatas("courses");
    // 전체 데이터 변수에 저장
    listItems = resultData;
    // 가져온 데이터 콘솔로 확인.
    console.log(resultData);

    // items state에 set 해준다.
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage
      variant={"catalog"}
      head={"모든 코스"}
      $color
      list={"자체 제작된 코스들로 기초를 쌓으세요.❤❤❤"}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="검색으로 코스 찾기"
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>

      <p className={styles.count}>총 {items.length}개 코스</p>

      <div className={styles.courseList}>
        {items.map((course) => {
          return <CourseItem key={course.docId} course={course} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
