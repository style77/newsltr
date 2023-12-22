import React from "react";

interface link {
  label: string;
  href: string;
}

interface FooterNavLinkProps {
  title: string;
  links: link[];
}

const FooterNavLink = ({ title, links }: FooterNavLinkProps) => {
  return (
    <div>
      <h3 className="text-3xl font-bold">{title}</h3>
      <ul className="mt-2 text-lg font-semibold">
        {links.map((link) => (
          <li key={link.label} className="py-2 ">
            <a
              href={link.href}
              className="hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavLink;
