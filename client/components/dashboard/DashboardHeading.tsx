import React from "react";

interface DashboardHeadingProps {
  children: React.ReactNode;
}

const DashboardHeading = ({ children }: DashboardHeadingProps) => {
  return <h2 className="text-3xl font-bold mb-6">{children}</h2>;
};

export default DashboardHeading;
