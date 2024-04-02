//@ts-nocheck
"use client";
import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext<ContextType | undefined>(undefined);

export type ContextType = {
  address: string | undefined;
  contract: any | undefined;
  connect: () => void;
  createCampaign: (form: CampaignForm) => Promise<void>;
  getCampaigns: () => Promise<Campaign[] | null>;
  getUserCampaigns: () => Promise<Campaign[] | null>;
  donate: (pId: number, amount: string) => Promise<void | null>;
  getDonations: (pId: number) => Promise<Donation[] | null>;
  getCampaignById: (pId: number) => Promise<Campaign | null>;
  getDonationsByUser: () => Promise<Campaign[] | null>;
};

export type Campaign = {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
  donators?: string[];
  donations?: string[];
};

export type Donation = {
  donator: string;
  donation: string;
};

type CampaignForm = {
  title: string;
  description: string;
  target: string;
  deadline: Date;
  image: string;
};

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contract } = useContract(
    "0x15405736F8a76793a8275902b07a11114b9CE641",
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign",
  );

  const address = useAddress();
  const connect = useMetamask();

  if (address === "undefined") {
    connect();
  }

  const publishCampaign = async (form: CampaignForm) => {
    const deadlineTimestamp = new Date(form.deadline).getTime() / 1000;

    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          deadlineTimestamp,
          form.image,
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async (): Promise<Campaign[] | null> => {
    if (contract) {
      const campaigns = await contract.call("getCampaigns");
      const parsedCampaings = campaigns.map((campaign: any, i: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString(),
        ),
        image: campaign.image,
        pId: i,
      }));
      return parsedCampaings;
    } else {
      return null;
    }
  };

  const getUserCampaigns = async (): Promise<Campaign[] | null> => {
    const allCampaigns = await getCampaigns();
    if (allCampaigns) {
      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === address,
      );
      return filteredCampaigns;
    } else {
      return null;
    }
  };

  const donate = async (pId: number, amount: string) => {
    if (contract) {
      await contract.call("donateToCampaign", [pId], {
        value: ethers.utils.parseEther(amount),
      });
    } else {
      return null;
    }
  };

  const getCampaignById = async (pId: number): Promise<Campaign | null> => {
    if (contract) {
      const campaign = await contract.call("campaigns", [pId]);

      if (!campaign) {
        return null;
      }

      const parsedCampaign: Campaign = {
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString(),
        ),
        image: campaign.image,
        pId: pId,
      };

      return parsedCampaign;
    } else {
      return null;
    }
  };

  const getDonations = async (pId: number): Promise<Donation[] | null> => {
    if (contract) {
      const donations = await contract.call("getDonators", [pId]);
      const parsedDonations: Donation[] = donations[0].map(
        (donator: string, i: number) => ({
          donator,
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        }),
      );
      return parsedDonations;
    } else {
      return null;
    }
  };

  const getUserDonationsFromCampaigns = (
    campaigns: Campaign[],
    userAddress: string,
  ): Campaign[] | null => {
    //@ts-ignore
    return campaigns.map((campaign) => {
      const userDonations: string[] = [];
      if (campaign.donators && campaign.donations) {
        campaign.donators.forEach((donator, index) => {
          if (donator.toLowerCase() === userAddress.toLowerCase()) {
            //@ts-ignore
            userDonations.push(campaign.donations[index]);
          }
        });

        return {
          ...campaign,
          donations: userDonations,
        };
      } else {
        return null;
      }
    });
  };

  const getDonationsByUser = async (): Promise<Campaign[] | null> => {
    if (contract) {
      const allCampaigns = await getCampaigns();
      if (allCampaigns && address) {
        const userDonations = getUserDonationsFromCampaigns(
          allCampaigns,
          address,
        );

        console.log(userDonations, 1);
        if (userDonations) return userDonations;
        else return null;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        //@ts-ignore
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getCampaignById,
        getDonations,
        getDonationsByUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): ContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider",
    );
  }
  return context;
};
