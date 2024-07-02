import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="App-heading">
        MBTI 별<br />
        <span className="accent">좋아하는 컬러</span>
      </h1>
      <div>
        <span className="filter">
          <span>ISFJ</span>
          <img src={logo} className="App-logo" alt="logo" />
          {/* <img class="remove-icon" src="resources/img/x.svg" /> */}
        </span>
      </div>
      <div className="content">
        <a className="add-item" href="NewColor.html">
          + 새 컬러 등록하기
        </a>
        <ul className="items" id="items"></ul>
      </div>
    </div>
  );
}

export default App;
