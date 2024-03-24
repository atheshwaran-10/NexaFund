"use client";
import React from "react";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { useStateContext } from "@/context";
import Image from "next/image";
// const App = () => {
//   return (
//     <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
//       <div className="sm:flex hidden mr-10 relative">
//         <Sidebar />
//       </div>
//       <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/create-campaign" element={<CreateCampaign />} />
//           <Route path="/campaign-details/:id" element={<CampaignDetails />} />
//         </Routes>
//       </div>
//     </div>
//   )
// }

function App() {
  return <Component />;
}

function Component() {
  const { contract } = useStateContext();
  const { data, isLoading } = useContractRead(contract, "getCampaigns");
  console.log("MY CONTRACT", contract);
  console.log("MY DATA", data);

  return isLoading ? (
    <h2>Loading....</h2>
  ) : (
    <div>
      {data.map((item, index) => (
        <div key={index} className="campaign-card">
          <h3>{item.title}</h3>
          <Image src={item.image} alt={item.title} className="campaign-image" />
          <p>Description: {item.description}</p>
          <p>Owner: {item.owner}</p>
          <p>Target: {item.target.toString()} ETH</p>
          <p>Amount Collected: {item.amountCollected.toString()} ETH</p>
          <p>
            Deadline:{" "}
            {new Date(item.deadline.toNumber() * 1000).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
export default App;
