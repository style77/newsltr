type BillingCycleButtonProps = {
  value: "Month" | "Year";
  onClick: (value: "Month" | "Year") => void;
};

const BillingCycleButton = ({ value, onClick }: BillingCycleButtonProps) => {
  return (
    <div className="flex rounded-full bg-[#F5F9FD]">
      <button
        onClick={() => onClick("Month")}
        className={`${
          value === "Month"
            ? "bg-[#33566A] text-white"
            : "bg-none text-[#33566A]"
        } rounded-full px-6 py-2`}
      >
        Month
      </button>
      <button
        onClick={() => onClick("Year")}
        className={`${
          value === "Year"
            ? "bg-[#33566A] text-white"
            : "bg-none text-[#33566A]"
        } rounded-full px-6 py-2`}
      >
        Year
      </button>
    </div>
  );
};

export default BillingCycleButton;
