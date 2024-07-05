import "./App.css";
import logoImg from "./assets/logo.png";
import ReviewForm from "./ReviewForm";
import ticketImg from "./assets/ticket.png";
import ReviewList from "./ReviewList";
import mockItems from "./mock.json";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
} from "./firebase";
import { useEffect, useState } from "react";
import "./firebase.js";
import { limit } from "firebase/firestore";

const LIMIT = 10;
// 목록의 갯수 제한 10으로... 상수로 만들 때는 대문자로 만들기!

function AppSortbutton({ children, onClick, selected }) {
  let isSelected = "";
  if (selected) {
    isSelected = "selected";
  }

  return (
    <button className={`AppSortButton ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}
// { children } 텍스트, 요소, 컴포넌트도 전달이 가능함.

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "movie",
      options
    );
    console.log(resultData);

    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    if (!lastQuery) {
      setHasNext(false);
    }
    //setItems([...기존배열, ...새로운값]);
    setLq(lastQuery);
  };

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  const handleAddSuccess = (data) => {
    setItems((prevItems) => [data, ...prevItems]);
  };

  const handleDelete = async (docId, imgUrl) => {
    // 1. 파이어베이스에 접근해서 imgUrl을 사용해 스토리지에 있는 사진파일 삭제
    // 2. docId를 사용해 문서 삭제
    const result = await deleteDatas("movie", docId, imgUrl);
    // db에서 삭제를 성공했을 때문 그결과를 화면에 반영한다.
    if (!result) {
      alert("저장된 이미지 파일이 없습니다. \n관리자에게 문의하세요.");
      return false;
    }
    // 3. items에서 docId가 같은 요소(객체)를 찾아서 제거
    setItems((prevItems) => {
      const filterArr = prevItems.filter((item) => {
        return item.docId !== docId;
      });
      return filterArr;
    });
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
  }, [order]);
  // 배열에 하나만 변경되어도 랜더링 됨. 다시실행 되는 코드 살피기, []빈배열 ->최초랜더링 되는 것 한번만 하는 상태.
  //  order라는 키에 해당하는 값이 order 라는 변수.
  // 비동기로 실행 (함수, []) 함수실행 -> [] 변경확인 -> 다시 함수 실행

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm addData={addDatas} handleAddSuccess={handleAddSuccess} />
        </div>
        <div className="App-sorts">
          <AppSortbutton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            최신순
          </AppSortbutton>
          <AppSortbutton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            베스트순
          </AppSortbutton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} handleDelete={handleDelete} />
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더보기{" "}
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
