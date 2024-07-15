import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import styles from "./Home.module.css";
import ThemeToggleButton from "./ThemeToggleButton";
import { useTheme } from "../context/ThemeContext";

function Home(props) {
  const [themeMode, toggleTheme] = useTheme();
  return (
    <div>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      {/* <header></header>, <footer></footer> 공통 사이에 변경되는 가운데 부분 */}
      {/* / 기본 하위 경로 아울렛부분에 렌더링, <div> 사이에 중간내용 달라지는 부분에 outlet 들어감</div> */}
      <ThemeToggleButton mode={themeMode} onClick={toggleTheme} />
    </div>
  );
}

export default Home;
