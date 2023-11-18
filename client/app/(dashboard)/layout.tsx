import RequireAuth from "@/components/RequireAuth";
import Provider from "@/redux/Provider";
import { cn } from "@/lib/utils";
import { Nunito_Sans } from "next/font/google";
import Setup from "@/components/utils/Setup";
import "../globals.css";
import SideNav from "@/components/dashboard/Sidenav";
import Topnav from "@/components/dashboard/Topnav";

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
                <div className="w-full">
                  <Topnav />
                  {children}
                </div>
              </div>
            </RequireAuth>
            <Setup />
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
