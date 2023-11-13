import React from "react";
import { useRetrieveSubscriptionsQuery } from "@/redux/features/paymentApiSlice";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
const Page = () => {
  const { data, isLoading } = useRetrieveUserQuery();

  return <div>Dashboard</div>;
};

export default Page;
