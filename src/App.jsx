import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import styles from './App.module.css';
import videoFeatured from '../media/moving-memory-1-muted.mp4';
import videoSecond from '../media/moving-memory-2-muted.mp4';
import videoThird from '../media/moving-memory-3-muted.mp4';
import photoArcade from '../media/IMG_4208.jpeg';
import photoSmile from '../media/IMG_3834.png';
import photoSoft from '../media/IMG_3899.jpeg';
import photoBlue from '../media/IMG_3814.jpeg';
import photoThroat from '../media/IMG_3836.png';
import photoBeautiful from '../media/IMG_3884.jpeg';
import photoMoods from '../media/IMG_3887.jpeg';
import photoFilm from '../media/IMG_3896.jpeg';
import photoSun from '../media/IMG_3898.jpeg';
import photoCute from '../media/IMG_3900.jpeg';
import photoSexy from '../media/IMG_3903.jpeg';
import photoLockedIn from '../media/IMG_4049.jpeg';
import photoCall from '../media/IMG_4117.png';
import backgroundMusic from '../media/music/Moavii - Silhouette (freetouse.com).mp3';

/* ─── usePageReady ────────────────────────────────────────────────────────────
 * Resolves true once the browser's window load event fires (all subresources
 * complete) or a graceful fallback timeout expires.  A critical image src can
 * be supplied; if so we additionally wait for its decode() promise so the hero
 * image never flashes in after the curtain lifts.
 * ──────────────────────────────────────────────────────────────────────────── */
