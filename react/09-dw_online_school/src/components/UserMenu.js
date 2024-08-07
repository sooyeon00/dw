import React, { useEffect, useState } from "react";
import personImag from "../assets/person.png";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";

function UserMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const isLogined = JSON.parse(localStorage.getItem("member"));
  const handleClick = (e) => {
    e.stopPropagation();
    // stopPropagation 버블링 막는 것. (버튼에만 적용되지 않도록)
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleClick}>
        <img src={personImag} />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          {!isLogined ? (
            <>
              <li className={styles.disabled}>위시리스트</li>
              <Link to="/login">
                <li>로그인</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/wishlist">
                <li>위시리스트</li>
              </Link>
              <Link to="/logout">
                <li>로그아웃</li>
              </Link>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
