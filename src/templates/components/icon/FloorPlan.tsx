import React from 'react';

const FloorPlan: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 5v5H9V5H5v8h4v-1h1v5H9v-3H5v5h7v-2h1v2h6v-2h2v4H3V3h18v12h-2v-5h-6v5h-1V9h7V5h-9Z"
      />
    </svg>
  );
};

export default FloorPlan;
