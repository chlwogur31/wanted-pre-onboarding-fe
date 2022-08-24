import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import Todo from "./pages/todo/Todo";
import GlobalStyle from "./styles/GlobalStyle";
import variables from "./styles/variables";
const Router = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: skyblue;
  color: black;
  ${variables.flex({ direction: "column" })}
`;

export default Router;
