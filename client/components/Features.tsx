import React from "react";
import { RiTeamLine } from "react-icons/ri";
import { TbReportAnalytics, TbMoneybag, TbTemplate } from "react-icons/tb";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Collaborative Workspaces",
    description:
      "Create and manage shared workspaces for seamless collaboration among team members.",
    icon: <RiTeamLine />,
  },
  {
    title: "Email Templates",
    description:
      "Simplify template management with customizable and trackable email templates for efficient communication.",
    icon: <TbTemplate />,
  },
  {
    title: "Email Analytics",
    description:
      "Gain valuable insights into email campaigns with detailed statistics to track performance and engagement.",
    icon: <TbReportAnalytics />,
  },
  {
    title: "Affordable Subscription Plans",
    description:
      "Choose from cost-effective subscription options to suit your budget and needs.",
    icon: <TbMoneybag />,
  },
];

const Features = () => {
  return (
    <section className="bg-grey bg-bg-1 bg-right-top bg-no-repeat py-20">
      <div className="mx-auto max-w-6xl px-4 pt-20 text-text ">
        <h2 className="mb-8 text-6xl font-bold lg:text-center">Features</h2>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
