import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "../../../components/auth.styled";

const SignUp = () => {
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
        " https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userInfo.userEmail,
            password: userInfo.userPw,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.statusCode === "400") {
            alert("이메일이 이미 존재합니다.");
            return;
          }
          localStorage.setItem("access_token", result.access_token);
          alert("회원가입 성공! Todo로 이동합니다");
          setUserInfo({ email: "", password: "" });
          navigate("/");
        });
    }
  };
  return (
    <S.AuthContainer>
      <div>
        <h1>TODO 회원가입 페이지</h1>
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
          회원가입
        </S.Button>
      </S.ButtonWrapper>
      <div onClick={() => navigate("/")}>로그인 페이지로 돌아가기</div>
    </S.AuthContainer>
  );
};
export default SignUp;
