import React, { useState } from 'react';

/** Local food photo used when a remote logo is missing or fails to load. */
const FALLBACK_IMAGE = '/assets/fastor-7.png';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  /** Local fallback; defaults to an existing food photo. */
  fallback?: string;
}

/**
 * Renders an <img> with the caller's exact classes (so layout is unchanged).
 * Treats missing / empty / "null" src as broken, and on a load error swaps the
 * src ONCE to the local fallback (guarded to prevent an onError loop).
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallback = FALLBACK_IMAGE,
  alt = '',
  ...rest
}) => {
  const [failed, setFailed] = useState(false);
  const isMissing = !src || src === 'null';
  const resolvedSrc = isMissing || failed ? fallback : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};
