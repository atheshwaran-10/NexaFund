"use client";
import React from "react";
import { useStateContext } from "@/context";
import CustomButton from "../(dashboard)/components/CustomButton";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const { connect, address } = useStateContext();
  return (
    <div className="flex items-center justify-center">
      <div>
        <h2 className="mt-12 text-center text-2xl font-bold md:text-6xl">
          Decentralized Crowd Funding
        </h2>
        <p className="mt-2 text-center text-lg font-semibold text-[#2CBC7B]">
          Join the revolution in decentralized funding with our Ethereum-based
          application
        </p>
        <div className="mt-6 flex flex-row justify-center gap-x-5 p-4 ">
          <button
            type="button"
            title={"Enter Nexa Fund"}
            className={
              "font-epilogue h-10 min-h-[52px]  rounded-[10px] bg-[#8c6dfd] p-0 px-4 text-[16px] font-semibold leading-[26px] text-white"
            }
            onClick={() => {
              router.push("/home");
            }}
          >
            Enter Nexa Fund
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
