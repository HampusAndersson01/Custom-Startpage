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
  color: string;
}

const LinksSection: React.FC<LinksSectionProps> = ({
  title,
  links,
  color,
}) => {
  // Sort the links by color
  const sortedLinks = [...links].sort((a, b) => a.color.localeCompare(b.color));

  const sectionClassName = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className={`section ${sectionClassName}-section`}
      style={{ backgroundColor: color }}
    >
      <h3 style={{ backgroundColor: color }}>{title}</h3>
      <div className="link-container">
        {sortedLinks.map((link, index) => (
          <Link key={index} {...link} />
        ))}
      </div>
    </div>
  );
};

export default LinksSection;
