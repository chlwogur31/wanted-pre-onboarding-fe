import React, { useState } from "react";
import { APP_API } from "../../../config";
import { observer } from "mobx-react";
import { storeTodoData } from "../../../store/storeTodo";
import * as S from "./TodoItem.styled";

const TodoItem = observer(({ id, isCompleted, todoContent }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isClear, setIsClear] = useState(isCompleted);
  const [editText, setEditText] = useState(todoContent);
  const getToken = localStorage.getItem("access_token");

  const deleteRequest = () => {
    fetch(`${APP_API.todo}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken}` },
    }).then((res) => res.ok && storeTodoData.deleteTodo(id));
  };

  const editRequest = async (editContent) => {
    const postText = editContent || todoContent;

    const res = await fetch(`${APP_API.todo}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: postText,
        isCompleted: isClear,
      }),
    });

    if (!res.ok) {
      alert("수정에 실패했습니다");
    }

    const result = await res.json();
    storeTodoData.editTodo(result);
  };

  return (
    <S.TodoList id={id}>
      {!isEditMode && (
        <S.TodoContent isClear={isClear}>
          <S.ClearCheckBtn
            onClick={() => {
              setIsClear((prev) => !prev);
              editRequest();
            }}
            isClear={isClear}
          />
          {todoContent}
        </S.TodoContent>
      )}

      {/* 수정모드 */}
      {isEditMode && (
        <S.TodoEdit
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      )}

      {!isEditMode && (
        <S.TodoControlBtns>
          <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
            수정
          </button>
          <button type="button" onClick={deleteRequest}>
            삭제
          </button>
        </S.TodoControlBtns>
      )}

      {/* 수정모드 */}
      {isEditMode && (
        <S.TodoControlBtns>
          <button
            type="button"
            onClick={() => {
              editRequest(editText);
              setIsEditMode((prev) => !prev);
            }}
          >
            제출
          </button>
          <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
            취소
          </button>
        </S.TodoControlBtns>
      )}
    </S.TodoList>
  );
});

export default TodoItem;
