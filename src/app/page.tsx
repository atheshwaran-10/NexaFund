import React from "react";
import Navbar from "./_components/NavBar";
import Hero from "./_components/Hero";
import Wallets from "./_components/Wallets";

const page = () => {
  return (
    <div className="h-[50rem] w-full  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] ">
      <div className="relative min-h-screen overflow-hidden  text-white">
      
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      <Navbar />
      <Hero />
      <div className="absolute bottom-0 w-full">
        <Wallets />
      </div>
      </div>
    </div>
  );
};

export default page;
