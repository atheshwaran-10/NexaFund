import React from "react";
import Navbar from "./_components/NavBar";
import Hero from "./_components/Hero";
import Wallets from "./_components/Wallets";

const page = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#13131a] text-white">
      <Navbar />
      <Hero />
      <div className="absolute bottom-0 w-full">
        <Wallets />
      </div>
    </div>
  );
};

export default page;
