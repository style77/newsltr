import React from "react";

const PricingCard = () => {
  return (
    <div className="flex h-[520px] w-full max-w-[620px] flex-col justify-between rounded-lg border-2 border-[#E4E4E4] border-border bg-white p-9 lg:max-w-[360px]">
      <div className="w-full text-3xl   font-semibold">
        <div className="flex w-full flex-col items-center gap-2 border-b-2 border-[#CFCFCF] pb-4">
          <h3 className="text-4xl font-normal">Basic</h3>
          <span className="text-6xl">$ 36</span>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-2xl font-normal">
          <p className="">Lorem ipsum</p>
          <p className="">Lorem ipsum</p>
          <p className="">Lorem ipsum</p>
        </div>
      </div>
      <div className="w-full">
        <button className="w-full rounded-xl bg-[#FFA400] py-3 text-xl text-[#231F20]">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
