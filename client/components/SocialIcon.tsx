import React from "react";
import Image from "next/image";

interface SocialIconProps {
  src: string;
  alt: string;
  href: string;
}

const SocialIcon = ({ src, alt, href }: SocialIconProps) => (
  <a href={href}>
    <Image src={src} alt={alt} width={28} height={28} className="w-[28px]" />
  </a>
);

export default SocialIcon;
