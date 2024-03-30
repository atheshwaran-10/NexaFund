"use client"
import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "@/app/(dashboard)/components";
import { useStateContext,Campaign } from "@/context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]|null>([]);

  const { address, contract,getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    console.log("fetchingg");
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  console.log(campaigns)

  return (
    <DisplayCampaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