function usePageReady({ criticalSrc, fallbackMs = 3000 } = {}) {
  const [ready, setReady] = useState(
    () => document.readyState === 'complete'
  );

  useEffect(() => {
    if (ready) return; // already ready on mount (fast repeat visits)

    let cancelled = false;

    const markReady = () => {
      if (!cancelled) setReady(true);
    };

    // Primary signal: window load
    const onLoad = () => {
      if (criticalSrc) {
        const img = new Image();
        img.src = criticalSrc;
        img.decode().then(markReady).catch(markReady); // decode() or fallback
      } else {
        markReady();
      }
    };

    window.addEventListener('load', onLoad, { once: true });

    // Safety net: never block for longer than fallbackMs
    const timer = setTimeout(markReady, fallbackMs);

    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ready;
}

const nameLetters = 'Ifedolapo'.split('');

const letterParagraphs = [
  'My dearest Ifedolapo,',
  "I've been sitting here trying to figure out how to start this, and honestly? I keep restarting because nothing feels big enough. So I'll just say it plainly, you are one of the most remarkable people I know.",
  "You have this warmth about you. The way you show up for others, the way you listen, the way you genuinely care, it's not fake, it's just who you are. People feel safe around you, and I think that's one of the most underrated things a person can be.",
  "And then there's the side of you that comes out when you're truly comfortable and I love that version of you. The unfiltered goofiness, the random urge to start throwing steps, the ability to turn the most ordinary moment into something memorable just by being present in it. You don't let everyone see that part of you, which makes it feel like a privilege every time I do. It's one of my favourite things about you.",
  "What grounds it all though is your character. You have a quiet but unshakeable sense of who you are and what you stand for. You don't compromise on the things that matter, and you carry your values not like rules you follow but like things you actually believe in. That kind of person is rare. At any age, but especially at twenty.",
  "I'm so proud of you, Ife. Not for a specific reason, just for being you, every day, without compromise.",
  'Happy birthday. Twenty suits you perfectly.',
  'Yours \u2014',
  'David \u2764\uFE0F',
];

const makePoster = (label) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
      <defs>
        <radialGradient id="moon" cx="48%" cy="42%" r="58%">
          <stop offset="0%" stop-color="#E2D4F7" stop-opacity="0.42"/>
          <stop offset="45%" stop-color="#8F6DCC" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#0D0A14"/>
        </radialGradient>
        <linearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C9B8E8" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#C8A96E" stop-opacity="0.18"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="#160F2A"/>
      <rect width="1200" height="675" fill="url(#moon)"/>
      <circle cx="210" cy="128" r="2.8" fill="#F5F0FF" opacity="0.78"/>
      <circle cx="940" cy="188" r="2.4" fill="#E2D4F7" opacity="0.72"/>
      <circle cx="760" cy="92" r="1.9" fill="#C9B8E8" opacity="0.86"/>
      <circle cx="1018" cy="432" r="2.1" fill="#F5F0FF" opacity="0.64"/>
      <rect x="36" y="36" width="1128" height="603" rx="42" fill="none" stroke="url(#edge)" stroke-width="2"/>
      <text x="600" y="320" text-anchor="middle" fill="#F5F0FF" font-family="Cormorant Garamond, serif" font-size="64" font-style="italic">${label}</text>
      <text x="600" y="374" text-anchor="middle" fill="#C9B8E8" font-family="DM Sans, sans-serif" font-size="18" letter-spacing="8">MEMORY</text>
    </svg>
  `)}`;

const videoPosters = {
  featured: makePoster('Moving Memory I'),
  second: makePoster('Moving Memory II'),
  third: makePoster('Moving Memory III'),
};

const photoSlides = [
  { image: photoArcade,    alt: 'Ifedolapo by the arcade lights',       caption: 'Main character energy' },
  { image: photoSmile,     alt: 'Ifedolapo smiling brightly',           caption: 'That smile should honestly come with a warning.' },
  { image: photoSoft,      alt: 'Black and white portrait of Ifedolapo', caption: 'Soft, calm, and completely unforgettable.' },
  { image: photoBlue,      alt: 'Ifedolapo in blue beside greenery',    caption: 'This picture feels so peaceful.' },
  { image: photoThroat,    alt: 'A playful call screenshot with Ifedolapo', caption: 'longest throat \u{1F602}' },
  { image: photoBeautiful, alt: 'Ifedolapo in a cap',                   caption: 'just straight up beautiful' },
  { image: photoMoods,     alt: 'A collage of Ifedolapo poses',         caption: 'Every frame is a different mood.' },
  { image: photoFilm,      alt: 'Film strip style portraits of Ifedolapo', caption: 'You make random pictures look intentional.' },
  { image: photoSun,       alt: 'Ifedolapo in sunlight',                caption: 'Sunlight did its thing here.' },
  { image: photoCute,      alt: 'Close-up portrait of Ifedolapo',       caption: 'This one is just really cute.' },
  { image: photoSexy,      alt: 'Ifedolapo in purple light',            caption: 'looking all sexy for no reasonnn' },
  { image: photoLockedIn,  alt: 'Ifedolapo holding study notes',        caption: 'Pretty and locked in.' },
  { image: photoCall,      alt: 'A video call screenshot with Ifedolapo', caption: 'Even a call with you feels like a memory.' },
];

const videoSlides = [
  { src: videoFeatured, poster: videoPosters.featured, label: 'Moving Memory I',   caption: 'This one makes me smile.' },
  { src: videoSecond,   poster: videoPosters.second,   label: 'Moving Memory II',  caption: 'Just one of those moments.', landscape: true },
  { src: videoThird,    poster: videoPosters.third,    label: 'Moving Memory III', caption: 'only God knows what you were trying to do here \u{1F602}' },
];

const sparkles = Array.from({ length: 38 }, (_, index) => ({
  left: `${(index * 29 + 11) % 100}%`,
  top: `${(index * 47 + 17) % 100}%`,
  delay: `${(index % 13) * 0.22}s`,
  duration: `${2.6 + (index % 7) * 0.38}s`,
  size: `${3 + (index % 5) * 1.4}px`,
  glow: index % 3 === 0 ? 'gold' : index % 3 === 1 ? 'lilac' : 'blush',
}));

const reveal = (shouldReduceMotion, delay = 0) => ({
  initial: shouldReduceMotion ? false : { opacity: 0, y: 46 },
  whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
});

const getPreviousIndex = (i, n) => (i - 1 + n) % n;
const getNextIndex    = (i, n) => (i + 1) % n;
const getWrappedIndex  = (i, n) => ((i % n) + n) % n;
const getRelativeIndex = (i, delta, n) => getWrappedIndex(i + delta, n);
const formatSlideNumber = (i) => String(i + 1).padStart(2, '0');

const photoStackOffsets = [-1, 0, 1];

/* â”€â”€â”€ Arrow SVG icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M11.5 3.5 6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M6.5 3.5 12 9l-5.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* â”€â”€â”€ Photo Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const PHOTO_INTERVAL = 7500; // ms between auto-advances


const appreciationReasons = [
  { icon: '\u2728', text: 'You turn the most ordinary moments into something I never want to forget.' },
  { icon: '\u{1F33B}', text: 'Your presence alone is enough to light up any room you walk into.' },
  { icon: '\u{1F98B}', text: 'You carry yourself with a grace that is both effortless and undeniable.' },
  { icon: '\u{1F90D}', text: 'You care so genuinely about the people in your life.' },
];

/* ─── LoadingScreen ───────────────────────────────────────────────────────────
 * Branded intro curtain shown until the page is fully ready.
 * Fades out smoothly via AnimatePresence; never flashes or jumps.
 * ──────────────────────────────────────────────────────────────────────────── */
function LoadingScreen() {
  return (
    <motion.div
      className={styles.loadingScreen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className={styles.loadingGlow} />

      {/* Brand block */}
      <motion.div
        className={styles.loadingContent}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <p className={styles.loadingEyebrow}>A birthday constellation for</p>
        <h1 className={styles.loadingTitle}>Ifedolapo</h1>
        <p className={styles.loadingTagline}>Twenty &amp; Timeless</p>
      </motion.div>

      {/* Progress line */}
      <motion.div
        className={styles.loadingBar}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.4, 0, 0.15, 1], delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}

function BirthdaySparkles() {
  return (
    <div className={styles.sparkleField} aria-hidden="true">
      {sparkles.map((sparkle, index) => (
        <span
          key={index}
          className={`${styles.sparkle} ${styles[`sparkle${sparkle.glow}`]}`}
          style={{
            '--left': sparkle.left,
            '--top': sparkle.top,
            '--delay': sparkle.delay,
            '--duration': sparkle.duration,
            '--size': sparkle.size,
          }}
        />
      ))}
    </div>
  );
}

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div
      className={styles.cursorGlow}
      style={{ left: mousePosition.x, top: mousePosition.y }}
    />
  );
}

function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;
    let isStarting = false;
    let hasStarted = false;
    const startEvents = [
      ['pointerdown', { passive: true }],
      ['keydown', {}],
      ['touchstart', { passive: true }],
      ['touchmove', { passive: true }],
      ['wheel', { passive: true }],
      ['scroll', { passive: true }],
    ];

    const removeStartListeners = () => {
      startEvents.forEach(([eventName]) => {
        window.removeEventListener(eventName, handleFirstInteraction);
      });
    };

    const startMusic = async () => {
      if (hasStarted || isStarting) return false;
      isStarting = true;
      try {
        await audio.play();
        hasStarted = true;
        removeStartListeners();
        return true;
      } catch {
        // Autoplay can still be blocked by the browser.
        return false;
      } finally {
        isStarting = false;
      }
    };

    const handleCanPlay = () => {
      void startMusic();
    };

    const handleFirstInteraction = () => {
      void startMusic();
    };

    audio.addEventListener('canplay', handleCanPlay, { once: true });
    void startMusic();

    startEvents.forEach(([eventName, options]) => {
      window.addEventListener(eventName, handleFirstInteraction, options);
    });

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      removeStartListeners();
    };
  }, []);

  return (
    <audio ref={audioRef} src={backgroundMusic} loop preload="auto" autoPlay />
  );
}

