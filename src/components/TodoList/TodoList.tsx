import React from "react";
import { useTodos } from "../../hooks/useTodos";
import Todo from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  children?: React.ReactNode;
}

const TodoList: React.FC<TodoListProps> = ({ children }) => {
  const { data: todos, isLoading, error } = useTodos();

  return (
    <div>
      {children}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading tasks</p>}
      {todos && todos.length > 0 && (
        <ul>
          {todos.map((todo: Todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
