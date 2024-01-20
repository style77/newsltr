import Image from "next/image";
import React from "react";
import mailBox from "@/public/mailbox.svg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative pb-36 mt-24">
      <section className="max-w-6xl mx-auto pt-20">
        <div className="text-text max-w-lg">
          <h1 className="text-[80px] leading-none font-bold mb-12">
            Elevate Your Newsletter Experience
          </h1>
          <p className="text-2xl mb-12">
            Craft, Deliver, and Analyze Stunning Newsletters with Ease.
          </p>
        </div>
        <div className="">
          <Button className="text-xl h-14 w-56 bg-primary font-medium">
            Get Started
          </Button>
        </div>
      </section>

      <div className="absolute -z-10 top-0 w-full flex justify-end">
        <Image
          className="w-[720px]"
          width={100}
          height={100}
          src={mailBox}
          alt="mailbox"
        />
      </div>
    </section>
  );
};

export default Hero;
