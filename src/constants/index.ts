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
    name: "payment",
    imgUrl: payment,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];