import React from "react";
import Link from "./Link";
import { sort } from "color-sorter";

interface LinksSectionProps {
  title: string;
  links: {
    url: string;
    title: string;
    icon: React.ReactElement;
    color: string;
  }[];
  color: string;
  showTitles: boolean;
}

const LinksSection: React.FC<LinksSectionProps> = ({
  title,
  links,
  color,
  showTitles,
}) => {
  // Use color-sorter to sort the links by color
  const sortedLinks = sort(links.map((link) => link.color)).map(
    (sortedColor) => {
      // Find the link object based on the sorted color
      return links.find((link) => link.color === sortedColor) as {
        url: string;
        title: string;
        icon: React.ReactElement;
        color: string;
      };
    }
  );

  const sectionClassName = title.toLowerCase().replace(/\s+/g, "-");



  return (
    <div
      className={`section ${sectionClassName}-section`}
      style={{ backgroundColor: color }}
    >
      <h3 style={{ backgroundColor: color }}>{title}</h3>
      <div className="link-container">
        {sortedLinks.map((link, index) => (
          <Link
            key={index}
            url={link.url}
            title={link.title}
            icon={link.icon}
            color={link.color}
            showTitle={showTitles}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksSection;
