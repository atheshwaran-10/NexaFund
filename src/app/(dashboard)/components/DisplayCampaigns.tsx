import React from 'react';
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '~/public/assets';
import type { Campaign } from "@/context";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

  console.log(campaigns)
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
          <Image
            src={loader}
            alt="loader"
            className="h-[100px] w-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue text-[14px] font-semibold leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
        {!isLoading &&
          campaigns &&
          campaigns?.length > 0 &&
          campaigns.map((campaign) => (
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

export default DisplayCampaigns