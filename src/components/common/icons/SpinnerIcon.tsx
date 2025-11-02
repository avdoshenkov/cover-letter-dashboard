import { SVGProps } from 'react';

export const SpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
    {...props}
  >
    <circle cx="12" cy="12" r="9" opacity="0.24" />
    <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
