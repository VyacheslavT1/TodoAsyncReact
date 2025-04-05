import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";
import Todo from "../types/types";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean },
    Error,
    { id: number; title: string; completed: boolean },
    { previousTodos: Todo[] }
  >({
    mutationFn: (updatedTodo: {
      id: number;
      title: string;
      completed: boolean;
    }) => updateTodo(updatedTodo),
    onMutate: async (updatedTodo: {
      id: number;
      title: string;
      completed: boolean;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) ?? [];
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old
          ? old.map((todo) =>
              todo._id === updatedTodo.id
                ? {
                    ...todo,
                    title: updatedTodo.title,
                    completed: updatedTodo.completed,
                  }
                : todo
            )
          : []
      );
      return { previousTodos };
    },
    onError: (_err, _id, context: any) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
