import React from "react";

import { tagType, thirdweb,placeholder } from "~/public/assets";
import { daysLeft, getDaysRemaining } from "@/utils";
import Image from "next/image";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}: {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  handleClick: () => void;
}) => {
  const remainingDays = getDaysRemaining(deadline);

  return (
    <div
      className="w-full cursor-pointer rounded-[15px] bg-[#1c1c24] sm:w-[288px] "
      onClick={handleClick}
    >
      <Image
        src={image}
        alt="fund"
        height={820}
        width={820}
        className=" rounded-[15px] object-cover"
      />

      <div className="flex flex-col p-4">
        <div className="mb-[18px] flex flex-row items-center">
          <Image
            src={tagType}
            height={12}
            width={12}
            alt="tag"
            className="h-[17px] w-[17px] object-contain"
          />
          <p className="font-epilogue ml-[12px] mt-[2px] text-[12px] font-medium text-[#808191]">
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue truncate text-left text-[16px] font-semibold leading-[26px] text-white">
            {title}
          </h3>
          <p className="font-epilogue mt-[5px] truncate text-left font-normal leading-[18px] text-[#808191]">
            {description}
          </p>
        </div>

        <div className="mt-[15px] flex flex-wrap justify-between gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-[#b2b3bd]">
              {amountCollected}
            </h4>
            <p className="font-epilogue mt-[3px] truncate text-[12px] font-normal leading-[18px] text-[#808191] sm:max-w-[120px]">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-[#b2b3bd]">
              {remainingDays}
            </h4>
            <p className="font-epilogue mt-[3px] truncate text-[12px] font-normal leading-[18px] text-[#808191] sm:max-w-[120px]">
              Days Left
            </p>
          </div>
        </div>

        <div className="mt-[20px] flex items-center gap-[12px]">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#13131a]">
            <Image
              src={placeholder}
              width={52}
              height={52}
              alt="user"
              className=""
            />
          </div>
          <p className="font-epilogue flex-1 truncate text-[12px] font-normal text-[#808191]">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
