import Provider from "@/redux/Provider";
import { Nunito_Sans } from "next/font/google";

import "../globals.css";

import { cn } from "@/lib/utils";
import RequireAuth from "@/components/RequireAuth";
import Setup from "@/components/utils/Setup";
import SideNav from "@/components/dashboard/Sidenav";
import Topnav from "@/components/dashboard/Topnav";
import SubscriptionDialog from "@/components/dashboard/SubscriptionDialog";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={cn(nunitoSans.className)}>
        <Provider>
          <div className="bg-white">
            <RequireAuth>
              <div className="flex">
                <SideNav />
                <div className="w-full flex flex-col">
                  <Topnav />
                  {children}
                </div>
              </div>
              <SubscriptionDialog />
            </RequireAuth>
            <Setup />
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
