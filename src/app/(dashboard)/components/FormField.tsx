import React, { ChangeEvent } from "react";

interface FormFieldProps {
  labelName?: string;
  placeholder: string;
  inputType: string;
  isTextArea?: boolean;
  value: string;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  labelName,
  placeholder,
  inputType,
  isTextArea = false,
  value,
  handleChange,
}) => {
  return (
    <label className="flex w-full flex-1 flex-col">
      {labelName && (
        <span className="font-epilogue mb-[10px] text-[14px] font-medium leading-[22px] text-[#808191]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="font-epilogue rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent px-[15px] py-[15px] text-[14px] text-white outline-none placeholder:text-[#4b5264] sm:min-w-[300px] sm:px-[25px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="font-epilogue rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent px-[15px] py-[15px] text-[14px] text-white outline-none placeholder:text-[#4b5264] sm:min-w-[300px] sm:px-[25px]"
        />
      )}
    </label>
  );
};

export default FormField;
