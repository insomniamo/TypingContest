import React from "react";

const TimeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>time-solid</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none" />
        </g>
        <g id="icons_Q2" data-name="icons Q2">
          <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM35.7,31A2.1,2.1,0,0,1,34,32a1.9,1.9,0,0,1-1-.3L22,25.1V14a2,2,0,0,1,4,0v8.9l9,5.4A1.9,1.9,0,0,1,35.7,31Z" />
        </g>
      </g>
    </svg>
  );
};

export default TimeIcon;
