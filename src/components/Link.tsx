import React from "react";

interface LinkProps {
  url: string;
  title: string;
  icon: React.ReactElement;
  color: string;
  showTitle: boolean; // New prop to determine whether to show the title or not
}

const Link: React.FC<LinkProps> = ({ url, title, icon, color, showTitle }) => {
  const iconColor = isDarkColor(color) ? "#fff" : "#000";

  const styledIcon = React.cloneElement(icon, { style: { color: iconColor } });

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="link" style={{ backgroundColor: color }}>
        <div className="link-icon">{styledIcon}</div>
        {showTitle && <span style={{ color: iconColor }}>{title}</span>}
      </div>
    </a>
  );
};

const isDarkColor = (color: string) => {
  const hex = color.replace(/^#/, "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

export default Link;
