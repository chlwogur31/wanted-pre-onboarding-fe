import { observer } from "mobx-react";

import * as S from "./Todo.styled";
import { useState, useEffect } from "react";
import { APP_API } from "../../config";
import TodoItem from "./todoitem/TodoItem";
import { storeTodoData } from "../../store/storeTodo";
import { useNavigate, useLocation } from "react-router-dom";

const Todo = observer(() => {
  const [todoText, setTodoText] = useState("");
  const getToken = localStorage.getItem("access_token");

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { todoArr } = storeTodoData;

  useEffect(() => {
    if (!getToken && location === "/todo") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!getToken) {
      return;
    }
    fetch(`${APP_API.todo}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("done");
        storeTodoData.setTodoArr(result);
      });
  }, [getToken]);

  const todoPost = async () => {
    const res = await fetch(`${APP_API.todo}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todoText,
      }),
    });

    const result = await res.json();

    storeTodoData.addTodo(result);
    setTodoText("");
  };

  return (
    <>
      <h1>Todo List</h1>
      <S.TodoWrapper>
        <S.TodoTop>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button type="button" onClick={todoPost}>
            add
          </button>
        </S.TodoTop>
        <S.TodoBody>
          {todoArr &&
            todoArr.map((data) => (
              <TodoItem
                key={data.id}
                id={data.id}
                isCompleted={data.isCompleted}
                todoContent={data.todo}
              />
            ))}
        </S.TodoBody>
      </S.TodoWrapper>
    </>
  );
});

export default Todo;
