import React from "react";

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
  disabled,
}: {
  btnType: "submit" | "reset" | "button" | undefined;
  title: string;
  handleClick: () => void;
  styles: string;
  disabled?:boolean
}) => {
  return (
    <button
     disabled={disabled? disabled :false}
      type={btnType}
      className={`font-epilogue min-h-[52px] rounded-[10px] px-4 text-[16px] font-semibold leading-[26px] text-white ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
