"use client";

import React from "react";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import { StateContextProvider } from "@/context";

export default function ThirdWebContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      clientId="c306ff8b0b706fa6b781fa53b6325298"
      activeChain="mumbai"
    >
      <StateContextProvider>
        <Toaster/>
       {children}
       </StateContextProvider>
    </ThirdwebProvider>
  );
}


