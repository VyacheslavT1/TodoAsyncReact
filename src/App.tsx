import React, { useState } from "react";
import InputField from "./components/InputTask/InputField";
import Button from "./components/Button/Button";
import { useCreateTodo } from "./hooks/useCreateTodo";
import { useDeleteTodo } from "./hooks/useDeleteTodo";
import TodoList from "./components/TodoList/TodoList";
import { useQueryClient } from "@tanstack/react-query";
import Todo from "./types/types";

export default function App() {
  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      setErrorMessage("A task can't be empty ");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    } else {
      createTodoMutation.mutate({ title: inputValue });
      setInputValue("");
    }
  };

  const handleDeleteAllTodos = () => {
    const todos = queryClient.getQueryData<Todo[]>(["todos"]);
    if (todos) {
      todos.forEach((todo) => {
        deleteTodoMutation.mutate(todo._id);
      });
    }
  };

  return (
    <div className="w-[768px] my-8 mx-auto text-center">
      <div className="pb-4 rounded-lg shadow-[0_0_5px_5px_#ccc] ">
        <div className="relative">
          <InputField
            id="todo-input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type here to add a task..."
          />
          <Button onClick={handleAddTodo} variant="primary">
            Add
          </Button>
        </div>
        <TodoList>
          {errorMessage && (
            <p className="mt-4 text-[#FF5620]">{errorMessage}</p>
          )}
        </TodoList>
      </div>
      <Button onClick={handleDeleteAllTodos} variant="secondary">
        Clear all
      </Button>
    </div>
  );
}
