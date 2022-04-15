import React from 'react';

const Furniture = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 15 15"
      {...props}
    >
      <rect x="0" y="0" width="15" height="15" fill="none" stroke="none" />
      <path
        fill="currentColor"
        d="M9 10.142V8.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.641a3.991 3.991 0 0 0-2.957 3.272a.507.507 0 0 0 .5.586h6.922a.507.507 0 0 0 .5-.586A3.991 3.991 0 0 0 9 10.142Zm4.639-3.863l-2.5-5A.5.5 0 0 0 10.692 1H5.308a.5.5 0 0 0-.446.276l-2.5 5A.5.5 0 0 0 2.806 7H11v1.5a.5.5 0 0 0 1 0V7h1.194a.5.5 0 0 0 .445-.721Z"
      />
    </svg>
  );
};

export default Furniture;
