type BestPricingCardProps = {
  name: string;
  price: string;
  description: string;
};

const BestPricingCard = ({
  name,
  price,
  description,
}: BestPricingCardProps) => {
  return (
    <div
      className={`relative flex h-[720px] w-full max-w-[621px] shrink-0 flex-col justify-between rounded-2xl border-border bg-white bg-pricing bg-cover bg-top bg-no-repeat p-9 text-white xl:max-w-[450px]`}
    >
      <div className="absolute top-0 rounded-b-xl bg-white p-2 text-lg text-[#385A6E]">
        Best value
      </div>
      <div className="mt-8 w-full text-3xl font-semibold">
        <div className="flex w-full flex-col items-center gap-2 pb-4">
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
        <button className="w-full rounded-xl bg-[#FFA400] py-3 text-xl text-[#231F20] hover:bg-[#ffb121]">
          Get started
        </button>
      </div>
    </div>
  );
};

export default BestPricingCard;
