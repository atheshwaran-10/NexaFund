import { createCampaign, dashboard, logout, payment, profile, withdraw } from '~/public/assets';

export const navlinks = [
  {
    name: "home",
    imgUrl: dashboard,
    link: "/home",
  },
  {
    name: "create",
    imgUrl: createCampaign,
    link: "/create",
  },
  {
    name: "transactions",
    imgUrl: withdraw,
    link: "/transactions",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
 
];
