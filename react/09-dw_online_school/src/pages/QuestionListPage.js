import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import styles from "./QuestionListPage.module.css";
import searchImg from "../assets/search.svg";
import personImg from "../assets/person.png";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import QuestionItem from "../components/QuestionItem";
import { getDatas } from "../api/firebase";

let listItems;

function QuestionListPage(props) {
  const [question, setquestion] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("questions");
    listItems = resultData; // 검색용으로 사용할 전체 데이터를 가지고 있어야 한다.
    setquestion(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleKeywordChange = (e) => {};
  return (
    <ListPage
      variant={"community"}
      head={"커뮤니티"}
      list={"DW 온라인스쿨의 2만 수강생들과 함께 공부해봐요."}
    >
      <form className={styles.form} /*onSubmit={}*/>
        <input
          // value={keyword}
          // onChange={}
          placeholder="검색으로 질문 찾기"
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {0}개 질문</p>
      <div className={styles.questionList}>
        {question.map((question) => (
          <QuestionItem key={question.docId} question={question} />
        ))}
      </div>
    </ListPage>
  );
}

export default QuestionListPage;
