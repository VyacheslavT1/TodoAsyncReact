import React from "react";
import styles from "./InputField.module.css";

export interface InputFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <input
        className={styles.taskInput}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
