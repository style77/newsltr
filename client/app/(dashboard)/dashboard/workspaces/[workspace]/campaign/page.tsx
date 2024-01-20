import React from "react";

import { Campaign } from "@/components/dashboard/Campaign";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

const page = () => {
  return (
    <>
      <DashboardHeading>Create Campaign</DashboardHeading>
      <Campaign />;
    </>
  );
};

export default page;
