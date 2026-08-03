'use client';

import { useEffect, useState } from 'react';

const PREFIX = 'Hello, ';
const PHRASES = [
  "I'm Gervonte Fowler",
  'I build software that saves people time',
  'I build reliable financial systems',
  'I build AI systems people can trust',
];

const TYPE_DELAY_MS = 55;
const DELETE_DELAY_MS = 28;
const HOLD_DELAY_MS = 1800;

const HeroTypewriter = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(PHRASES[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCaretVisible, setIsCaretVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateReducedMotion = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);

    return () => {
      mediaQuery.removeEventListener('change', updateReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhraseIndex(0);
      setVisibleCharacterCount(PHRASES[0].length);
      setIsDeleting(false);
      return;
    }

    const phrase = PHRASES[phraseIndex];
    let delay = isDeleting ? DELETE_DELAY_MS : TYPE_DELAY_MS;

    if (!isDeleting && visibleCharacterCount === phrase.length) {
      delay = HOLD_DELAY_MS;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && visibleCharacterCount === phrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && visibleCharacterCount === 0) {
        setIsDeleting(false);
        setPhraseIndex(currentIndex => (currentIndex + 1) % PHRASES.length);
        return;
      }

      setVisibleCharacterCount(currentCount => currentCount + (isDeleting ? -1 : 1));
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isDeleting, phraseIndex, reducedMotion, visibleCharacterCount]);

  useEffect(() => {
    if (reducedMotion || isDeleting || visibleCharacterCount < PHRASES[phraseIndex].length) {
      setIsCaretVisible(true);
      return;
    }

    const intervalId = window.setInterval(() => {
      setIsCaretVisible(currentVisibility => !currentVisibility);
    }, 500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isDeleting, phraseIndex, reducedMotion, visibleCharacterCount]);

  const visiblePhrase = PHRASES[phraseIndex].slice(0, visibleCharacterCount);

  return (
    <span aria-label={`${PREFIX}${PHRASES[phraseIndex]}`}>
      <span aria-hidden="true">
        {PREFIX}
        {visiblePhrase}
        {!reducedMotion && (
          <span
            className="hero-typewriter-caret"
            style={{
              display: 'inline-block',
              marginLeft: '0.12em',
              opacity: isCaretVisible ? 0.85 : 0,
            }}
          >
            |
          </span>
        )}
      </span>
    </span>
  );
};

export default HeroTypewriter;
