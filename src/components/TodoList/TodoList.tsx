import React, { useEffect } from "react";
import { useTodos } from "../../hooks/useTodos";
import Todo from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  children?: React.ReactNode;
}

const TodoList: React.FC<TodoListProps> = ({ children }) => {
  const { data: todos, isLoading, error } = useTodos();

  // Временно
  useEffect(() => {
    if (!isLoading) {
      console.log(todos);
    }
  }, [todos, isLoading]);

  return (
    <div>
      {children}
      {isLoading && <p>Loading...</p>}
      {error && <p>Ошибка загрузки задач</p>}
      {todos && todos.length > 0 && (
        <ul className={styles.taskList}>
          {todos.map((todo: Todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
