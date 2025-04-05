import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/todos";
import Todo from "../types/types";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean },
    Error,
    number,
    { previousTodos: Todo[] }
  >({
    mutationFn: (id: number) => deleteTodo(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) ?? [];
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old ? old.filter((todo) => todo._id !== id) : []
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
