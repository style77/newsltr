import RequireAuth from "@/components/RequireAuth";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <RequireAuth>{children}</RequireAuth>;
};

export default Layout;
