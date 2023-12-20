import Image from "next/image";
import React from "react";
import mailBox from "@/public/mailbox.svg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative pb-36 mt-24">
      <section className="mx-auto pt-20 lg:max-w-6xl ">
        <div className="text-text max-w-xl mt-12 px-4 flex flex-col justify-center items-center">
          <h1 className="text-5xl leading-none font-bold mb-12 lg:text-[80px]">
            Elevate Your Newsletter Experience
          </h1>
          <p className="text-2xl mb-12">
            Craft, Deliver, and Analyze Stunning Newsletters with Ease.
          </p>
        </div>
        <div className="px-4">
          <Button className="text-xl h-14 w-56 bg-primary font-medium">
            Get Started
          </Button>
        </div>
      </section>

      <div className="lg:absolute -z-10 top-0 w-full flex justify-end">
        <Image className="w-[500px] xl:w-[720px]" src={mailBox} alt="mailbox" />
      </div>
    </section>
  );
};

export default Hero;
