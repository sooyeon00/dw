import "./App.css";
import logoImg from "./assets/logo.png";
import logoTextImg from "./assets/logo-text.png";
import backgroundImg from "./assets/background.png";
import FoodForm from "./components/FoodForm";
// import mockItems from ".mock.json";

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm />
        </div>
        <div className="App-Filter"></div>
        {/* <FoodList /> */}
        <button>더 보기</button>
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
