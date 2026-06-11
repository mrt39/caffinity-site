import { useEffect } from 'react';

const PULSE_HALF_DURATION_MS = 3000;
const RING_ROTATION_DURATION_MS = 14000;
const CORE_SIZE = 660;
const FLAME_HOST_SIZE = Math.round(CORE_SIZE * (265 / 260));
const FLAME_CONTAINER_SIZE = FLAME_HOST_SIZE + 25;
const FLAME_RADIUS = FLAME_HOST_SIZE / 2;
const FLAME_CENTER = FLAME_CONTAINER_SIZE / 2;
const FLAME_POINT_COUNT = 36;
const FLAME_SEGMENT_COUNT = 6;
const FLAME_PATH_START_ANGLE_OFFSET = (-Math.PI / 2) + (Math.PI / FLAME_POINT_COUNT);
const FLAME_ORGANIC_SIN_VARIATION = 0.005;
const FLAME_ORGANIC_COS_VARIATION = 0.003;

const PEAK_PROFILE = {
  maxScale: 1.082,
  maxOpacity: 0.47,
  intensityStartThreshold: 0.56,
  intensityMidThreshold: 0.92,
  intensityEndThreshold: 1,
  intensityMidValue: 0.52,
  intensityMaxValue: 0.78,
  maxEdgeDistortion: 0.026,
  organicVariationScale: 1.2,
  organicSinFrequency: 8,
  organicCosFrequency: 12,
};

const FLAME_OFFSETS = [
  { duration: 1600, delay: 0 },
  { duration: 2400, delay: 200 },
  { duration: 2000, delay: 400 },
  { duration: 1400, delay: 600 },
  { duration: 2200, delay: 300 },
  { duration: 2600, delay: 500 },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, progress) {
  return start + ((end - start) * progress);
}

function easeInOutCubic(value) {
  if (value < 0.5) {
    return 4 * value * value * value;
  }

  return 1 - (Math.pow(-2 * value + 2, 3) / 2);
}

function pingPong(now, duration, delay) {
  const elapsed = Math.max(0, now - delay);
  const cycleDuration = duration * 2;
  const cyclePosition = elapsed % cycleDuration;
  const linearProgress = cyclePosition < duration
    ? cyclePosition / duration
    : 1 - ((cyclePosition - duration) / duration);

  return easeInOutCubic(linearProgress);
}

function interpolatePiecewise(value, inputRange, outputRange) {
  if (value <= inputRange[0]) {
    return outputRange[0];
  }

  if (value >= inputRange[inputRange.length - 1]) {
    return outputRange[outputRange.length - 1];
  }

  for (let index = 0; index < inputRange.length - 1; index += 1) {
    const inputStart = inputRange[index];
    const inputEnd = inputRange[index + 1];

    if (value >= inputStart && value <= inputEnd) {
      const localProgress = (value - inputStart) / (inputEnd - inputStart);
      return lerp(outputRange[index], outputRange[index + 1], localProgress);
    }
  }

  return outputRange[outputRange.length - 1];
}

function createClosedSplinePath(points) {
  if (points.length < 2) {
    return '';
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length; index += 1) {
    const previousPoint = points[(index - 1 + points.length) % points.length];
    const currentPoint = points[index];
    const nextPoint = points[(index + 1) % points.length];
    const pointAfterNext = points[(index + 2) % points.length];
    const controlPoint1X = currentPoint.x + ((nextPoint.x - previousPoint.x) / 6);
    const controlPoint1Y = currentPoint.y + ((nextPoint.y - previousPoint.y) / 6);
    const controlPoint2X = nextPoint.x - ((pointAfterNext.x - currentPoint.x) / 6);
    const controlPoint2Y = nextPoint.y - ((pointAfterNext.y - currentPoint.y) / 6);

    path += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${nextPoint.x} ${nextPoint.y}`;
  }

  return `${path} Z`;
}

function createFlameCirclePath(radius, flameOffsets, flameIntensity) {
  const points = [];

  for (let index = 0; index < FLAME_POINT_COUNT; index += 1) {
    const angle = ((index / FLAME_POINT_COUNT) * Math.PI * 2) + FLAME_PATH_START_ANGLE_OFFSET;
    const flameIndex = Math.floor((index / FLAME_POINT_COUNT) * FLAME_SEGMENT_COUNT);
    const flameOffset = flameOffsets[Math.min(flameIndex, FLAME_SEGMENT_COUNT - 1)] || 0;
    const flameAmount = lerp(0, PEAK_PROFILE.maxEdgeDistortion, flameOffset);
    const organicVariation = (
      (Math.sin(angle * PEAK_PROFILE.organicSinFrequency) * FLAME_ORGANIC_SIN_VARIATION)
      + (Math.cos(angle * PEAK_PROFILE.organicCosFrequency) * FLAME_ORGANIC_COS_VARIATION)
    ) * PEAK_PROFILE.organicVariationScale;
    const currentRadius = radius * (1 + ((flameAmount + organicVariation) * flameIntensity));
    const x = FLAME_CENTER + (Math.cos(angle) * currentRadius);
    const y = FLAME_CENTER + (Math.sin(angle) * currentRadius);

    points.push({ x, y });
  }

  return createClosedSplinePath(points);
}

export default function useCaffeineStatusAnimation({ auraRef, flamePathRef, ringRef }) {
  useEffect(() => {
    const startedAt = performance.now();
    let rafId = null;

    function renderFrame(timestamp) {
      const effectiveTime = timestamp - startedAt;
      const pulseValue = interpolatePiecewise(
        (effectiveTime % (PULSE_HALF_DURATION_MS * 2)) / (PULSE_HALF_DURATION_MS * 2),
        [0, 0.5, 1],
        [0, 1, 0],
      );
      const easedPulse = easeInOutCubic(pulseValue);
      const scale = lerp(1, PEAK_PROFILE.maxScale, easedPulse);
      const opacity = lerp(0, PEAK_PROFILE.maxOpacity, easedPulse);
      const flameIntensity = interpolatePiecewise(
        easedPulse,
        [
          PEAK_PROFILE.intensityStartThreshold,
          PEAK_PROFILE.intensityMidThreshold,
          PEAK_PROFILE.intensityEndThreshold,
        ],
        [0, PEAK_PROFILE.intensityMidValue, PEAK_PROFILE.intensityMaxValue],
      );
      const flameOffsets = FLAME_OFFSETS.map((config) => (
        pingPong(effectiveTime, config.duration, config.delay)
      ));
      const flamePathValue = createFlameCirclePath(FLAME_RADIUS * scale, flameOffsets, flameIntensity);
      const ringRotation = ((effectiveTime % RING_ROTATION_DURATION_MS) / RING_ROTATION_DURATION_MS) * 360;

      if (flamePathRef.current) {
        flamePathRef.current.setAttribute('d', flamePathValue);
        flamePathRef.current.setAttribute('opacity', String(clamp(opacity, 0, 1)));
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${ringRotation}deg)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate(-50%, -50%) scale(${lerp(0.98, 1.08, easedPulse)})`;
        auraRef.current.style.opacity = String(lerp(0.2, 0.38, easedPulse));
      }

      rafId = requestAnimationFrame(renderFrame);
    }

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [auraRef, flamePathRef, ringRef]);
}
