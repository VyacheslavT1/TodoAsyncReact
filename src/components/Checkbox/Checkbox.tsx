import React from "react";
import { useLazySVG } from "../../hooks/useLazySVG";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheck: (checked: boolean) => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheck, ...props }) => {
  const CheckboxIcon = useLazySVG("assets/icons/checkbox-line.svg?react");
  const CheckboxCheckedIcon = useLazySVG(
    "assets/icons/checkbox-fill-green.svg?react"
  );

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(e.target.checked);
  };

  const checkboxContainerStyles =
    `relative inline-flex justify-center items-center 
    flex-shrink-0 w-[2.75rem] h-[2.75rem]`.trim();

  const inputCheckboxStyles = "appearance-none relative z-[2] ";

  return (
    <label
      className={`${checkboxContainerStyles} ${
        props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        className={inputCheckboxStyles}
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
