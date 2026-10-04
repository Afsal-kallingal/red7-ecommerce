import React from 'react';

export function Red7Logo({
  className = '',
  size = 'md',
  showText = false,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}) {
  const dimensions = {
    sm: { width: 28, height: 34, cardW: 14, cardH: 20 },
    md: { width: 34, height: 42, cardW: 18, cardH: 26 },
    lg: { width: 44, height: 54, cardW: 24, cardH: 34 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Hand holding referee Red Card emblem */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 34 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200 hover:scale-105"
        aria-label="RED7 Red Card Logo"
      >
        {/* Shadow under card */}
        <rect
          x="10.5"
          y="2.5"
          width="16"
          height="24"
          rx="2"
          fill="rgba(0,0,0,0.15)"
        />
        {/* The Iconic Referee Red Card */}
        <rect
          x="9"
          y="1"
          width="16"
          height="24"
          rx="2"
          fill="#E50914"
        />
        {/* Subtle sheen highlight on card */}
        <path
          d="M9 3C9 1.89543 9.89543 1 11 1H15L11 25H9.5C9.22386 25 9 24.7761 9 24.5V3Z"
          fill="white"
          fillOpacity="0.18"
        />
        {/* Number 7 on the Red Card */}
        <text
          x="17"
          y="17"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="-0.5px"
        >
          7
        </text>

        {/* Hand and Fingers holding the card from the bottom */}
        {/* Arm / Wrist */}
        <path
          d="M14 36V42H20V36C20.5 35 21 34 21 32V25C21 23.5 19.8 23 18.5 23H15.5C14.2 23 13 23.5 13 25V32C13 34 13.5 35 14 36Z"
          fill="#E5A67D"
        />
        {/* Palm shading */}
        <path
          d="M13 28C13 28 14.5 32 17 32C19.5 32 21 28 21 28V33C21 34.5 20 36 17 36C14 36 13 34.5 13 33V28Z"
          fill="#D68E63"
        />
        {/* Thumb gripping the front of the red card */}
        <rect
          x="7.5"
          y="19"
          width="5.5"
          height="6.5"
          rx="2.5"
          fill="#E5A67D"
          stroke="#C57A50"
          strokeWidth="0.75"
        />
        {/* Index finger grip */}
        <rect
          x="12"
          y="20.5"
          width="7"
          height="4.5"
          rx="2"
          fill="#F0B58D"
        />
      </svg>

      {showText && (
        <span className="font-headline tracking-tighter text-xl font-black uppercase text-black">
          RED<span className="text-[#E50914]">7</span>
        </span>
      )}
    </div>
  );
}
