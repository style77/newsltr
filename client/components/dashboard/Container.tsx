import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="grow">
      <div className="w-[1480px] bg-background2 h-full p-10">{children}</div>
    </div>
  );
};

export default Container;
