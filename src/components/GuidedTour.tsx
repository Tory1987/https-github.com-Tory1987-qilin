import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { tourSteps, getRouteKey, getSeenTours, markTourSeen } from '@/data/tourSteps';
import TourStep from './TourStep';
import { isQilinBotEnabled } from '@/components/QiLinBot';

export default function GuidedTour() {
  const location = useLocation();
  const routeKey = getRouteKey(location.pathname);
  const steps = tourSteps[routeKey];
  const [currentStep, setCurrentStep] = useState(0);
  const [active, setActive] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const rafRef = useRef<number>();

  // Check if tour should show
  useEffect(() => {
    if (!steps?.length || !isQilinBotEnabled()) {
      setActive(false);
      return;
    }
    const seen = getSeenTours();
    if (seen.includes(routeKey)) {
      setActive(false);
      return;
    }
    // Delay to let page render
    const timer = setTimeout(() => {
      setCurrentStep(0);
      setActive(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [routeKey, steps]);

  const updatePosition = useCallback(() => {
    if (!active || !steps?.[currentStep]) return;
    const el = document.querySelector(steps[currentStep].selector);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpotlightRect(rect);

    const tooltipW = 280;
    const tooltipH = 140;
    const gap = 12;
    const pos = steps[currentStep].position;
    let top = 0, left = 0;

    if (pos === 'bottom') {
      top = rect.bottom + gap;
      left = rect.left + rect.width / 2 - tooltipW / 2;
    } else if (pos === 'top') {
      top = rect.top - tooltipH - gap;
      left = rect.left + rect.width / 2 - tooltipW / 2;
    } else if (pos === 'right') {
      top = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.right + gap;
    } else {
      top = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.left - tooltipW - gap;
    }

    // Clamp to viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipW - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - tooltipH - 8));

    setTooltipPos({ top, left });
  }, [active, steps, currentStep]);

  useEffect(() => {
    if (!active) return;
    updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [active, currentStep, updatePosition]);

  const handleNext = () => {
    if (!steps) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    markTourSeen(routeKey);
    setActive(false);
  };

  if (!active || !steps?.length) return null;

  const pad = 6;

  return (
    <>
      {/* Overlay with spotlight cutout */}
      <div className="fixed inset-0 z-[100] pointer-events-auto" onClick={finish}>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {spotlightRect && (
                <rect
                  x={spotlightRect.left - pad}
                  y={spotlightRect.top - pad}
                  width={spotlightRect.width + pad * 2}
                  height={spotlightRect.height + pad * 2}
                  rx="12"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0" y="0" width="100%" height="100%"
            fill="rgba(0,0,0,0.5)"
            mask="url(#tour-mask)"
          />
        </svg>
        {/* Make spotlight area clickable-through */}
        {spotlightRect && (
          <div
            className="absolute z-[101] rounded-xl ring-2 ring-primary/50 ring-offset-2 ring-offset-transparent"
            style={{
              top: spotlightRect.top - pad,
              left: spotlightRect.left - pad,
              width: spotlightRect.width + pad * 2,
              height: spotlightRect.height + pad * 2,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <TourStep
          key={currentStep}
          content={steps[currentStep].content}
          stepIndex={currentStep}
          totalSteps={steps.length}
          position={tooltipPos}
          onNext={handleNext}
          onSkip={finish}
        />
      </AnimatePresence>
    </>
  );
}
