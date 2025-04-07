import React from "react";

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
  const taskInputStyles = `
  w-full min-h-[3rem] pt-0 pr-[7rem] pb-0 pl-[2rem]
  rounded-tl-[0.5rem] rounded-tr-[0.5rem] 
  rounded-bl-0 rounded-br-0 
  border border-0 text-[1.2rem] 
  shadow-[0px_15px_10px_-5px_#ccc] outline-none`.trim();

  return (
    <div>
      <input
        className={taskInputStyles}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
