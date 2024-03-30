"use client";
import React from "react";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "~/public/assets";
import type { Campaign } from "@/context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useStore from "@/store/searchStore";

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[] | null;
}) => {
  const router = useRouter();
  const { value } = useStore();

  const filteredCampaigns = campaigns
    ? campaigns.filter((campaign) =>
        campaign.title.toLowerCase().startsWith(value.toLowerCase()),
      )
    : null;

  const handleNavigate = (campaign: Campaign) => {
    router.push(`/home/${campaign.pId}`);
  };

  return (
    <div>
      <h1 className="font-epilogue text-left text-[18px] font-semibold text-white">
        {title} ({campaigns ? campaigns.length : 0})
      </h1>

      <div className="mt-[20px] flex flex-wrap gap-[26px]">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={loader}
              alt="loader"
              className="h-[100px] w-[100px] object-contain"
            />
          </div>
        )}
        {!isLoading && filteredCampaigns?.length === 0 && (
          <p className="font-epilogue text-[14px] font-semibold leading-[30px] text-[#818183]">
            No Campaigns Found
          </p>
        )}
        {!isLoading &&
          filteredCampaigns &&
          filteredCampaigns?.length > 0 &&
          filteredCampaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
