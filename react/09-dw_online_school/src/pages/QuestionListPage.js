import React, { useState } from "react";
import ListPage from "../components/ListPage";
import styles from "../pages/QuestionListPage.module.css";
import searchImg from "../assets/search.svg";
import personImg from "../assets/person.png";
import Card from "../components/Card";
import { Link } from "react-router-dom";

function QuestionListPage(props) {
  const [question, setquestion] = useState([]);

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
      <p className={styles.count}>총 0개 질문</p>
      <div className={styles.questionList}>
        <div className={styles.questionItem}>
          <Card className={styles.info}>
            <p className={styles.title}>
              <Link>어디가 잘못 된걸까요? </Link>
              <span className={styles.questionCount}>[1]</span>
            </p>
            <p className={styles.date}>2021.10.14</p>
          </Card>
        </div>
        <div className={styles.witer}>
          <img src={personImg} />
        </div>
      </div>
    </ListPage>
  );
}

export default QuestionListPage;
