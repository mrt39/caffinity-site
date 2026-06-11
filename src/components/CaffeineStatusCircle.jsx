import { useRef } from 'react';
import useCaffeineStatusAnimation from './useCaffeineStatusAnimation';
import './CaffeineStatusCircle.css';

export default function CaffeineStatusCircle() {
  const ringRef = useRef(null);
  const flamePathRef = useRef(null);
  const auraRef = useRef(null);

  useCaffeineStatusAnimation({ auraRef, flamePathRef, ringRef });

  return (
    <div className="status-circle-stage" aria-label="Animated Caffinity caffeine status">
      <div className="status-circle-aura" ref={auraRef} />
      <div className="status-circle">
        <svg className="status-flame-layer" viewBox="0 0 698 698" aria-hidden="true">
          <path ref={flamePathRef} fill="#6B3410" />
        </svg>

        <div className="status-circle-core">
          <div className="status-circle-copy">
            <div className="status-caffeine-amount">200 mg</div>
            <div className="status-alertness-label">Peak alertness</div>
            <div className="status-tolerance-label">Moderate tolerance</div>
          </div>
        </div>

        <svg className="status-ring-layer" ref={ringRef} viewBox="0 0 660 660" aria-hidden="true">
          <defs>
            <linearGradient id="caffinityRingGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6B3410" stopOpacity="1" />
              <stop offset="25%" stopColor="#E4D4AC" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#6B3410" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#E4D4AC" stopOpacity="1" />
              <stop offset="100%" stopColor="#6B3410" stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx="330"
            cy="330"
            r="323"
            fill="none"
            stroke="url(#caffinityRingGradient)"
            strokeWidth="14"
          />
        </svg>
      </div>
    </div>
  );
}
