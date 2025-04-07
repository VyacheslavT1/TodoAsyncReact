import React, { useState } from "react";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import { useLazySVG } from "../../hooks/useLazySVG";
import Checkbox from "../Checkbox/Checkbox";
import TextArea from "../TextArea/TextArea";
import Todo from "../../types/types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleEditClick = () => setIsEditing(true);
  const handleDeleteTodo = () => deleteTodo.mutate(todo._id);

  const EditIcon = useLazySVG("assets/icons/pen.svg?react");
  const TrashIcon = useLazySVG("assets/icons/trash-1.svg?react");
  const SaveChangesIcon = useLazySVG("assets/icons/check.svg?react");

  const handleSaveChanges = () => {
    updateTodo.mutate({
      id: todo._id,
      title: newTitle,
      completed: isCompleted,
    });
    setIsEditing(false);
  };

  return (
    <li
      className={`taskItem group relative flex items-center min-h-[3rem] m-4 border border-[#ccc] rounded-lg shadow-[0px_15px_10px_-5px_#ccc] text-left transition duration-300
        ${isEditing ? "bg-[#fafafa]" : "hover:bg-[#efefef]"}
      `}
      key={todo._id}
    >
      <Checkbox
        checked={todo.completed}
        onCheck={(checked: boolean) => {
          setIsCompleted(checked);
          updateTodo.mutate({
            id: todo._id,
            title: todo.title,
            completed: checked,
          });
        }}
        disabled={isEditing}
      />
      <div
        className={`taskContent
           flex-grow max-w-full my-4 px-4  
           border border-l-[#ccc] border-t-0 border-r-0 border-b-0 
           text-justify break-words
          ${isCompleted ? "line-through" : ""} 
        `}
      >
        {isEditing ? (
          <TextArea
            className="edit 
            flex w-full h-full border-0 font-inherit 
             text-justify resize-none outline-none"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSaveChanges}
            autoFocus
            autoResize
            rows={1}
            cols={30}
          />
        ) : (
          newTitle || todo.title
        )}
      </div>
      <div
        className={`iconContainer flex w-16 gap-4 pr-4 flex-shrink-0 justify-end  ${
          isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {isEditing ? (
          // Режим редактирования: показываем только иконку сохранения
          SaveChangesIcon && (
            <span
              onClick={handleSaveChanges}
              className="saveIcon cursor-pointer hover:text-[#00ae1c]"
            >
              <SaveChangesIcon />
            </span>
          )
        ) : (
          <>
            {!isCompleted && EditIcon && (
              <span
                onClick={handleEditClick}
                className="editIcon cursor-pointer hover:text-[#FF5620]"
              >
                <EditIcon />
              </span>
            )}
            {TrashIcon && (
              <span
                onClick={handleDeleteTodo}
                className="trashIcon cursor-pointer hover:text-[#FF5620]"
              >
                <TrashIcon />
              </span>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
