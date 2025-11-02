import { SVGProps } from 'react';

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M6 10.5L8.66667 13L14 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
