import React, { useState } from "react";

function ToDoList({ item }) {
  // 타이핑할 때마다 값이 변경. 값을 가지고 있어야 함.
  // input에 변화가 있을 때마다 콘솔에 찍어보기 ==> 값을 가지고 있어야 한다. (관리를 해야 한다 = state로 만들어야 한다)
  const [toDo, setToDo] = useState("");
  const [count, setCount] = useState(0);
  const onChange = (e) => {
    setToDo(e.target.value);
  };

  // 버튼 클릭했을 때(form 태그 안에 있으니 submit 이벤트로) 화면에 나오도록 해야 한다.
  let list = [];

  // 화면에 나오는 todoList는 계속 추가가 되어야 한다. ==> 배열로 만들기(원소의 갯수) ==> 화면에 출력
  const handleClick = (e) => {
    e.preventDefault(); // 기본 submit 이벤트를 막는다.
    if (toDo === "") return false;
    setToDo("");
    setCount(count + 1);
  };

  // map 함수로 반복
  // 배열의 원소 갯수만큼 화면에 렌더링 되어야 한다,
  // 배열의 원소 갯수만틈 숫자가 표시되어야 한다.

  return (
    <div>
      <h1>My To Do ({count})</h1>
      <form onSubmit={handleClick}>
        <input onChange={onChange} value={toDo} />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul className="ToDoList">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