function PhotoProgressBar({ paused, onComplete, progressKey }) {
  return (
    <div className={styles.progressTrack} aria-hidden="true">
      <motion.div
        key={progressKey}
        className={styles.progressFill}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: paused ? undefined : 1 }}
        transition={{ duration: PHOTO_INTERVAL / 1000, ease: 'linear' }}
        onAnimationComplete={onComplete}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}



function App() {
  /* Gate hero animations until the page is fully loaded */
  const pageReady = usePageReady({ criticalSrc: photoSlides[0].image });

  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const moonY = useTransform(scrollY, [0, 500], [0, 50]);

  /* â”€â”€ Photo slideshow state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [photoDir, setPhotoDir] = useState(1); // 1 = forward, -1 = backward
  const [photoPaused, setPhotoPaused] = useState(false);
  const [photoProgressKey, setPhotoProgressKey] = useState(0);
  const [compactPhotoLayout, setCompactPhotoLayout] = useState(false);

  /* â”€â”€ Video slideshow state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videoDir, setVideoDir] = useState(1);
  const [compactVideoLayout, setCompactVideoLayout] = useState(false);
  const videoRef = useRef(null);

  /* â”€â”€ Thumbnail rail ref (for auto-scroll) â”€â”€ */
  const thumbnailRailRef = useRef(null);
  const thumbnailRefs   = useRef([]);

  /* â”€â”€ Touch / swipe tracking â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const photoTouchX = useRef(null);
  const videoTouchX = useRef(null);

  /* â”€â”€ Photo helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const goToPhoto = useCallback((index, dir = 1) => {
    setPhotoDir(dir);
    setActivePhotoIndex(index);
    setPhotoProgressKey((k) => k + 1);
  }, []);

  const photoPrev = useCallback(() => {
    goToPhoto(getPreviousIndex(activePhotoIndex, photoSlides.length), -1);
    setPhotoPaused(true);
    setTimeout(() => setPhotoPaused(false), 8000);
  }, [activePhotoIndex, goToPhoto]);

  const photoNext = useCallback(() => {
    goToPhoto(getNextIndex(activePhotoIndex, photoSlides.length), 1);
    setPhotoPaused(true);
    setTimeout(() => setPhotoPaused(false), 8000);
  }, [activePhotoIndex, goToPhoto]);

  /* â”€â”€ Photo auto-advance (progress bar drives timing) â”€â”€â”€â”€â”€ */
  const handlePhotoProgressComplete = useCallback(() => {
    if (!photoPaused) {
      goToPhoto(getNextIndex(activePhotoIndex, photoSlides.length), 1);
    }
  }, [photoPaused, activePhotoIndex, goToPhoto]);

  /* â”€â”€ Thumbnail auto-scroll â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  useEffect(() => {
    const thumb = thumbnailRefs.current[activePhotoIndex];
    const rail  = thumbnailRailRef.current;
    if (!thumb || !rail) return;
    const thumbLeft  = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;
    const railWidth  = rail.offsetWidth;
    const scrollTo   = thumbLeft - railWidth / 2 + thumbWidth / 2;
    rail.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, [activePhotoIndex]);

  /* â”€â”€ Keyboard navigation (arrow keys) â”€â”€â”€â”€â”€ */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { photoPrev(); }
      if (e.key === 'ArrowRight') { photoNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photoPrev, photoNext]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 560px)');

    const updateLayout = () => {
      setCompactPhotoLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 560px)');

    const updateLayout = () => {
      setCompactVideoLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  /* â”€â”€ Video helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const goToVideo = useCallback((index, dir = 1) => {
    setVideoDir(dir);
    setActiveVideoIndex(index);
  }, []);

  const videoPrev = useCallback(() => {
    goToVideo(getPreviousIndex(activeVideoIndex, videoSlides.length), -1);
  }, [activeVideoIndex, goToVideo]);

  const videoNext = useCallback(() => {
    goToVideo(getNextIndex(activeVideoIndex, videoSlides.length), 1);
  }, [activeVideoIndex, goToVideo]);

  /* â”€â”€ Video: advance when video ends â”€â”€â”€â”€â”€â”€ */
  const handleVideoEnded = useCallback(() => {
    goToVideo(getNextIndex(activeVideoIndex, videoSlides.length), 1);
  }, [activeVideoIndex, goToVideo]);

  /* â”€â”€ Video 3: skip last 4 seconds â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const handleVideoTimeUpdate = useCallback((e) => {
    if (activeVideoIndex !== 2) return;
    const video = e.currentTarget;
    if (video.duration && video.currentTime >= video.duration - 4) {
      goToVideo(getNextIndex(activeVideoIndex, videoSlides.length), 1);
    }
  }, [activeVideoIndex, goToVideo]);

  /* â”€â”€ Directional slide variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const photoSlideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * (compactPhotoLayout ? 32 : 48),
      scale: shouldReduceMotion ? 1 : (compactPhotoLayout ? 0.985 : 0.97),
      filter: shouldReduceMotion ? 'none' : 'blur(4px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * (compactPhotoLayout ? -32 : -48),
      scale: shouldReduceMotion ? 1 : (compactPhotoLayout ? 1.01 : 1.015),
      filter: shouldReduceMotion ? 'none' : 'blur(3px)',
      transition: { duration: 0.36, ease: [0.55, 0, 0.35, 1] },
    }),
  };

  const videoSlideVariants = {
    enter: (dir) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : dir * (compactVideoLayout ? 28 : 36),
      scale: shouldReduceMotion ? 1 : (compactVideoLayout ? 0.98 : 0.96),
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : dir * (compactVideoLayout ? -28 : -36),
      scale: shouldReduceMotion ? 1 : (compactVideoLayout ? 1.01 : 1.02),
      transition: { duration: 0.32, ease: [0.55, 0, 0.35, 1] },
    }),
  };

  const activePhoto = photoSlides[activePhotoIndex];
  const activeVideo = videoSlides[activeVideoIndex];

  /* â”€â”€ Swipe handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const onPhotoTouchStart = (e) => { photoTouchX.current = e.touches[0].clientX; };
  const onPhotoTouchEnd = (e) => {
    if (photoTouchX.current === null) return;
    const delta = photoTouchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 42) delta > 0 ? photoNext() : photoPrev();
    photoTouchX.current = null;
  };

  const onVideoTouchStart = (e) => { videoTouchX.current = e.touches[0].clientX; };
  const onVideoTouchEnd = (e) => {
    if (videoTouchX.current === null) return;
    const delta = videoTouchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 42) delta > 0 ? videoNext() : videoPrev();
    videoTouchX.current = null;
  };

  return (
    <>
      <AnimatePresence>
        {!pageReady && <LoadingScreen />}
      </AnimatePresence>
      <BirthdaySparkles />
      <CursorGlow />
      <BackgroundMusic />
      <main className={styles.app}>
      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <motion.div className={styles.heroMoon} aria-hidden="true" style={{ y: shouldReduceMotion ? 0 : moonY }} />
        <motion.div className={styles.heroInner} style={{ y: shouldReduceMotion ? 0 : heroY }}>
          <motion.p
            className={styles.eyebrow}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            A birthday constellation for
          </motion.p>

          <h1 id="hero-title" className={styles.heroTitle} aria-label="Ifedolapo">
            {nameLetters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 36, filter: 'blur(12px)' }}
                animate={pageReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 36, filter: 'blur(12px)' }}
                transition={{
                  duration: 0.72,
                  delay: shouldReduceMotion ? 0 : 0.38 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={pageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.85, delay: shouldReduceMotion ? 0 : 1.15, ease: 'easeOut' }}
          >
            Twenty &amp; Timeless
          </motion.p>

          <motion.p
            className={styles.heroCopy}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={pageReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: shouldReduceMotion ? 0 : 1.45 }}
          >
            A soft little universe for the warmth, wonder, and quiet magic you bring into every room.
          </motion.p>
        </motion.div>

        <a className={styles.scrollCue} href="#moments" aria-label="Scroll to Moments with You">
          <span>Scroll softly</span>
          <i aria-hidden="true" />
        </a>
      </section>

      {/* â”€â”€ PHOTO SLIDESHOW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.section
        id="moments"
        className={`${styles.section} ${styles.gallerySection}`}
        aria-labelledby="gallery-title"
        {...reveal(shouldReduceMotion)}
      >
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Thirteen pieces of light</p>
          <h2 id="gallery-title">Moments with You</h2>
          <p>
            Spaces for the smiles, softness, inside jokes, and tiny scenes that make knowing you feel like a gift.
          </p>
        </div>

        <div
          className={styles.slideshow}
          aria-label="Photo memories slideshow"
          onTouchStart={onPhotoTouchStart}
          onTouchEnd={onPhotoTouchEnd}
          onMouseEnter={() => setPhotoPaused(true)}
          onMouseLeave={() => setPhotoPaused(false)}
        >
          <motion.figure className={styles.photoCard} layout>
            {/* Progress bar */}
            {!shouldReduceMotion && (
              <PhotoProgressBar
                progressKey={photoProgressKey}
                paused={photoPaused}
                onComplete={handlePhotoProgressComplete}
              />
            )}

            <div className={styles.photoDeck} aria-label="Stacked photo deck">
              <AnimatePresence initial={false}>
                {photoStackOffsets.map((offset) => {
                  const index = getRelativeIndex(activePhotoIndex, offset, photoSlides.length);
                  const photo = photoSlides[index];
                  const isActive = offset === 0;

                  return (
                    <motion.figure
                      key={index}
                      className={`${styles.photoStackCard} ${
                        isActive ? styles.photoStackCardActive : styles.photoStackCardInactive
                      }`}
                      aria-current={isActive}
                      style={{ zIndex: 20 - Math.abs(offset) }}
                      initial={{ opacity: 0, scale: isActive ? 0.94 : 0.82, y: isActive ? 10 : 26 }}
                      animate={{
                        opacity: isActive ? 1 : 0.42,
                        x: offset * (compactPhotoLayout ? 34 : 56),
                        y: Math.abs(offset) * (compactPhotoLayout ? 4 : 10) + (isActive ? 0 : (compactPhotoLayout ? 6 : 12)),
                        scale: isActive ? 1 : (compactPhotoLayout ? 0.94 : 0.9),
                        rotate: offset * (compactPhotoLayout ? 3 : 4.25),
                        filter: isActive ? 'none' : 'blur(1.2px) saturate(0.86)',
                      }}
                      exit={{
                        opacity: 0,
                        x: offset * (compactPhotoLayout ? 44 : 74),
                        y: compactPhotoLayout ? 20 : 34,
                        scale: compactPhotoLayout ? 0.9 : 0.84,
                        rotate: offset * (compactPhotoLayout ? 3.4 : 5.2),
                      }}
                      transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.78 }}
                    >
                      <img
                        className={styles.photoImage}
                        src={photo.image}
                        alt={isActive ? photo.alt : ''}
                        aria-hidden={!isActive}
                        fetchpriority={isActive ? 'high' : 'auto'}
                        loading={isActive ? 'eager' : 'lazy'}
                      />
                      {isActive && (
                        <figcaption className={styles.photoStackCaption}>
                          <span>{photo.caption}</span>
                        </figcaption>
                      )}
                    </motion.figure>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.figure>

          {/* Controls */}
          <div className={styles.slideshowControls}>
            <button
              className={styles.slideButton}
              type="button"
              onClick={photoPrev}
              aria-label="Show previous photo"
            >
              <ArrowLeft />
              <span>Prev</span>
            </button>
            <span className={styles.slideCounter} aria-live="polite">
              {formatSlideNumber(activePhotoIndex)} / {formatSlideNumber(photoSlides.length - 1)}
            </span>
            <button
              className={styles.slideButton}
              type="button"
              onClick={photoNext}
              aria-label="Show next photo"
            >
              <span>Next</span>
              <ArrowRight />
            </button>
          </div>

          {/* Thumbnail rail */}
          <div
            ref={thumbnailRailRef}
            className={styles.thumbnailRail}
            aria-label="Choose a photo memory"
          >
            {photoSlides.map((photo, index) => (
              <button
                key={photo.caption}
                ref={(el) => { thumbnailRefs.current[index] = el; }}
                className={`${styles.thumbnailButton} ${
                  index === activePhotoIndex ? styles.thumbnailButtonActive : ''
                }`}
                type="button"
                onClick={() => {
                  const dir = index > activePhotoIndex ? 1 : -1;
                  goToPhoto(index, dir);
                  setPhotoPaused(true);
                  setTimeout(() => setPhotoPaused(false), 8000);
                }}
                aria-label={`Show photo ${index + 1}`}
                aria-current={index === activePhotoIndex}
              >
                <img src={photo.image} alt="" loading="lazy" width="80" height="80" />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* â”€â”€ VIDEO SLIDESHOW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.section
        className={`${styles.section} ${styles.videoSection}`}
        aria-labelledby="video-title"
        {...reveal(shouldReduceMotion)}
      >
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Little films, big feeling</p>
          <h2 id="video-title">Moving Memories</h2>
          <p>
            The parts that deserve motion: laughter caught mid-bloom, gestures too sweet to freeze, memories that keep breathing.
          </p>
        </div>

        <div
          className={`${styles.slideshow} ${styles.videoSlideshow}`}
          aria-label="Moving memories slideshow"
          onTouchStart={onVideoTouchStart}
          onTouchEnd={onVideoTouchEnd}
        >
          <div className={`${styles.slideStage} ${styles.videoStage} ${activeVideo.landscape ? styles.videoStageLandscape : ''}`}>
            <AnimatePresence mode="wait" custom={videoDir}>
              <motion.figure
                key={activeVideoIndex}
                className={styles.slideFigure}
                custom={videoDir}
                variants={videoSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <video
                  ref={videoRef}
                  key={activeVideo.src}
                  className={`${styles.videoPlayer} ${activeVideo.landscape ? styles.videoPlayerRotated : ''}`}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  poster={activeVideo.poster}
                  aria-label={activeVideo.label}
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleVideoTimeUpdate}
                >
                  <source src={activeVideo.src} />
                  Your browser does not support the video tag.
                </video>
                <figcaption className={styles.slideCaption}>
                  <span>{activeVideo.caption}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Arrow controls */}
          <div className={styles.slideshowControls}>
            <button
              className={styles.slideButton}
              type="button"
              onClick={videoPrev}
              aria-label="Show previous video"
            >
              <ArrowLeft />
              <span>Prev</span>
            </button>
            <span className={styles.slideCounter} aria-live="polite">
              {formatSlideNumber(activeVideoIndex)} / {formatSlideNumber(videoSlides.length - 1)}
            </span>
            <button
              className={styles.slideButton}
              type="button"
              onClick={videoNext}
              aria-label="Show next video"
            >
              <span>Next</span>
              <ArrowRight />
            </button>
          </div>

          {/* Video title navigator */}
          <nav className={styles.videoTitleNav} aria-label="Choose a video memory">
            {videoSlides.map((video, index) => (
              <button
                key={video.label}
                className={`${styles.videoTitleBtn} ${index === activeVideoIndex ? styles.videoTitleBtnActive : ''}`}
                type="button"
                onClick={() => goToVideo(index, index > activeVideoIndex ? 1 : -1)}
                aria-label={`Show ${video.label}`}
                aria-current={index === activeVideoIndex}
              >
                {video.label}
                {index === activeVideoIndex && (
                  <motion.span
                    layoutId="videoTitleUnderline"
                    className={styles.videoTitleUnderline}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </motion.section>

      {/* â”€â”€ REASONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.section
        className={`${styles.section}`}
        aria-labelledby="reasons-title"
        {...reveal(shouldReduceMotion)}
      >
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Just a few reasons why</p>
          <h2 id="reasons-title">I Appreciate You</h2>
        </div>
        <div className={styles.reasonsGrid}>
          {appreciationReasons.map((reason, idx) => (
            <motion.div
              key={idx}
              className={styles.reasonCard}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <span className={styles.reasonIcon}>{reason.icon}</span>
              <p className={styles.reasonText}>{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* â”€â”€ LETTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.section
        className={`${styles.section} ${styles.letterSection}`}
        aria-labelledby="letter-title"
        {...reveal(shouldReduceMotion)}
      >
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>The words beneath it all</p>
          <h2 id="letter-title">The Letter</h2>
        </div>

        <article className={styles.letterCard}>
          <motion.div
            className={styles.letterText}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              visible: { transition: { staggerChildren: 0.8 } }
            }}
          >
            {letterParagraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className={
                  index === 0
                    ? styles.salutation
                    : index === letterParagraphs.length - 1
                      ? styles.signature
                      : undefined
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </article>
      </motion.section>

      {/* â”€â”€ AGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.section
        className={`${styles.section} ${styles.ageSection}`}
        aria-labelledby="age-title"
        {...reveal(shouldReduceMotion)}
      >
        <p className={styles.eyebrow}>Two decades, one radiant soul</p>
        <h2 id="age-title">20 Years of You</h2>
        <div className={styles.ageNumber} aria-hidden="true">
          20
        </div>
        <p>
          Twenty looks like grace, conviction, sweetness, laughter, and the quiet courage of becoming more yourself.
        </p>
      </motion.section>

      {/* â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer className={styles.closing} aria-labelledby="closing-title">
        <motion.div
          className={styles.closingInner}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>With all the soft purple light</p>
          <h2 id="closing-title">Happy Birthday, Ife. Here's to forever.</h2>
          <p>
            May this year meet you gently, celebrate you loudly, and keep giving you reasons to smile when no one is watching.
          </p>
        </motion.div>
      </footer>
    </main>
    </>
  );
}

export default App;


