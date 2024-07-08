import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState();
  const handleClick = () => {
    setCount(count + 1);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    console.log("나는 화면이 최초 렌더링될 때 실행되는 uef야.");
  }, []); //[](디펜던시 리스트) 안에는 react 가 무엇을 지켜볼 지 작성해준다. 무조건 최초는 한번 실행
  useEffect(() => {
    console.log("나는 count가 변경될 때 실행되는 uef야");
  }, [count]);
  useEffect(() => {
    console.log("나는 inputValue가 변경될 때 실행되는 uef야");
  }, [input]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="search here"
        onChange={(e) => {
          console.log(e.target.value);
          setInput(e.target.value); // 화면 다시 랜더링 해줌.
        }}
      />
      <h2>입력한 값 : {input}</h2>
      <h1>{count}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
