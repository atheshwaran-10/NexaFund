"use client";
import { useStateContext } from "@/context";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CustomButton, FormField, Loader } from "@/app/(dashboard)/components";

interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  contractAddress: string;
  input: string;
  type: string;
  gas: string;
  gasUsed: string;
  traceId: string;
  isError: string;
  errCode: string;
}

const TransactionList = ({ etherKey }: { etherKey: string }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { address } = useStateContext();

  useEffect(() => {
    fetchRecentTransactions("address" || null);
  }, [address]);

  async function fetchRecentTransactions(address: string | null) {
    if (!address) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${etherKey}`,
      );
      const data = await response.json();

      if (data.status === "1") {
        const transactions = data.result;
        setTransactions(transactions);
        setLoading(false);
      } else {
        console.error("Error retrieving transactions:", data.message);
      }
    } catch (error) {
      console.error("Error retrieving transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" p-4 text-white">
      {loading && <Loader />}
      <h1 className="mb-4 text-2xl font-bold">Recent Transactions</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.blockNumber}
            className="rounded-lg border border-gray-700  p-4"
          >
            <div className="mb-2 text-gray-300">
              From: {transaction.from.substring(0, 15) + "..."}
            </div>
            <div className="mb-2 text-gray-300">
              To: {transaction.to.substring(0, 15) + "..."}
            </div>
            <div className="mb-2 text-gray-300">
              Value: {ethers.utils.formatEther(transaction.value)} ETH
            </div>
            <div className="mb-2 text-gray-300">
              Block Number: {transaction.blockNumber}
            </div>
          </div>
        ))}
      </div>
      {transactions.length === 0 && (
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center">
            No Transactions Found
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
