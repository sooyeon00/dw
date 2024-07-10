import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ColorSurvey from "../components/ColorSurvey";
import mockItems from "../lib/mock.json";
import { getAllDatas } from "../lib/firebase";

function Home(props) {
  // const [items(배열), setItems] = useState(최초 렌더링 초기값 []);
  // const itemState = useState([]);
  // const items = itemState[0];
  // const setItems = itemState[1];
  // ===> 원래는 3개로 나눠 써야 함.
  // 하나의 배열 0(),1(컴포넌트 리렌더링 하면서 items 값이 바꿔서 나옴)
  // useEffect(() => {setItems(mockItems)},[]);  -> 한번만 실행되게
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    // 파이어베이스에서 데이터 가져오기
    const resultData = await getAllDatas("mbtiColor", "id");
    // items state에 셋팅
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  console.log(styles);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <haader className={styles.haader}>
          <h1 className={styles.heading}>
            MBTI별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <img className={styles.removeIcon} src="/images/x.svg" />
            </div>
          </div>
        </haader>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {/* {items.map(elememt(원소), index, array 3가지)} */}
          {items.map((item, idx) => {
            return <ColorSurvey key={idx} mbtiData={item} />;
          })}{" "}
          {/*화살표 함수에서는 2개 이상일 때 () 넣어주기*/}
          {/* <ColorSurvey /> */}
        </ul>
      </main>
    </div>
  );
}

export default Home;
