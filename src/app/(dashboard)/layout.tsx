
import {NavBar,SideBar} from "./components"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <SideBar />
      </div>
      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
         <NavBar />
        {children}
      </div>
    </div>
  );
}
