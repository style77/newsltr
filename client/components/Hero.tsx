import Image from "next/image";
import React from "react";
import mailBox from "@/public/mailbox.svg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative mt-24 pb-36">
      <section className="mx-auto pt-20 lg:max-w-6xl ">
        <div className="mt-12 flex max-w-xl flex-col items-center justify-center px-4 text-text">
          <h1 className="mb-12 text-5xl font-bold leading-none lg:text-[80px]">
            Elevate Your Newsletter Experience
          </h1>
          <p className="mb-12 text-2xl">
            Craft, Deliver, and Analyze Stunning Newsletters with Ease.
          </p>
        </div>
        <div className="px-4">
          <Button className="h-14 w-56 bg-primary text-xl font-medium">
            Get Started
          </Button>
        </div>
      </section>

      <div className="top-0 -z-10 flex w-full justify-end lg:absolute">
        <Image className="w-[500px] xl:w-[720px]" src={mailBox} alt="mailbox" />
      </div>
    </section>
  );
};

export default Hero;
