const API_URL = "http://localhost:3000";

export const fetchTodos = async () => {
  const response = await fetch(`${API_URL}/db-todos/v1/todos`);

  if (!response.ok) {
    throw new Error("Can't load tasks");
  }
  return response.json();
};

export const createTodo = async (newTodo: {
  title: string;
}): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_URL}/db-todos/v1/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Can't create task");
  }
  return response.json();
};

export const updateTodo = async (todo: {
  id: number;
  title: string;
  completed: boolean;
}): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_URL}/db-todos/v1/todos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Can't modify task");
  }
  return response.json();
};

export const deleteTodo = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_URL}/db-todos/v1/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Can't delete task");
  }
  return response.json();
};
