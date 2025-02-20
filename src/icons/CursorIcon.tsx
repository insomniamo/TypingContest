import React from "react";

const CursorIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.6815 3.39615C6.73899 2.49228 7.81132 2.05039 8.48891 2.6514L18.4401 11.4777C19.1644 12.1202 18.7516 13.3177 17.7852 13.3772L14.6681 13.5695L16.7595 18.5676C17.184 19.5819 16.71 20.7486 15.6984 21.1796L14.8301 21.5495C13.8121 21.9832 12.6353 21.5079 12.2042 20.4887L9.97835 15.2268L7.65486 17.2342C6.92522 17.8646 5.7969 17.3043 5.8581 16.342L6.6815 3.39615Z"
        fill={"currentColor"}
      />
    </svg>
  );
};

export default CursorIcon;
