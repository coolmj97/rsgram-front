import { IconProps } from './types/Icon.types';

export const PrevArrow = ({ color, ...args }: IconProps) => {
  return (
    <svg
      fill={color || '#363636'}
      width="64px"
      height="64px"
      viewBox="-22.4 -22.4 76.80 76.80"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...args}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

      <g id="SVGRepo_iconCarrier">
        <path d="M23.505 0c0.271 0 0.549 0.107 0.757 0.316 0.417 0.417 0.417 1.098 0 1.515l-14.258 14.264 14.050 14.050c0.417 0.417 0.417 1.098 0 1.515s-1.098 0.417-1.515 0l-14.807-14.807c-0.417-0.417-0.417-1.098 0-1.515l15.015-15.022c0.208-0.208 0.486-0.316 0.757-0.316z" />
      </g>
    </svg>
  );
};
