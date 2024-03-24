"use client";
import React, { useState } from "react";

import { logo, sun } from "~/public/assets";
import { navlinks } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Icon = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  handleClick,
}: {
  styles: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick: () => void;
}) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] ${isActive && isActive === name && "bg-[#2c2f32]"} flex items-center justify-center ${!disabled && "cursor-pointer"} ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <Image src={imgUrl} alt="fund_logo" className="h-1/2 w-1/2" />
    ) : (
      <Image
        src={imgUrl}
        alt="fund_logo"
        className={`h-1/2 w-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("home");

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      <Link href="/">
        <Image
          alt="logo"
          className="h-[52px] w-[52px] rounded-md bg-[#2c2f32]"
          src={logo}
          onClick={() => router.push("/")}
        />
      </Link>

      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center gap-8">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              styles="cursor-pointer"
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) 
                {
                  setIsActive(link.name);
                  router.push(`${link.link}`);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
