import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";

import {
  socialIcons,
  footerNavLinks,
  footerSocialLinks,
} from "@/utils/footerData";
import SocialIcon from "./SocialIcon";
import FooterNavLink from "./FooterNavLink";
import NewsletterButton from "./NewsletterButton";

const Navigation = () => (
  <>
    {footerNavLinks.map((navlink) => (
      <FooterNavLink
        key={navlink.title}
        title={navlink.title}
        links={navlink.links}
      />
    ))}
  </>
);

const Contact = () => (
  <>
    <ul className="flex flex-wrap gap-10">
      {footerSocialLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="underline underline-offset-4 hover:font-bold"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
    <div className="mt-10 flex flex-wrap gap-4">
      <p className=" border-r-2 border-[#2A4859] pr-4">
        2023 All Rights Reserved
      </p>
      <p className=" border-r-2 border-[#2A4859] pr-4">newltr@newsltr.com</p>
      <p>+92 300 848 9895</p>
    </div>
  </>
);

const Newsletter = () => (
  <>
    <h3 className="text-3xl font-bold">Join Our Newsletter</h3>
    <NewsletterButton />
    <p>* Will send you weekly updates for your better finance management.</p>
  </>
);

const CompanyInfo = () => (
  <>
    <Image
      src={logo}
      alt="Nwsltr logo"
      width={130}
      height={32}
      className="w-[130px]"
    />
    <p className="w-full max-w-[250px] text-lg">
      Finance helps companies manage payments easily.
    </p>
    <div className="flex items-center gap-4">
      {socialIcons.map((icon) => (
        <SocialIcon
          key={icon.alt}
          href={icon.href}
          src={icon.src}
          alt={icon.alt}
        />
      ))}
    </div>
  </>
);

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-navy p-4 py-12 text-slategray">
      <div className="flex flex-wrap gap-14 border-b-2 border-[#2A4859] pb-10">
        <div className="flex flex-col gap-4">
          <CompanyInfo />
        </div>
        <nav className="flex flex-wrap gap-10">
          <Navigation />
        </nav>
        <div className="flex flex-col gap-4">
          <Newsletter />
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-center">
        <Contact />
      </div>
    </footer>
  );
};

export default Footer;
