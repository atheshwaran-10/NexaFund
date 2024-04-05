"use client";
import React, { useState } from "react";
import { useStateContext } from "@/context";
import { navlinks } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useStore from "@/store/searchStore";
import { CustomButton } from "../(dashboard)/components";

const Navbar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const { value, setValue } = useStore();

  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  };

  return (
    <div className="mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row">
      <div className="flex flex-row gap-x-2 md:justify-normal justify-between">
        <Image src={"/logo.png"} height={60} width={60} alt="" className="m-4" />
        <p className="text-white text-xl font-semibold flex items-center p-2 ">
          Nexa Fund
        </p>
      </div>
      <div className="hidden flex-row justify-end p-4 sm:flex">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1dc071] p-0 h-10 " : "bg-[#8c6dfd] p-0 h-10 "}
          handleClick={() => {
            if (address) router.push("create");
            else connect();
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
