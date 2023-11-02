import React from "react";

interface FeatureCardType {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardType) => {
  // const { title, description, icon } = feature;
  return (
    <div className="border border-border p-10 rounded-lg">
      <div className="flex items-center text-3xl font-semibold mb-4">
        <span className="mr-2">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p className="ml-[38px] text-xl">{description}</p>
    </div>
  );
};

export default FeatureCard;
