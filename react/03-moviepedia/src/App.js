import "./App.css";
import logoImg from "./assets/logo.png";
import ReviewForm from "./ReviewForm";
import ticketImg from "./assets/ticket.png";
import ReviewList from "./ReviewList";
import mockItems from "./mock.json";
import { getDatas } from "./firebase";
import { useEffect, useState } from "react";
import "./firebase.js";

function AppSortbutton({ children }) {
  return <button className="AppSortButton selected">{children}</button>;
}
// { children } 텍스트, 요소, 컴포넌트도 전달이 가능함.

function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("movie");
    console.log(resultData);
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  // 배열에 하나만 변경되어도 랜더링 됨. 다시실행 되는 코드 살피기, []빈배열 ->최초랜더링 되는 것 한번만 하는 상태.

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
          <ReviewForm />
        </div>
        <div className="App-sorts">
          <AppSortbutton>최신순</AppSortbutton>
          <AppSortbutton>베스트순</AppSortbutton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          <button className="App-load-more-button">더보기</button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
