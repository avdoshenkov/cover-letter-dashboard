import { type SVGProps } from 'react';

export const RotateCcwIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M3 4v6h6" />
    <path d="M3.51 9A9 9 0 1 0 5.64 5.64L3 8" />
  </svg>
);
