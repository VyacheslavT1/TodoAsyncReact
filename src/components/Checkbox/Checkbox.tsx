import React, { useState } from "react";
import { useLazySVG } from "../../hooks/useLazySVG";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheck: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onCheck, ...props }) => {
  const [checked, setChecked] = useState(false);

  const CheckboxIcon = useLazySVG("assets/icons/checkbox-line.svg?react");
  const CheckboxCheckedIcon = useLazySVG(
    "assets/icons/checkbox-fill-green.svg?react"
  );

  const handleCheck = () => {
    setChecked((prev) => !prev);
    onCheck(!checked);
  };

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        className={styles.input}
        role="checkbox"
        aria-checked={checked}
        {...props}
      />
      {CheckboxIcon && CheckboxCheckedIcon && (
        <span role="img" aria-label="Checkbox icon">
          {checked ? <CheckboxCheckedIcon /> : <CheckboxIcon />}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
