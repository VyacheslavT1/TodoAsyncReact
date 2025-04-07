import React, { useRef, useEffect } from "react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  rows: number;
  cols: number;
  autoResize: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  rows,
  cols,
  autoResize = true,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (autoResize) {
      handleInput();
    }
  }, [autoResize, value]);

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={value}
        rows={rows}
        cols={cols}
        onInput={handleInput}
        {...props}
      />
    </div>
  );
};
export default TextArea;
