import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";
import Todo from "../types/types";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean }, // TData: ответ от сервера (например, { success: boolean })
    Error, // TError: тип ошибки
    { title: string }, // TVariables: объект с данными новой задачи
    { previousTodos: Todo[] } // TContext: объект для хранения предыдущего состояния
  >({
    mutationFn: (newTodo: { title: string }) => createTodo(newTodo),
    onMutate: async (newTodo: { title: string }) => {
      // Отменяем все запросы, связанные с "todos"
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Сохраняем текущее состояние списка задач
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) ?? [];

      // Оптимистично добавляем новую задачу в кэш.
      // Здесь создаётся временный id (например, с помощью Date.now())
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old
          ? [
              ...old,
              { _id: Date.now(), title: newTodo.title, completed: false },
            ]
          : [{ _id: Date.now(), title: newTodo.title, completed: false }]
      );

      // Возвращаем контекст для возможного отката изменений
      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      // Откатываем кэш к предыдущему состоянию в случае ошибки
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      // Инвалидируем запрос "todos", чтобы получить актуальные данные с сервера
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
