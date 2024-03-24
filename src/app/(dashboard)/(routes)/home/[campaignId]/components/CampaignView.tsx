"use client";
import React, { useState } from "react";
import { Donation, useStateContext, Campaign } from "@/context";
import { CountBox, CustomButton, Loader } from "@/app/(dashboard)/components";
import { calculateBarPercentage, daysLeft } from "@/utils";
import { thirdweb } from "~/public/assets";
import Image from "next/image";
import toast from "react-hot-toast";

interface CampaignDetailsProps {
  campaign: Campaign;
  donators: Donation[] | null;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  campaign,
  donators,
}) => {
  const { donate } = useStateContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [amount, setAmount] = useState<string>("0");
  console.log("INCO");
  console.log(campaign);
  console.log(donators);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      await donate(campaign?.pId || 0, amount);
      setIsLoading(false);
      toast.success("Fund Success");
    } catch (e) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const remainingDays = daysLeft(Number(campaign?.deadline?.toString() || 0));

  return (
    <div>
      <div className="mt-10 flex w-full flex-col gap-[30px] md:flex-row">
        <div className="flex-1 flex-col">
          <Image
            src={campaign.image}
            alt="campaign"
            width={24}
            height={24}
            className="h-[410px] w-full rounded-xl object-cover"
          />
          <div className="relative mt-2 h-[5px] w-full bg-[#3a3a43]">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(campaign.target, campaign.amountCollected)}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex w-full flex-wrap justify-between gap-[30px] md:w-[150px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${campaign.target}`}
            value={campaign.amountCollected.toString()}
          />
          <CountBox
            title="Total Backers"
            value={donators?.length.toString() || "0"}
          />
        </div>
      </div>

      <div className="mt-[60px] flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-[2] flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row flex-wrap items-center gap-[14px]">
              <div className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#2c2f32]">
                <Image
                  src={thirdweb}
                  width={24}
                  height={24}
                  alt="user"
                  className="h-[60%] w-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue break-all text-[14px] font-semibold text-white">
                  {campaign.owner}
                </h4>
                <p className="font-epilogue mt-[4px] text-[12px] font-normal text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue text-justify text-[16px] font-normal leading-[26px] text-[#808191]">
                {campaign.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators && donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <p className="font-epilogue break-ll text-[16px] font-normal leading-[26px] text-[#b2b3bd]">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue break-ll text-[16px] font-normal leading-[26px] text-[#808191]">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue text-justify text-[16px] font-normal leading-[26px] text-[#808191]">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col rounded-[10px] bg-[#1c1c24] p-4">
            <p className="font-epilogue fount-medium text-center text-[20px] leading-[30px] text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="font-epilogue w-full rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent px-[15px] py-[10px] text-[18px] leading-[30px] text-white outline-none placeholder:text-[#4b5264] sm:px-[20px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] rounded-[10px] bg-[#13131a] p-4">
                <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="font-epilogue mt-[20px] font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                disabled={amount === "0"}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
