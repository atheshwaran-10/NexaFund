"use client";
import React from "react";
import { useStateContext } from "@/context";

async function fetchRecentTransactions(address: string) {
  try {
   const response = await fetch(
     `https://cors-anywhere.herokuapp.com/https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=F9XUBTV3KFNC46TTBTCRXX3CT6KMENVJ3Q`,
   );

    const data = await response.json();

    if (data.status === "1") {
      const transactions = data.result;
      console.log(transactions);
      // Process the transactions as needed
    } else {
      console.error("Error retrieving transactions:", data.message);
    }
  } catch (error) {
    console.error("Error retrieving transactions:", error);
  }
}

// Call the function with your MetaMask wallet address

const page = () => {
  const { address } = useStateContext();
  fetchRecentTransactions(address || "");
  return <div>page</div>;
};

export default page;
