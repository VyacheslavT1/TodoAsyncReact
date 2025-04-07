import React from "react";
import { useLazySVG } from "../../hooks/useLazySVG";

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

  const baseClasses = `
  inline-flex items-center
  py-[0.6rem] px-[1.2rem]
  rounded-lg focus:outline-none
  cursor-pointer transition duration-300
`.trim();

  const primaryClasses = `
  absolute top-1/2 right-4
  w-[5rem] h-[2rem]
  bg-[#00ae1c] text-[#fafafa]
  -translate-y-1/2
  hover:bg-[#00c600]
  active:bg-[#039c03] active:border active:border-[#00c600]
`.trim();

  const secondaryClasses = `
  relative justify-center
  w-[20rem] h-[2.5rem]
  mt-8 gap-4
  border border-[#ccc]
  hover:bg-[#efefef]
  group
`.trim();

  return (
    <button
      className={`${baseClasses} ${
        variant === "primary" ? primaryClasses : secondaryClasses
      }`}
      onClick={onClick}
      {...props}
    >
      {variant === "primary" && PlusIcon && (
        <span className="flex items-center">
          <PlusIcon />
        </span>
      )}
      {variant === "secondary" && TrashIcon && (
        <span
          className="flex items-center text-[#323749] 
        group-hover:text-[#FF5620] transition duration-300"
        >
          <TrashIcon />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
