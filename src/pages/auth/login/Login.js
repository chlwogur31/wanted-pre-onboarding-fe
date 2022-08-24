import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "../../../components/auth.styled";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ userEmail: "", userPw: "" });
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isValid =
    userInfo.userEmail.includes("@") && userInfo.userPw.length >= 8;

  useEffect(() => {
    if (localStorage.getItem("access_token") && location === "/") {
      navigate("/todo");
    }
  }, []);

  const handleUserInfo = (event) => {
    const { value, name } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const loginFunction = (event) => {
    event.preventDefault();
    if (!isValid) {
      alert("이메일 또는 비밀번호를 확인해주세요");
    } else {
      fetch(
        " https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin",
        {
          method: "POST",
          body: JSON.stringify({
            email: userInfo.userEmail,
            password: userInfo.userPw,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (
            result.message === "Unauthorized" ||
            result.error === "Not Found"
          ) {
            alert("회원가입이 완료되지 않았습니다.");
            return;
          }
          localStorage.setItem("access_token", result.access_token);
          alert("로그인 성공");
          navigate("/todo");
        });
    }
  };
  return (
    <S.AuthContainer>
      <div>
        <h1>TODO Login page</h1>
      </div>
      <S.InputWrapper>
        <S.InputBox
          placeholder="이메일을 입력해주세요"
          onChange={handleUserInfo}
          type="email"
          name="userEmail"
        ></S.InputBox>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputBox
          placeholder="비밀번호를 입력해주세요"
          onChange={handleUserInfo}
          type="password"
          name="userPw"
        ></S.InputBox>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <S.Button type="button" onClick={loginFunction} disabled={!isValid}>
          로그인
        </S.Button>
      </S.ButtonWrapper>
      <div onClick={() => navigate("/signup")}>회원가입</div>
    </S.AuthContainer>
  );
};

export default Login;
