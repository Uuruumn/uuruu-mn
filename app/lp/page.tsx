'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  CreditCard,
  Globe,
  Handshake,
  Phone,
  Upload,
} from 'lucide-react';
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';

/* ── Variants ─────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

/* ── Magnetic button ─────────────────────────────────── */
const MotionLink = motion(Link);

function MagneticBtn({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionLink
      ref={ref}
      href={href}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </MotionLink>
  );
}

/* ── 3-D tilt card ───────────────────────────────────── */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 160, damping: 20 });
  const sry = useSpring(ry, { stiffness: 160, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    rx.set((py - 0.5) * -18);
    ry.set((px - 0.5) * 18);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.025 }}
      transition={{ scale: { duration: 0.3 } }}
    >
      <motion.div
        className="tiltGlow"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(380px circle at ${gx}% ${gy}%, rgba(250,204,21,0.28), transparent 55%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Infinite marquee strip ──────────────────────────── */
const CARDS = [
  {
    num: '01',
    icon: Handshake,
    title: 'Зуучлагчгүй',
    desc: 'Зуучлагчгүйгээр эзэмшигчтэй шууд холбогдоно.',
  },
  {
    num: '02',
    icon: Phone,
    title: 'Шууд холболт',
    desc: 'Худалдан авагч болон түрээслэгч тантай шууд холбогдоно.',
  },
  {
    num: '03',
    icon: Upload,
    title: 'Хялбар нийтлэх',
    desc: 'Хэдхэн минутанд зар оруулж, шууд нийтэлнэ.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'DAN баталгаажуулалт',
    desc: 'Эзэмшигчийн мэдээллийг DAN системээр шалгана.',
  },
  {
    num: '05',
    icon: CreditCard,
    title: 'Хялбар төлбөр',
    desc: 'QPay ашиглан төлбөрийг хурдан, аюулгүй хийж болно.',
  },
  {
    num: '06',
    icon: Globe,
    title: 'Өргөн хүрээ',
    desc: 'Хот, аймаг даяар илүү олон хүнд хүрнэ.',
  },
];

function InfiniteMarquee() {
  const doubled = [...CARDS, ...CARDS];

  return (
    <div className="marqueeOuter">
      <motion.div
        className="marqueeTrack"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((c, i) => {
          const Icon = c.icon;

          return (
            <TiltCard key={i} className="mCard">
              <div className="mTop">
                <span className="mNum">{c.num}</span>
                <Icon className="mIcon" />
              </div>

              <h3 className="mTitle">{c.title}</h3>
              <p className="mDesc">{c.desc}</p>
            </TiltCard>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Scroll progress bar ─────────────────────────────── */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return <motion.div className="progressBar" style={{ scaleX }} />;
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function LP() {
  const { scrollY } = useScroll();

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    resetScroll();
    window.addEventListener('pageshow', resetScroll);

    return () => {
      window.removeEventListener('pageshow', resetScroll);
    };
  }, []);

  const heroTextY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroImgY = useTransform(scrollY, [0, 600], [0, 60]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <main className="lpRoot">
      <ProgressBar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <motion.div className="heroBg" style={{ y: heroImgY }}>
          <Image
            src="/lp/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="heroImg"
          />
          <div className="heroShade" />
          <div className="heroNoise" />
        </motion.div>

        <motion.div
          className="heroInner"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div
            className="heroText"
            variants={staggerV}
            initial="hidden"
            animate="show"
          >
            <motion.p className="heroTag" variants={fadeUp}>
              ҮЛ ХӨДЛӨХ ХӨРӨНГИЙН ПЛАТФОРМ
            </motion.p>

            <motion.h1 variants={fadeUp}>
              <span className="heroLine">Зарах</span>
              <span className="heroLine">Түрээслэх</span>
              <span className="heroLine heroAccent">Зуучлагчгүй</span>
            </motion.h1>

            <motion.p className="heroLead" variants={fadeUp}>
              Зуучлагчгүй, илүү хялбар үл хөдлөх хөрөнгийн шийдэл
            </motion.p>

            <motion.div className="heroBtns" variants={fadeUp}>
              <MagneticBtn href="/post" className="btn primary">
                Зар оруулах
              </MagneticBtn>
              <MagneticBtn href="/listings" className="btn ghost">
                Зарууд үзэх
              </MagneticBtn>
            </motion.div>
          </motion.div>

          <motion.div
            className="phoneWrap"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/lp/mock.png"
                alt="uuruu.mn preview"
                width={520}
                height={760}
                priority
                className="phoneImg"
              />
            </motion.div>
            <div className="phoneGlow" />
          </motion.div>
        </motion.div>

        <motion.div
          className="scrollHint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ── BADGES ───────────────────────────────────────── */}
      <section className="stats">
        <motion.div
          className="statsInner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerV}
        >
          {[
            { icon: ShieldCheck, value: 'DAN', label: 'Баталгаажуулалт' },
            { icon: Zap, value: 'Хямд үнэ', label: '30 хоногийн турш' },
            { icon: CreditCard, value: 'QPay', label: 'Төлбөрийн систем' },
            { icon: Globe, value: 'Улс даяар', label: 'Хот, аймаг' },
          ].map((s, i) => {
            const Icon = s.icon;

            return (
              <motion.div key={i} variants={fadeUp} className="statItem">
                <Icon className="statIconSvg" />
                <span className="statNum">{s.value}</span>
                <span className="statLabel">{s.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── INTRO ────────────────────────────────────────── */}
      <section className="intro">
        <motion.div
          className="introInner"
          variants={staggerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p className="introLabel" variants={fadeUp}>
            Яагаад uuruu.mn?
          </motion.p>

          <motion.h2 className="introH2" variants={fadeUp}>
            Илүү ойлгомжтой.
            <br />
            Илүү найдвартай.
          </motion.h2>
        </motion.div>
      </section>

      {/* ── INFINITE CARDS ───────────────────────────────── */}
      <section className="cardsSection">
        <InfiniteMarquee />
      </section>

      {/* ── CONVERSION SECTION ───────────────────────────── */}
      <section className="conversion">
        <motion.div
          className="conversionInner"
          variants={staggerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="conversionLabel" variants={fadeUp}>
            ЗАР ОРУУЛАХАД ХЯЛБАР
          </motion.p>

          <motion.h2 className="conversionTitle" variants={fadeUp}>
            Өөрийн үл хөдлөх хөрөнгөө
            <br />
            зуучлагчгүйгээр нийтэл
          </motion.h2>

          <motion.p className="conversionText" variants={fadeUp}>
            Худалдан авагч болон түрээслэгч таны мэдээллийг шууд харж,
            тантай шууд холбогдоно.
          </motion.p>

          <motion.div className="conversionGrid" variants={fadeUp}>
            <div className="conversionItem">
              <strong>DAN</strong>
              <span>Баталгаажуулалт</span>
            </div>

            <div className="conversionItem">
              <strong>5 мин</strong>
              <span>Зар оруулах хугацаа</span>
            </div>

            <div className="conversionItem">
              <strong>30 хоног</strong>
              <span>Идэвхтэй харагдана</span>
            </div>
          </motion.div>

          <motion.div className="priceBox" variants={fadeUp}>
            <span>Зар нийтлэх үнэ</span>
            <strong>25,000₮ / 30 хоног</strong>
            <p>Энгийн, ойлгомжтой төлбөр. Нууц нэмэлт шимтгэлгүй.</p>
          </motion.div>

          <motion.div className="conversionBtns" variants={fadeUp}>
            <MagneticBtn href="/post" className="btn primary big">
              Зар оруулах
            </MagneticBtn>
            <MagneticBtn href="/listings" className="btn ghost">
              Зарууд үзэх
            </MagneticBtn>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ STYLES ════════════════════════════════════════ */}
      <style jsx global>{`
        /* ── Reset & Root ─────────────────────────────── */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .lpRoot {
          background: #050505;
          color: #fff;
          overflow-x: hidden;
          font-family: 'Geist', 'Inter', system-ui, sans-serif;
        }

        /* ── Progress bar ─────────────────────────────── */
        .progressBar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #facc15;
          transform-origin: left;
          z-index: 9999;
        }

        /* ── Hero ─────────────────────────────────────── */
        .hero {
          position: relative;
          min-height: calc(100vh - 76px);
          display: flex;
          align-items: center;
          overflow: hidden;
          margin-top: -1px;
        }

        .heroBg {
          position: absolute;
          inset: 0;
          z-index: 0;
          will-change: transform;
        }

        .heroImg {
          object-fit: cover;
        }

        .heroShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              105deg,
              rgba(0, 0, 0, 0.92) 0%,
              rgba(0, 0, 0, 0.65) 45%,
              rgba(0, 0, 0, 0.15) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.1) 0%,
              rgba(0, 0, 0, 0.88) 100%
            );
        }

        .heroNoise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .heroInner {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 80px 0;
          display: grid;
          grid-template-columns: 1fr 430px;
          gap: 60px;
          align-items: center;
        }

        .heroTag {
          color: #facc15;
          font-weight: 800;
          letter-spacing: 0.14em;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .heroText h1 {
          font-size: clamp(56px, 8.5vw, 118px);
          line-height: 0.87;
          letter-spacing: -0.085em;
          font-weight: 900;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .heroLine {
          display: block;
        }

        .heroAccent {
          color: #facc15;
        }

        .heroLead {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          line-height: 1.7;
          margin-top: 28px;
          max-width: 500px;
        }

        .heroBtns {
          display: flex;
          gap: 14px;
          margin-top: 36px;
          flex-wrap: wrap;
        }

        /* ── Buttons ──────────────────────────────────── */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 28px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 800;
          font-size: 1rem;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .btn.primary {
          background: #facc15;
          color: #050505;
          box-shadow: 0 20px 50px rgba(250, 204, 21, 0.3);
        }

        .btn.primary:hover {
          background: #fde047;
          box-shadow: 0 24px 60px rgba(250, 204, 21, 0.45);
        }

        .btn.ghost {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(14px);
        }

        .btn.ghost:hover {
          background: rgba(255, 255, 255, 0.18);
        }

        .btn.big {
          min-height: 64px;
          padding: 0 42px;
          font-size: 1.1rem;
        }

        /* ── Phone ────────────────────────────────────── */
        .phoneWrap {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          transform: translateX(72px);
        }

        .phoneGlow {
          position: absolute;
          right: -40px;
          width: 500px;
          height: 500px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(250, 204, 21, 0.22),
            transparent 62%
          );
          filter: blur(90px);
          z-index: -1;
          pointer-events: none;
        }

        .phoneImg {
          width: min(380px, 100%);
          height: auto;
          object-fit: contain;
          transform: rotate(7deg);
          filter:
            drop-shadow(0 80px 150px rgba(0, 0, 0, 0.75))
            drop-shadow(0 0 60px rgba(250, 204, 21, 0.22));
          transition: transform 0.35s ease;
        }

        .phoneImg:hover {
          transform: rotate(5deg) translateY(-12px);
        }

        /* ── Scroll hint ──────────────────────────────── */
        .scrollHint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          color: rgba(255, 255, 255, 0.35);
          font-size: 1.4rem;
        }

        /* ── Stats ────────────────────────────────────── */
        .stats {
          background: #0a0a0a;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3.5rem clamp(16px, 4vw, 48px);
        }

        .statsInner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        .statItem {
          text-align: center;
          padding: 1rem;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
        }

        .statItem:last-child {
          border-right: none;
        }

        .statIconSvg {
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto 10px;
  color: #ffffff;
  opacity: 0.9;
  stroke-width: 2.4;
}

        .statNum {
          display: block;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #facc15;
          line-height: 1;
        }

        .statLabel {
          display: block;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 6px;
          letter-spacing: 0.05em;
        }

        /* ── Intro ────────────────────────────────────── */
        .intro {
          background: #050505;
          padding: clamp(70px, 10vw, 120px) clamp(16px, 4vw, 48px)
            clamp(50px, 7vw, 80px);
        }

        .introInner {
          max-width: 1180px;
          margin: 0 auto;
        }

        .introLabel {
          color: #facc15;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.14em;
          margin-bottom: 20px;
        }

        .introH2 {
          font-size: clamp(48px, 8vw, 110px);
          line-height: 0.92;
          letter-spacing: -0.08em;
          font-weight: 900;
          color: #fff;
        }

        /* ── Cards (Marquee) ──────────────────────────── */
        .cardsSection {
          padding: 40px 0 100px;
          background:
            radial-gradient(
              circle at 20% 50%,
              rgba(250, 204, 21, 0.07),
              transparent 35%
            ),
            #050505;
          overflow: hidden;
        }

        .marqueeOuter {
          overflow: hidden;
        }

        .marqueeTrack {
          display: flex;
          gap: 20px;
          width: max-content;
        }

        .mCard {
          flex-shrink: 0;
          width: 340px;
          min-height: 230px;
          background:
            radial-gradient(
              circle at top left,
              rgba(250, 204, 21, 0.14),
              transparent 38%
            ),
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.08),
              rgba(255, 255, 255, 0.03)
            );
          border: 1px solid rgba(250, 204, 21, 0.16);
          border-radius: 30px;
          padding: 34px;
          cursor: default;
          position: relative;
          overflow: hidden;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.35);
          transition:
            border-color 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .mCard::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(250, 204, 21, 0.18),
            transparent 42%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .mCard:hover {
          border-color: rgba(250, 204, 21, 0.38);
          box-shadow:
            0 34px 100px rgba(250, 204, 21, 0.1),
            0 30px 90px rgba(0, 0, 0, 0.45);
        }

        .mCard:hover::before {
          opacity: 1;
        }

        .tiltGlow {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          pointer-events: none;
          z-index: 0;
        }

        .mTop {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .mNum {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: rgba(250, 204, 21, 0.12);
          color: #facc15;
          font-size: 13px;
          font-weight: 900;
          border: 1px solid rgba(250, 204, 21, 0.18);
        }

        .mIcon {
  width: 30px;
  height: 30px;
  color: #ffffff;
  opacity: 0.85;
  stroke-width: 2.2;
  transition: all 0.25s ease;
}

.mCard:hover .mIcon {
  color: #facc15;
  opacity: 1;
  transform: scale(1.18) rotate(-4deg);
  filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.45));
}

        .mTitle {
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #fff;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .mDesc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.58);
          position: relative;
          z-index: 1;
        }

        /* ── Conversion ────────────────────────────────── */
        .conversion {
          padding: clamp(70px, 9vw, 120px) clamp(16px, 4vw, 48px);
          background: #050505;
          color: #fff;
        }

        .conversionInner {
          width: min(980px, 100%);
          margin: 0 auto;
          text-align: center;
          padding: clamp(32px, 5vw, 70px);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background:
            radial-gradient(
              circle at top,
              rgba(250, 204, 21, 0.13),
              transparent 42%
            ),
            linear-gradient(145deg, #101010, #070707);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
        }

        .conversionLabel {
          color: #facc15;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.14em;
          margin-bottom: 18px;
        }

        .conversionTitle {
          font-size: clamp(36px, 6vw, 76px);
          line-height: 0.98;
          letter-spacing: -0.07em;
          font-weight: 900;
          margin: 0;
        }

        .conversionText {
          max-width: 620px;
          margin: 24px auto 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 1rem;
          line-height: 1.8;
        }

        .conversionGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 36px;
        }

        .conversionItem {
          padding: 22px 16px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .conversionItem strong {
          display: block;
          color: #facc15;
          font-size: 1.5rem;
          font-weight: 900;
        }

        .conversionItem span {
          display: block;
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.85rem;
        }

        .priceBox {
          margin: 34px auto 0;
          width: min(520px, 100%);
          padding: 24px;
          border-radius: 28px;
          background: #facc15;
          color: #050505;
          box-shadow: 0 24px 60px rgba(250, 204, 21, 0.26);
        }

        .priceBox span {
          display: block;
          font-size: 0.82rem;
          font-weight: 800;
          opacity: 0.7;
        }

        .priceBox strong {
          display: block;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1;
          margin-top: 8px;
          font-weight: 900;
          letter-spacing: -0.06em;
        }

        .priceBox p {
          margin: 12px 0 0;
          font-size: 0.9rem;
          opacity: 0.75;
        }

        .conversionBtns {
          margin-top: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .conversionBtns .btn {
          width: 220px;
          min-height: 64px;
          height: 64px;
          padding: 0 28px;
          font-size: 1.05rem;
        }

        /* ── Mobile ───────────────────────────────────── */
        @media (max-width: 900px) {
          .navLinks {
            display: none;
          }

          .heroInner {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 48px 0;
          }

          .heroBtns {
            justify-content: center;
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .phoneWrap {
            display: none;
          }

          .heroLead {
            margin: 20px auto 0;
          }

          .statsInner {
            grid-template-columns: repeat(2, 1fr);
          }

          .statItem:nth-child(2) {
            border-right: none;
          }

          .statItem:nth-child(3) {
            border-top: 1px solid rgba(255, 255, 255, 0.07);
          }

          .statItem:nth-child(4) {
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            border-right: none;
          }

          .mCard {
            width: 270px;
            min-height: 230px;
            padding: 28px;
          }

          .conversionGrid {
            grid-template-columns: 1fr;
          }

          .conversionBtns {
            flex-direction: column;
          }

          .conversionBtns .btn {
            width: 100%;
          }
        }

        /* ── Header safety override ───────────────────── */
        .site-header .btn {
          width: auto !important;
          min-height: 34px !important;
          height: 34px !important;
          padding: 0 12px !important;
          font-size: 0.82rem !important;
          line-height: 1 !important;
        }

        .site-header .mobile-menu-btn {
          width: 38px !important;
          height: 38px !important;
          min-height: 38px !important;
        }
      `}</style>
    </main>
  );
}
