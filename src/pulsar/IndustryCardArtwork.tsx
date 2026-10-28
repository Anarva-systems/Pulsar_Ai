import React from 'react';

interface ArtworkProps {
  industryId: string;
}

export const IndustryCardArtwork: React.FC<ArtworkProps> = ({ industryId }) => {
  switch (industryId) {
    case 'ecommerce':
      // Architectural high-rise tower with cantilevered balconies & palm silhouettes (exact homage to the front card in reference image)
      return (
        <svg
          viewBox="0 0 360 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom select-none pointer-events-none"
        >
          {/* Main 3D Architectural Tower - Left & Right Facades in Perspective */}
          {/* Left Sunlit Facade */}
          <path
            d="M86 38L168 18V250H86V38Z"
            fill="#F4F9FD"
          />
          {/* Right Shaded Facade */}
          <path
            d="M168 18L248 42V250H168V18Z"
            fill="#8FB3C9"
          />
          {/* Deep Navy Window Bays & Recessed Floors - Left Side */}
          {[0, 1, 2, 3, 4, 5, 6].map((floor) => {
            const y = 34 + floor * 30;
            return (
              <g key={`left-${floor}`}>
                {/* Recessed window shadow */}
                <path
                  d={`M94 ${y + 8}L164 ${y - 8}V${y + 12}L94 ${y + 26}V${y + 8}Z`}
                  fill="#092234"
                />
                {/* Glass mullions */}
                <line
                  x1="118"
                  y1={y + 2}
                  x2="118"
                  y2={y + 21}
                  stroke="#8FB3C9"
                  strokeWidth="1.5"
                />
                <line
                  x1="142"
                  y1={y - 3}
                  x2="142"
                  y2={y + 16}
                  stroke="#8FB3C9"
                  strokeWidth="1.5"
                />
                {/* Cantilevered White Balcony Slab */}
                <path
                  d={`M80 ${y + 24}L168 ${y + 5}V${y + 13}L80 ${y + 32}V${y + 24}Z`}
                  fill="#FFFFFF"
                />
                {/* Balcony Railing */}
                <path
                  d={`M82 ${y + 18}L166 ${y - 1}`}
                  stroke="#092234"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
              </g>
            );
          })}

          {/* Deep Navy Window Bays & Balconies - Right Side */}
          {[0, 1, 2, 3, 4, 5, 6].map((floor) => {
            const y = 34 + floor * 30;
            return (
              <g key={`right-${floor}`}>
                {/* Recessed window shadow */}
                <path
                  d={`M172 ${y - 8}L240 ${y + 11}V${y + 29}L172 ${y + 12}V${y - 8}Z`}
                  fill="#092234"
                />
                {/* Glass mullions */}
                <line
                  x1="196"
                  y1={y - 1}
                  x2="196"
                  y2={y + 18}
                  stroke="#5E859E"
                  strokeWidth="1.5"
                />
                <line
                  x1="218"
                  y1={y + 5}
                  x2="218"
                  y2={y + 24}
                  stroke="#5E859E"
                  strokeWidth="1.5"
                />
                {/* Cantilevered Balcony Slab */}
                <path
                  d={`M168 ${y + 5}L254 ${y + 27}V${y + 35}L168 ${y + 13}V${y + 5}Z`}
                  fill="#DCEBF5"
                />
                {/* Under-slab shadow */}
                <path
                  d={`M168 ${y + 13}L254 ${y + 35}L246 ${y + 38}L168 ${y + 17}Z`}
                  fill="#092234"
                  fillOpacity="0.65"
                />
              </g>
            );
          })}

          {/* Center Spine Accent */}
          <line x1="168" y1="18" x2="168" y2="250" stroke="#FFFFFF" strokeWidth="2.5" />

          {/* Tall Foreground Palm Tree - Left */}
          <g>
            <path
              d="M114 250C115 210 118 168 116 122"
              stroke="#092234"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Palm Fronds */}
            <path d="M116 122C96 112 76 118 64 134C82 126 98 125 116 125Z" fill="#092234" />
            <path d="M116 122C92 100 72 98 58 108C78 106 96 112 116 122Z" fill="#092234" />
            <path d="M116 122C102 92 92 78 78 78C92 86 104 102 116 122Z" fill="#092234" />
            <path d="M116 122C122 90 134 76 150 74C136 86 125 102 116 122Z" fill="#092234" />
            <path d="M116 122C138 100 158 98 172 110C152 106 134 112 116 122Z" fill="#092234" />
            <path d="M116 122C136 116 154 126 162 144C146 132 132 126 116 124Z" fill="#092234" />
            <path d="M116 122C104 128 88 142 82 158C96 144 106 134 116 125Z" fill="#092234" />
            <circle cx="116" cy="123" r="6" fill="#092234" />
          </g>

          {/* Taller Foreground Palm Tree - Right */}
          <g>
            <path
              d="M212 250C214 202 216 148 212 96"
              stroke="#092234"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path d="M212 96C192 86 174 92 162 108C180 100 196 98 212 99Z" fill="#092234" />
            <path d="M212 96C190 74 172 72 158 82C176 80 194 86 212 96Z" fill="#092234" />
            <path d="M212 96C202 68 194 56 182 54C194 64 204 78 212 96Z" fill="#092234" />
            <path d="M212 96C220 66 232 54 246 54C234 66 222 80 212 96Z" fill="#092234" />
            <path d="M212 96C234 76 254 76 268 88C248 84 230 88 212 96Z" fill="#092234" />
            <path d="M212 96C232 90 248 100 256 118C240 106 226 100 212 98Z" fill="#092234" />
            <circle cx="212" cy="97" r="5.5" fill="#092234" />
          </g>

          {/* Lower Canopy Palm - Bottom Right */}
          <g>
            <path
              d="M234 250C235 224 235 198 232 172"
              stroke="#092234"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M232 172C212 162 194 168 182 184C200 176 216 174 232 175Z" fill="#092234" />
            <path d="M232 172C214 152 198 148 184 156C202 156 218 162 232 172Z" fill="#092234" />
            <path d="M232 172C248 152 266 150 280 160C262 158 246 164 232 172Z" fill="#092234" />
            <path d="M232 172C250 166 266 176 274 192C258 182 244 176 232 174Z" fill="#092234" />
            <circle cx="232" cy="173" r="5" fill="#092234" />
          </g>
        </svg>
      );

    case 'tech-support':
      // Modernist Grid Hub Building (matches the second card's structural grid facade in the reference image)
      return (
        <svg
          viewBox="0 0 360 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom select-none pointer-events-none"
        >
          {/* Angled Brutalist / Modernist Technical Hub */}
          <path d="M84 52L152 16V250H84V52Z" fill="#F2F8F8" />
          <path d="M152 16L268 48V250H152V16Z" fill="#8FB4B6" />
          {/* Precision Structural Grid Windows - Left */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
            const y = 38 + row * 26;
            return (
              <g key={`ts-l-${row}`}>
                <path
                  d={`M92 ${y + 10}L146 ${y - 8}V${y + 6}L92 ${y + 24}V${y + 10}Z`}
                  fill="#092234"
                />
                <line x1="110" y1={y + 4} x2="110" y2={y + 20} stroke="#E4F1F1" strokeWidth="2" />
                <line x1="128" y1={y - 2} x2="128" y2={y + 14} stroke="#E4F1F1" strokeWidth="2" />
              </g>
            );
          })}
          {/* Precision Structural Grid Windows - Right */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
            const y = 38 + row * 26;
            return (
              <g key={`ts-r-${row}`}>
                <path
                  d={`M158 ${y - 8}L256 ${y + 18}V${y + 32}L158 ${y + 6}V${y - 8}Z`}
                  fill="#092234"
                />
                {[182, 206, 230].map((x, idx) => (
                  <line
                    key={idx}
                    x1={x}
                    y1={y - 2 + idx * 6}
                    x2={x}
                    y2={y + 14 + idx * 6}
                    stroke="#8FB4B6"
                    strokeWidth="2"
                  />
                ))}
              </g>
            );
          })}
          {/* Signal / Cloud Spire on Roof */}
          <line x1="152" y1="2" x2="152" y2="250" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="152" cy="8" r="4" fill="#092234" />
        </svg>
      );

    case 'financial':
      // Monumental Financial Exchange Tower with Stepped Setbacks & Columns
      return (
        <svg
          viewBox="0 0 360 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom select-none pointer-events-none"
        >
          {/* Base & Stepped Financial High-Rise */}
          <path d="M96 44L176 14V250H96V44Z" fill="#FFFDF9" />
          <path d="M176 14L256 44V250H176V14Z" fill="#D5BE9B" />
          {/* Vertical Fluted Pilasters & Deep Navy Glass */}
          {[108, 128, 148, 164].map((x, i) => (
            <rect
              key={`fin-l-${i}`}
              x={x}
              y={46 - i * 6}
              width="10"
              height={210 + i * 6}
              fill="#092234"
            />
          ))}
          {[184, 204, 224, 240].map((x, i) => (
            <rect
              key={`fin-r-${i}`}
              x={x}
              y={26 + i * 6}
              width="10"
              height={230 - i * 6}
              fill="#092234"
            />
          ))}
          {/* Horizontal Spandrel Bands */}
          {[68, 108, 148, 188, 224].map((y, idx) => (
            <g key={`fin-b-${idx}`}>
              <path d={`M92 ${y + 12}L176 ${y - 6}L260 ${y + 12}V${y + 20}L176 ${y + 2}L92 ${y + 20}Z`} fill="#FFFDF9" />
            </g>
          ))}
          <line x1="176" y1="14" x2="176" y2="250" stroke="#092234" strokeWidth="2.5" />
        </svg>
      );

    case 'healthcare':
      // Curved Modernist Medical Pavilion & Atrium Terraces
      return (
        <svg
          viewBox="0 0 360 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom select-none pointer-events-none"
        >
          <path d="M88 36L174 16V250H88V36Z" fill="#F6F7FD" />
          <path d="M174 16L258 38V250H174V16Z" fill="#9FA7CC" />
          {[0, 1, 2, 3, 4, 5].map((level) => {
            const y = 36 + level * 34;
            return (
              <g key={`hc-${level}`}>
                <path
                  d={`M94 ${y + 8}L170 ${y - 8}V${y + 12}L94 ${y + 28}Z`}
                  fill="#092234"
                />
                <path
                  d={`M178 ${y - 8}L252 ${y + 8}V${y + 28}L178 ${y + 12}Z`}
                  fill="#092234"
                />
                <path
                  d={`M82 ${y + 26}L174 ${y + 6}L264 ${y + 26}V${y + 34}L174 ${y + 14}L82 ${y + 34}Z`}
                  fill="#FFFFFF"
                />
              </g>
            );
          })}
          {/* Clean Cross Emblem on Crown */}
          <rect x="169" y="22" width="10" height="24" rx="2" fill="#092234" />
          <rect x="162" y="29" width="24" height="10" rx="2" fill="#092234" />
        </svg>
      );

    case 'telecom':
    default:
      // Architectural Network Tower & Dish Array
      return (
        <svg
          viewBox="0 0 360 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom select-none pointer-events-none"
        >
          {/* Antenna Spire */}
          <line x1="176" y1="4" x2="176" y2="45" stroke="#092234" strokeWidth="3.5" />
          <circle cx="176" cy="6" r="4.5" fill="#092234" />
          <path d="M156 22C168 14 184 14 196 22" stroke="#092234" strokeWidth="2" strokeLinecap="round" />
          <path d="M146 32C164 20 188 20 206 32" stroke="#092234" strokeWidth="2" strokeLinecap="round" />

          {/* Main Tower Body */}
          <path d="M100 46L176 26V250H100V46Z" fill="#FAF6FC" />
          <path d="M176 26L252 46V250H176V26Z" fill="#BBA8C9" />
          {[0, 1, 2, 3, 4, 5].map((floor) => {
            const y = 46 + floor * 32;
            return (
              <g key={`tel-${floor}`}>
                <path d={`M108 ${y + 8}L172 ${y - 6}V${y + 12}L108 ${y + 26}Z`} fill="#092234" />
                <path d={`M180 ${y - 6}L244 ${y + 8}V${y + 26}L180 ${y + 12}Z`} fill="#092234" />
                <path d={`M96 ${y + 24}L176 ${y + 6}L256 ${y + 24}V${y + 31}L176 ${y + 13}L96 ${y + 31}Z`} fill="#FFFFFF" />
              </g>
            );
          })}
        </svg>
      );
  }
};
