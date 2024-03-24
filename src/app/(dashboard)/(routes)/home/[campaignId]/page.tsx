"use client";
import React, { useState, useEffect } from "react"

import { useStateContext, Donation,Campaign } from "@/context";
import { Loader } from "@/app/(dashboard)/components";
import CampaignDetails from "./components/CampaignView";



interface campaignProps {
  params: {
    campaignId: number;
  };
}

const campaign: React.FC<campaignProps> = ({ params }) => {
  const { getDonations, contract, address, getCampaignById } =
    useStateContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, setState] = useState<Campaign | null>(null);
  const [donators, setDonators] = useState<Donation[] | null>([]);

  const fetchDonators = async () => {
    const data = await getDonations(state?.pId || 0);
    setDonators(data);
  };

  const fetchData = async () => {
    try {
      const campaign = await getCampaignById(params.campaignId);
      setState(campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      setState(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchData();
      fetchDonators();
    }
  }, [contract, address]);

  console.log(state);

  if (isLoading) {
    return <Loader />;
  }

  if (!state) {
    return <div>Campaign Not Found</div>;
  }

  return (
    <div>
      <CampaignDetails campaign={state} donators={donators} />
    </div>
  );
};

export default campaign;
