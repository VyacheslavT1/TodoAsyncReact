import React, { useState } from "react";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import { useLazySVG } from "../../hooks/useLazySVG";
import Checkbox from "../Checkbox/Checkbox";
import Todo from "../../types/types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isCompleted, setIsCompeted] = useState(todo.completed);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteTodo = () => {
    deleteTodo.mutate(todo._id);
  };

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
      className={`${styles.taskItem} ${isEditing ? styles.editing : ""}`}
      key={todo._id}
    >
      <Checkbox
        onCheck={(checked: boolean) => {
          setIsCompeted(checked);
          updateTodo.mutate({
            id: todo._id,
            title: todo.title,
            completed: checked,
          });
        }}
      />
      <div
        className={`${styles.taskContent} ${isCompleted ? styles.checked : ""}`}
      >
        {isEditing ? (
          <input
            className={styles.edit}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSaveChanges}
            autoFocus
          />
        ) : (
          newTitle || todo.title
        )}
      </div>

      <div className={styles.iconContainer}>
        {!isCompleted && (
          <>
            {EditIcon && (
              <span onClick={handleEditClick} className={styles.editIcon}>
                <EditIcon />
              </span>
            )}
            {SaveChangesIcon && (
              <span onClick={handleSaveChanges} className={styles.saveIcon}>
                <SaveChangesIcon />
              </span>
            )}
          </>
        )}
        {TrashIcon && (
          <span onClick={handleDeleteTodo} className={styles.trashIcon}>
            <TrashIcon />
          </span>
        )}
      </div>
    </li>
  );
};
export default TodoItem;
