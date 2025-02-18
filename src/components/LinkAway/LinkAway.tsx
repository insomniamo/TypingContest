import React from "react";
import "./linkaway.scss"

interface LinkProps {
  linkText: string;
  link: string;
  children?: React.ReactNode;
}

const LinkAway: React.FC<LinkProps> = ({ linkText, link, children }) => {
  return (

    <a href={link} target="_blank" rel="noopener noreferrer" className="link">
      <div className="link__icon">{children}</div>
      {linkText}
    </a>
  );
};

export default LinkAway;
