import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h1 className={`text-6xl font-bold text-center ${className}`}>
      {children}
    </h1>
  );
};

export default Heading;
