import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { IndustryCardArtwork } from './IndustryCardArtwork';

export interface IndustryCardData {
  id: string;
  titleLines: [string, string];
  fullName: string;
  subtitleLine1: string;
  subtitleLine2: string;
  fullDescription: string;
  bgColor: string;
  automationRate: string;
  rating: string;
  workflowsCount: string;
}

const INDUSTRIES: IndustryCardData[] = [
  {
    id: 'ecommerce',
    titleLines: ['E-commerce &', 'Retail'],
    fullName: 'E-commerce & Retail',
    subtitleLine1: 'Orders, shipments,',
    subtitleLine2: 'returns and payments.',
    fullDescription: 'orders, shipments, returns and payments.',
    bgColor: '#C3DFF4', // Soft sky blue matching front card in reference image
    automationRate: '100%',
    rating: '4.89',
    workflowsCount: '120',
  },
  {
    id: 'tech-support',
    titleLines: ['Technical —', 'Support'],
    fullName: 'Technical Support',
    subtitleLine1: 'Accounts, subscriptions,',
    subtitleLine2: 'incidents and troubleshooting.',
    fullDescription: 'accounts, subscriptions, incidents and troubleshooting.',
    bgColor: '#C6DFE0', // Soft sage-mint matching second card in reference image
    automationRate: '100%',
    rating: '4.92',
    workflowsCount: '145',
  },
  {
    id: 'financial',
    titleLines: ['Financial', 'Services'],
    fullName: 'Financial Services',
    subtitleLine1: 'Billing, transactions,',
    subtitleLine2: 'disputes and account support.',
    fullDescription: 'billing, transactions, disputes and account support.',
    bgColor: '#F7E3C4', // Warm sand-cream matching third card in reference image
    automationRate: '100%',
    rating: '4.95',
    workflowsCount: '110',
  },
  {
    id: 'healthcare',
    titleLines: ['Healthcare &', 'Medical'],
    fullName: 'Healthcare & Medical',
    subtitleLine1: 'Appointments, billing and',
    subtitleLine2: 'non-clinical enquiries.',
    fullDescription: 'appointments, billing and non-clinical enquiries.',
    bgColor: '#D6DDF5', // Soft periwinkle pastel
    automationRate: '100%',
    rating: '4.91',
    workflowsCount: '95',
  },
  {
    id: 'telecom',
    titleLines: ['Telecom &', 'Connectivity'],
    fullName: 'Telecommunications',
    subtitleLine1: 'Service status, connectivity',
    subtitleLine2: 'and plan-related enquiries.',
    fullDescription: 'service status, connectivity and plan-related enquiries.',
    bgColor: '#E6D8EE', // Soft lavender pastel
    automationRate: '100%',
    rating: '4.88',
    workflowsCount: '130',
  },
];

// Exact spatial geometry matching the 3 visible fanned cards in the reference image
// plus tucked deck positions for cards 4 & 5 in the 5-card rotation
const SLOT_TRANSFORMS = [
  // Slot 0: Front / Top Card (bottom-right, upright)
  {
    x: 88,
    y: 112,
    rotate: 0,
    scale: 1,
    zIndex: 30,
    opacity: 1,
  },
  // Slot 1: Second Card (middle-left, tilted counter-clockwise)
  {
    x: -74,
    y: 26,
    rotate: -11.5,
    scale: 0.98,
    zIndex: 20,
    opacity: 1,
  },
  // Slot 2: Third Card (top-right, tilted clockwise, kept inside the section top)
  {
    x: 48,
    y: -100,
    rotate: 14.5,
    scale: 0.97,
    zIndex: 10,
    opacity: 1,
  },
  // Slot 3: Fourth Card (tucked behind third/second card, ready to cycle in)
  {
    x: -24,
    y: -85,
    rotate: -5,
    scale: 0.91,
    zIndex: 5,
    opacity: 0,
  },
  // Slot 4: Fifth Card (bottom of stack, ready to cycle in)
  {
    x: 20,
    y: -40,
    rotate: 6,
    scale: 0.88,
    zIndex: 1,
    opacity: 0,
  },
];

// Same stack order with a narrower fan so the deck fits inside a phone viewport
const SLOT_TRANSFORMS_COMPACT = [
  { x: 12, y: 96, rotate: 0, scale: 1, zIndex: 30, opacity: 1 },
  { x: -8, y: 20, rotate: -5, scale: 0.98, zIndex: 20, opacity: 1 },
  { x: 0, y: -70, rotate: 7, scale: 0.97, zIndex: 10, opacity: 1 },
  { x: -6, y: -70, rotate: -3, scale: 0.91, zIndex: 5, opacity: 0 },
  { x: 4, y: -36, rotate: 3, scale: 0.88, zIndex: 1, opacity: 0 },
];

