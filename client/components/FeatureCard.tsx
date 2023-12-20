import React from "react";

interface FeatureCardType {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardType) => {
  // const { title, description, icon } = feature;
  return (
    <div className="rounded-lg border-2 border-[#E4E4E4] border-border bg-white p-10">
      <div className="mb-4 flex items-center text-3xl font-semibold">
        <span className="mr-2">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p className="ml-[38px] text-xl">{description}</p>
    </div>
  );
};

export default FeatureCard;
