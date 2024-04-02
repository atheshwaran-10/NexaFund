"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import pic1 from "~/public/3386851.jpg";

import pic2 from "~/public/5172658.jpg";
import pic3 from "~/public/5172660.jpg";
import { useStateContext } from "@/context";
import { money } from "~/public/assets";
import { CustomButton, FormField, Loader } from "@/app/(dashboard)/components";
import { checkIfImage } from "@/utils";
import Image from "next/image";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";

interface FormState {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
}

const CreateCampaign: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState("/3386851.jpg");
  const { createCampaign, address } = useStateContext();
  const [form, setForm] = useState<FormState>({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
  });

  const handleFormFieldChange = (
    fieldName: keyof FormState,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast.error("Connect Your Wallet");
      return;
    }

    checkIfImage(image, async (exists: boolean) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          image,
          ...form,
          //@ts-ignore
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        router.push("/home");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form });
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center rounded-[10px] bg-[#1c1c24] p-4 sm:p-10">
      {isLoading && <Loader />}
      <div className="flex items-center justify-center rounded-[10px] bg-[#3a3a43] p-[16px] sm:min-w-[380px]">
        <h1 className="font-epilogue text-[18px] font-bold leading-[38px] text-white sm:text-[25px]">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-[65px] flex w-full flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
          inputType={"text"}
        />

        <div className="flex h-[120px] w-full items-center justify-start rounded-[10px] bg-[#8c6dfd] p-4">
          <Image
            src={money}
            alt="money"
            className="h-[40px] w-[40px] object-contain"
          />
          <h4 className="font-epilogue ml-[20px] text-[25px] font-bold text-white">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex w-full flex-row justify-around gap-x-4">
          <Image
            src={pic1}
            height={350}
            width={350}
            alt="money"
            className={cn(
              "cursor-pointer rounded-md object-cover",
              image === "/3386851.jpg" ? "border-[3px] border-slate-400" : "",
            )}
            onClick={() => setImage("/3386851.jpg")}
          />
          <Image
            src={pic2}
            height={350}
            width={350}
            alt="money"
            className={cn(
              "cursor-pointer rounded-md object-cover",
              image === "/5172658.jpg" ? "border-[3px] border-slate-400" : "",
            )}
            onClick={() => setImage("/5172658.jpg")}
          />
          <Image
            src={pic3}
            height={350}
            width={350}
            alt="money"
            className={cn(
              "cursor-pointer rounded-md object-cover",
              image === "/5172660.jpg" ? "border-[3px] border-slate-400" : "",
            )}
            onClick={() => setImage("/5172660.jpg")}
          />
        </div>

        {/* <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          isDisabled
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        /> */}

        <div className="mt-[40px] flex items-center justify-center">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
            handleClick={() => handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
