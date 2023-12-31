import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}
