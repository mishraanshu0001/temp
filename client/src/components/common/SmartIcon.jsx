import React from 'react';

/**
 * SmartIcon - Google Material / MUI AutoAwesome styled AI Smart Icon
 * Matches the 4-point star with upper-right '+' and lower-left dot.
 */
export default function SmartIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      {...props}
    >
      {/* Central 4-point smooth star */}
      <path d="M12 3c0 4.5-3.5 8-8 8 4.5 0 8 3.5 8 8 0-4.5 3.5-8 8-8-4.5 0-8-3.5-8-8z" />
      
      {/* Top right plus symbol */}
      <path d="M19 2v4" />
      <path d="M21 4h-4" />
      
      {/* Bottom left dot */}
      <circle cx="5.5" cy="18.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
