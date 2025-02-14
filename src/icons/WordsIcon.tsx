import React from "react";

const WordsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M22,3a1,1,0,0,1-1,1H3A1,1,0,0,1,3,2H21A1,1,0,0,1,22,3Zm-1,7a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2ZM2,15a1,1,0,0,0,1,1H21a1,1,0,0,0,0-2H3A1,1,0,0,0,2,15Zm20,6a1,1,0,0,0-1-1H9a1,1,0,0,0,0,2H21A1,1,0,0,0,22,21Z" />
  </svg>
);

export default WordsIcon;
