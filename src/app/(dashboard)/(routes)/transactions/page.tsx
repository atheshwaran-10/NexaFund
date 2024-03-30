"use client";
import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "@/app/(dashboard)/components";
import { useStateContext, Campaign } from "@/context";

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[] | null>([]);

  const { address, contract, getUserCampaigns, getDonationsByUser } =
    useStateContext();

  const fetchCampaigns = async () => {
    console.log("fetchingg");
    setIsLoading(true);
    const data = await getDonationsByUser();
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  console.log(campaigns);

  return <h2>Hello</h2>;
};

export default Transactions;
