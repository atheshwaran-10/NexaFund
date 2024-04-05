"use client";

import React from "react";
import {
  authereum,
  bitski,
  core,
  formatic,
  metamask,
  torus,
  walletconnect,
} from "~/public/wallets";
import { InfiniteMovingCards } from "./infinite-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="flex overflow-hidden items-end justify-center">
      <div className="relative mt-12 flex items-center justify-center overflow-hidden rounded-md">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    image: authereum,
    name: "Authereum",
  },
  {
    image: bitski,
    name: "Bitski",
  },
  {
    image: core,
    name: "Core",
  },
  {
    image: formatic,
    name: "Formatic",
  },
  {
    image: metamask,
    name: "MetaMask",
  },
  {
    image: torus,
    name: "Torus",
  },
  {
    image: walletconnect,
    name: "WalletConnect",
  },
];
