import React from "react";
import { useLazySVG } from "../../hooks/useLazySVG";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  ...props
}) => {
  const PlusIcon = useLazySVG("assets/icons/plus.svg?react");
  const TrashIcon = useLazySVG("assets/icons/trash-1.svg?react");

  return (
    <button
      className={`${styles.button} ${styles[variant]} `}
      onClick={onClick}
      {...props}
    >
      {variant === "primary" && PlusIcon && (
        <span className={styles.plusIcon}>
          <PlusIcon />
        </span>
      )}
      {variant === "secondary" && TrashIcon && (
        <span className={styles.trashIcon}>
          <TrashIcon />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