export default function App() {
  // Ordered array of indices into INDUSTRIES.
  // order[0] is the front/top card, order[1] is the second card, order[2] is the third card, etc.
  const [cardOrder, setCardOrder] = useState<number[]>([0, 1, 2, 3, 4]);
  const [searchQuery, setSearchQuery] = useState('');
  const [compactDeck, setCompactDeck] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setCompactDeck(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const slotTransforms = compactDeck ? SLOT_TRANSFORMS_COMPACT : SLOT_TRANSFORMS;

  // Advance deck so the second card moves to the top
  const promoteSecondCardToTop = () => {
    setCardOrder((prev) => [...prev.slice(1), prev[0]]);
  };

  // Bring any specific industry index to the top of the card stack
  const bringIndustryToTop = (targetIndustryIndex: number) => {
    setCardOrder((prev) => {
      const pos = prev.indexOf(targetIndustryIndex);
      if (pos <= 0) return prev;
      return [...prev.slice(pos), ...prev.slice(0, pos)];
    });
  };

  // Handle clicking a card at a given slot position in the stack
  const handleCardClick = (slotIndex: number, industryIndex: number) => {
    if (slotIndex === 0 || slotIndex === 1) {
      // Clicking the active top card (or its arrow button) OR clicking the second card
      // promotes the second card to the top of the stack
      promoteSecondCardToTop();
    } else {
      // Clicking the third card brings it directly to the top
      bringIndustryToTop(industryIndex);
    }
  };

  // Filter matching industries when typing in the search bar
  const matchingIndustries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return INDUSTRIES.map((ind, idx) => ({ ...ind, idx })).filter(
      (ind) =>
        ind.fullName.toLowerCase().includes(q) ||
        ind.fullDescription.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeIndustry = INDUSTRIES[cardOrder[0]];
  const secondIndustry = INDUSTRIES[cardOrder[1]];

  return (
    <div className="min-h-screen text-[#092234] flex flex-col overflow-x-hidden">
      <main className="flex-1 max-w-[1380px] w-full mx-auto px-6 sm:px-12 lg:px-16 pt-10 pb-16 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center relative">
        <div className="lg:col-span-6 flex flex-col justify-between z-20 space-y-8 lg:pr-6">
          <div className="space-y-6">
            <h1 className="text-[44px] sm:text-[56px] lg:text-[62px] leading-[1.08] tracking-[-0.025em] text-[#092234] select-none">
              <span className="block font-sans font-normal">
                A single platform.
              </span>
              <span className="block font-serif font-bold tracking-[-0.015em] mt-0.5">
                Multiple
              </span>
              <span className="block font-sans font-normal">
                industries.
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-[1.55] text-[#1D3547] max-w-[475px] font-normal">
              Pulsar adapts to your industry&apos;s workflows, business data, and
              policies — delivering relevant automation without a fragmented
              support infrastructure.
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 relative h-[760px] lg:h-[720px] xl:h-[760px] flex items-center justify-center">
          <div className="relative w-[320px] sm:w-[356px] h-[445px] max-[380px]:scale-[0.97] lg:scale-90 xl:scale-100">
            {INDUSTRIES.map((industry, industryIdx) => {
              const slotIndex = cardOrder.indexOf(industryIdx);
              const transform = slotTransforms[slotIndex] || slotTransforms[4];
              const isFront = slotIndex === 0;
              const isSecond = slotIndex === 1;
              const isVisible = slotIndex <= 2;

              return (
                <motion.div
                  key={industry.id}
                  onClick={() => handleCardClick(slotIndex, industryIdx)}
                  initial={false}
                  animate={{
                    x: transform.x,
                    y: transform.y,
                    rotate: transform.rotate,
                    scale: transform.scale,
                    opacity: transform.opacity,
                    zIndex: transform.zIndex,
                  }}
                  whileHover={
                    isVisible
                      ? {
                          scale: transform.scale * 1.018,
                          y: transform.y - 4,
                        }
                      : undefined
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 30,
                    mass: 0.9,
                  }}
                  style={{
                    backgroundColor: industry.bgColor,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  role="button"
                  tabIndex={isVisible ? 0 : -1}
                  aria-label={`${industry.fullName} — ${industry.fullDescription}. Click to bring next industry card to top.`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(slotIndex, industryIdx);
                    }
                  }}
                  className={`absolute inset-0 w-[315px] sm:w-[356px] h-[445px] rounded-[34px] flex flex-col justify-between overflow-hidden select-none cursor-pointer transition-shadow ${
                    isFront
                      ? 'shadow-[0_22px_50px_-15px_rgba(9,34,52,0.16)]'
                      : 'shadow-[0_14px_34px_-12px_rgba(9,34,52,0.1)]'
                  }`}
                >
                  {/* Card Top Header: Serif Title + Supporting Copy + Dark Navy Circle Arrow Button */}
                  <div className="p-7 pb-0 flex items-start justify-between gap-3 relative z-10">
                    <div className="space-y-1.5">
                      <h2 className="font-serif font-semibold text-[23px] sm:text-[25px] leading-[1.15] tracking-[-0.01em] text-[#092234]">
                        <span className="block">{industry.titleLines[0]}</span>
                        <span className="block">{industry.titleLines[1]}</span>
                      </h2>

                      <div className="pt-1 space-y-0.5 text-[14px] sm:text-[15px] leading-[1.35] text-[#173144] font-normal">
                        <p>{industry.subtitleLine1}</p>
                        <p className="text-[13px] sm:text-[14px] text-[#264154]">
                          {industry.subtitleLine2}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(slotIndex, industryIdx);
                      }}
                      title={
                        isFront || isSecond
                          ? `Switch to ${secondIndustry.fullName}`
                          : `Bring ${industry.fullName} to top`
                      }
                      className="w-[54px] h-[54px] rounded-full bg-[#092234] text-white flex items-center justify-center shrink-0 hover:bg-[#143954] active:scale-95 transition-all cursor-pointer"
                    >
                      <ArrowUpRight className="w-5 h-5 stroke-[2]" />
                    </button>
                  </div>
                  <div className="relative w-full h-[250px] mt-auto overflow-hidden">
                    <IndustryCardArtwork industryId={industry.id} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
