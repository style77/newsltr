import React from "react";

const NewsletterButton = () => {
  return (
    <div className="flex justify-between rounded-xl bg-white">
      <input
        className="w-full rounded-xl p-2 placeholder:text-slate-300"
        placeholder="Your email address"
      />
      <button className="rounded-r-xl bg-primary px-6 py-2 text-white">
        {" "}
        Subscribe
      </button>
    </div>
  );
};

export default NewsletterButton;
