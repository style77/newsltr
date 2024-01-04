import React from "react";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  isBestPrice?: boolean;
};

const PricingCard = ({
  name,
  price,
  description,
  isBestPrice,
}: PricingCardProps) => {
  return (
    <div
      className={`flex h-[${isBestPrice ? "720px" : "520px"}] w-full max-w-[${
        isBestPrice ? "621px" : "620px"
      }] flex-col justify-between rounded-2xl border-2 ${
        isBestPrice
          ? "border-transparent bg-pricing bg-cover bg-top bg-no-repeat text-white"
          : "border-[#E4E4E4] border-border bg-white"
      } relative p-9 xl:max-w-[${isBestPrice ? "450px" : "360px"}]`}
    >
      {isBestPrice && (
        <div className="absolute top-0 rounded-b-xl bg-white p-2 text-lg text-[#385A6E]">
          Best value
        </div>
      )}
      <div className="w-full text-3xl font-semibold">
        <div className="flex w-full flex-col items-center gap-2 border-b-2 border-[#CFCFCF] pb-4">
          <h3 className="text-4xl font-normal">{name}</h3>
          <span className="text-6xl">{price}</span>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-2xl font-normal">
          {description}
          <p className="">Lorem ipsum</p>
          <p className="">Lorem ipsum</p>
          <p className="">Lorem ipsum</p>
        </div>
      </div>
      <div className="w-full">
        <button
          className={`w-full rounded-xl bg-[#FFA400] py-3 text-xl text-[#231F20] hover:bg-[#ffb121]`}
        >
          {isBestPrice ? "Get started" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
