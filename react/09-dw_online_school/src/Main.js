import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./components/App";
import CourseListPage from "./pages/CourseListPage";
import QuestionListPage from "./pages/QuestionListPage";
import CoursePage from "./pages/CoursePage";
import Login from "./components/Login";

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route index element={<CourseListPage />} />
            <Route path=":courseSlug" element={<CoursePage />} />
          </Route>
          <Route path="questions" element={<QuestionListPage />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
