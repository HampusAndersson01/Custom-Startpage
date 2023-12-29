import React from "react";
import Link from "./Link";

interface LinksSectionProps {
  title: string;
  links: {
    url: string;
    title: string;
    icon: React.ReactElement;
    color: string;
  }[];
}

const LinksSection: React.FC<LinksSectionProps> = ({ title, links }) => {
  const sectionClassName = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`section ${sectionClassName}-section`}>
      <h3>{title}</h3>
      <div className="link-container">
        {links.map((link, index) => (
          <Link key={index} {...link} />
        ))}
      </div>
    </div>
  );
};

export default LinksSection;
