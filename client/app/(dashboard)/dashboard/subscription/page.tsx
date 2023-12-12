import Container from "@/components/dashboard/Container";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import Subscriptions from "@/components/dashboard/Subscriptions";
import React from "react";

const page = () => {
  return (
    <Container>
      <DashboardHeading>Subscriptions</DashboardHeading>
      <Subscriptions />
    </Container>
  );
};

export default page;
