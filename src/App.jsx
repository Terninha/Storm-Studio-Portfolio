import React from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';

import briefingImg from '../assets/briefing.png';
import conceitoImg from '../assets/conceito.png';
import execucaoImg from '../assets/execucao.png';
import entregaImg from '../assets/entrega.png';

// ─── Constants ──────────────────────────────────────────────────────────────────

const playfair = "'Playfair Display', serif";
const outfit = "'Outfit', sans-serif";

const spring = { type: "spring", stiffness: 100, damping: 20 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// ─── Utility Components ─────────────────────────────────────────────────────────

const SectionReveal = React.memo(({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
});

const PortfolioItem = React.memo(({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [2, -2]);
  const rotateY = useTransform(x, [-50, 50], [-2, 2]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={spring}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
});

const StaggerGrid = React.memo(({ children, className = '' }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
});

// ─── Instagram Post Mockups ─────────────────────────────────────────────────────

const MockupGastronomia = React.memo(() => (
  <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '1/1', backgroundColor: '#1C1410' }}>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 120 120" className="w-20 h-20 mb-6" fill="none">
        <ellipse cx="60" cy="60" rx="48" ry="48" stroke="#D4A853" strokeWidth="1" />
        <ellipse cx="60" cy="60" rx="32" ry="32" stroke="#D4A853" strokeWidth="0.5" />
        <circle cx="52" cy="52" r="6" fill="#D4A853" opacity="0.25" />
        <circle cx="68" cy="56" r="4" fill="#D4A853" opacity="0.2" />
        <circle cx="58" cy="68" r="3" fill="#D4A853" opacity="0.15" />
        <line x1="40" y1="82" x2="80" y2="82" stroke="#D4A853" strokeWidth="0.5" opacity="0.4" />
      </svg>
      <p style={{ fontFamily: playfair, color: '#D4A853' }} className="text-2xl italic text-center tracking-tight">
        Carta Noturna
      </p>
      <div className="w-8 h-px mt-3 mb-2" style={{ backgroundColor: '#D4A853', opacity: 0.4 }} />
      <p style={{ fontFamily: outfit, color: '#D4A853' }} className="text-[10px] uppercase tracking-[0.2em] opacity-60">
        Experiência Gastronômica
      </p>
    </div>
  </div>
));

const MockupModa = React.memo(() => (
  <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '1/1', backgroundColor: '#F0EDE8' }}>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <p style={{ fontFamily: outfit, color: '#1A1916' }} className="text-[10px] uppercase tracking-[0.25em] mb-6 opacity-50">
        Nova Coleção
      </p>
      <p style={{ fontFamily: playfair, color: '#1A1916' }} className="text-4xl md:text-5xl text-center tracking-tight leading-none">
        LINHA
        <br />
        CRUA
      </p>
      <div className="w-16 h-px mt-6" style={{ backgroundColor: '#1A1916' }} />
      <p style={{ fontFamily: outfit, color: '#1A1916' }} className="text-[9px] uppercase tracking-[0.3em] mt-4 opacity-40">
        Outono · Inverno
      </p>
    </div>
  </div>
));

const MockupFitness = React.memo(() => (
  <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #1A1916 50%, #C8390A 50%)' }}>
    <svg viewBox="0 0 100 100" className="absolute top-4 right-4 w-16 h-16" fill="none">
      <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="20" y1="0" x2="100" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <line x1="0" y1="20" x2="80" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <p style={{ fontFamily: playfair, color: '#FFFFFF' }} className="text-7xl font-bold leading-none">
        30
      </p>
      <p style={{ fontFamily: outfit, color: '#FFFFFF' }} className="text-sm uppercase tracking-[0.3em] mt-1">
        Dias
      </p>
      <div className="w-10 h-px bg-white mt-4 mb-3 opacity-30" />
      <p style={{ fontFamily: outfit, color: '#FFFFFF' }} className="text-[9px] uppercase tracking-[0.2em] opacity-60">
        Programa Intensivo
      </p>
    </div>
  </div>
));

const MockupTecnologia = React.memo(() => (
  <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '1/1', backgroundColor: '#0D1117' }}>
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(147,51,234,0.08) 100%)' }} />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 80 80" className="w-16 h-16 mb-6" fill="none">
        <rect x="20" y="20" width="40" height="40" stroke="#E8E8E8" strokeWidth="0.8" rx="2" />
        <rect x="28" y="28" width="24" height="24" stroke="#E8E8E8" strokeWidth="0.5" rx="1" opacity="0.6" />
        <circle cx="40" cy="40" r="6" stroke="#E8E8E8" strokeWidth="0.5" opacity="0.4" />
        <circle cx="40" cy="40" r="2" fill="#E8E8E8" opacity="0.3" />
      </svg>
      <p style={{ fontFamily: outfit, color: '#E8E8E8' }} className="text-2xl font-medium tracking-wide">
        NEXO
      </p>
      <p style={{ fontFamily: outfit, color: '#E8E8E8' }} className="text-[10px] tracking-[0.2em] mt-2 opacity-40">
        v2.0 · PLATAFORMA DIGITAL
      </p>
    </div>
  </div>
));

const MockupImobiliario = React.memo(() => (
  <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '1/1', backgroundColor: '#F5F3EE' }}>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 120 100" className="w-24 h-20 mb-6" fill="none">
        <rect x="15" y="30" width="30" height="60" stroke="#1A1916" strokeWidth="0.8" />
        <rect x="50" y="15" width="25" height="75" stroke="#1A1916" strokeWidth="0.8" />
        <rect x="80" y="40" width="25" height="50" stroke="#1A1916" strokeWidth="0.8" />
        <rect x="22" y="38" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="32" y="38" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="22" y="52" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="32" y="52" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="56" y="24" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="63" y="24" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="56" y="38" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="63" y="38" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="86" y="48" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <rect x="93" y="48" width="6" height="8" stroke="#1A1916" strokeWidth="0.4" opacity="0.5" />
        <line x1="10" y1="90" x2="110" y2="90" stroke="#1A1916" strokeWidth="0.5" />
      </svg>
      <p style={{ fontFamily: outfit, color: '#1A1916' }} className="text-[9px] uppercase tracking-[0.25em] opacity-50 mb-2">
        Novo Lançamento
      </p>
      <p style={{ fontFamily: playfair, color: '#1A1916' }} className="text-xl text-center tracking-tight">
        Horizonte
        <br />
        Vazio
      </p>
      <p style={{ fontFamily: outfit, color: '#1A1916' }} className="text-[9px] uppercase tracking-[0.2em] mt-3 opacity-40">
        A partir de R$ 485 mil
      </p>
    </div>
  </div>
));

const MockupBeleza = React.memo(() => (
  <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '1/1', backgroundColor: '#FDF8F5' }}>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 60 100" className="w-12 h-20 mb-5" fill="none">
        <rect x="18" y="10" width="24" height="8" rx="2" stroke="#C9897B" strokeWidth="0.8" />
        <rect x="22" y="4" width="16" height="6" rx="1" stroke="#C9897B" strokeWidth="0.6" />
        <path
          d="M18 18 C18 18, 12 28, 12 40 L12 85 C12 90, 18 95, 30 95 C42 95, 48 90, 48 85 L48 40 C48 28, 42 18, 42 18"
          stroke="#C9897B" strokeWidth="0.8" fill="none"
        />
        <ellipse cx="30" cy="60" rx="12" ry="4" stroke="#C9897B" strokeWidth="0.4" opacity="0.3" />
      </svg>
      <p style={{ fontFamily: playfair, color: '#1A1916' }} className="text-xl italic text-center tracking-tight">
        Pele Nua
      </p>
      <div className="w-6 h-px mt-3 mb-2" style={{ backgroundColor: '#C9897B' }} />
      <p style={{ fontFamily: outfit, color: '#C9897B' }} className="text-[9px] uppercase tracking-[0.2em]">
        Linha Facial · Sérum
      </p>
    </div>
  </div>
));

const MockupFeatured = React.memo(() => (
  <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '21/9', backgroundColor: '#1C1410' }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(212,168,83,0.08) 0%, transparent 60%)' }} />
    <div className="absolute inset-0 flex items-center px-8 md:px-16">
      <div className="flex-1 hidden md:flex justify-center">
        <svg viewBox="0 0 120 120" className="w-28 h-28 opacity-80" fill="none">
          <ellipse cx="60" cy="60" rx="48" ry="48" stroke="#D4A853" strokeWidth="0.8" />
          <ellipse cx="60" cy="60" rx="32" ry="32" stroke="#D4A853" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="6" fill="#D4A853" opacity="0.2" />
          <circle cx="70" cy="55" r="4" fill="#D4A853" opacity="0.15" />
          <circle cx="56" cy="70" r="3" fill="#D4A853" opacity="0.1" />
        </svg>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p style={{ fontFamily: playfair, color: '#D4A853' }} className="text-3xl md:text-5xl italic text-center tracking-tight leading-none">
          Carta
          <br />
          Noturna
        </p>
        <div className="w-12 h-px mt-5" style={{ backgroundColor: '#D4A853', opacity: 0.3 }} />
        <p style={{ fontFamily: outfit, color: '#D4A853' }} className="text-[10px] uppercase tracking-[0.2em] mt-3 opacity-50">
          Maré Alta · Inverno 2024
        </p>
      </div>
      <div className="flex-1 hidden md:flex justify-center">
        <svg viewBox="0 0 80 100" className="w-16 h-20 opacity-60" fill="none">
          <line x1="10" y1="15" x2="70" y2="15" stroke="#D4A853" strokeWidth="0.4" opacity="0.4" />
          <line x1="10" y1="30" x2="70" y2="30" stroke="#D4A853" strokeWidth="0.4" opacity="0.3" />
          <line x1="10" y1="45" x2="70" y2="45" stroke="#D4A853" strokeWidth="0.4" opacity="0.2" />
          <line x1="10" y1="60" x2="50" y2="60" stroke="#D4A853" strokeWidth="0.4" opacity="0.15" />
          <circle cx="60" cy="75" r="10" stroke="#D4A853" strokeWidth="0.4" opacity="0.2" />
        </svg>
      </div>
    </div>
  </div>
));

// ─── Data ───────────────────────────────────────────────────────────────────────

const works = [
  { num: '01', name: 'Carta Noturna', niche: 'GASTRONOMIA', Mockup: MockupGastronomia, span: 'lg:col-span-4' },
  { num: '02', name: 'Linha Crua', niche: 'MODA', Mockup: MockupModa, span: 'lg:col-span-2' },
  { num: '03', name: 'Corpo em Rito', niche: 'FITNESS', Mockup: MockupFitness, span: 'lg:col-span-3' },
  { num: '04', name: 'Nexo Digital', niche: 'TECNOLOGIA', Mockup: MockupTecnologia, span: 'lg:col-span-3' },
  { num: '05', name: 'Horizonte Vazio', niche: 'IMOBILIÁRIO', Mockup: MockupImobiliario, span: 'lg:col-span-2' },
  { num: '06', name: 'Pele Nua', niche: 'BELEZA', Mockup: MockupBeleza, span: 'lg:col-span-4' },
];

const clients = [
  { year: '2024', name: 'Maré Alta Gastronomia', result: 'IDENTIDADE VISUAL' },
  { year: '2023–24', name: 'Vitral Cosméticos', result: 'CONTEÚDO MENSAL' },
  { year: '2023', name: 'Solar Incorporadora', result: 'LANÇAMENTO DIGITAL' },
  { year: '2023', name: 'Mova Fitness Lab', result: 'CAMPANHA SAZONAL' },
  { year: '2022–23', name: 'Nodo Tecnologia', result: 'SOCIAL MEDIA' },
  { year: '2022', name: 'Café Origem Torra', result: 'REBRANDING' },
  { year: '2021–22', name: 'Ateliê Caramel', result: 'IDENTIDADE DIGITAL' },
];

const processSteps = [
  {
    num: '01', title: 'BRIEFING', offset: 'lg:mt-0',
    desc: 'Entendemos o universo da marca, seus códigos visuais e o público que ela busca alcançar.',
    img: briefingImg
  },
  {
    num: '02', title: 'CONCEITO', offset: 'lg:mt-16',
    desc: 'Definimos a direção criativa, paleta e linguagem visual que traduz a essência do negócio.',
    img: conceitoImg
  },
  {
    num: '03', title: 'EXECUÇÃO', offset: 'lg:mt-32',
    desc: 'Cada peça é construída com atenção ao detalhe tipográfico, composição e hierarquia.',
    img: execucaoImg
  },
  {
    num: '04', title: 'ENTREGA', offset: 'lg:mt-48',
    desc: 'Arquivos otimizados para feed e stories, com guia de aplicação e calendário editorial.',
    img: entregaImg
  },
];

const navLinks = [
  { label: 'TRABALHOS', href: '#trabalhos' },
  { label: 'PROCESSO', href: '#processo' },
  { label: 'CLIENTES', href: '#clientes' },
  { label: 'CONTATO', href: '#contato' },
];

// ─── Process Step Image ─────────────────────────────────────────────────────────

const ProcessImage = React.memo(({ src, alt }) => (
  <div className="w-full max-w-[200px] rounded-sm overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
    <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
  </div>
));

// ─── Main Application ───────────────────────────────────────────────────────────

function Portfolio() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@300;400;500&display=swap');html{scroll-behavior:smooth}";
    document.head.appendChild(style);
    return () => { if (style.parentNode) style.parentNode.removeChild(style); };
  }, []);

  return (
    <div style={{ backgroundColor: '#F7F5F0', color: '#1A1916' }}>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — HERO                                                      */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section className="relative min-h-[100dvh] flex flex-col" style={{ backgroundColor: '#F7F5F0' }}>
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 relative z-10">
          <span
            style={{ fontFamily: outfit }}
            className="text-sm uppercase tracking-[0.2em] text-[#1A1916]"
          >
            Storm Studio
          </span>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontFamily: outfit }}
                className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                  i === 0
                    ? 'text-[#8B1A2F] underline underline-offset-4 decoration-[#8B1A2F]'
                    : 'text-[#6B6860] hover:text-[#1A1916]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-[#1A1916]"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <List size={20} weight="bold" />
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center"
              style={{ backgroundColor: '#F7F5F0' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-6 right-8 p-2 text-[#1A1916]"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <X size={20} weight="bold" />
              </button>
              <div className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: outfit }}
                    className="text-sm uppercase tracking-[0.2em] text-[#1A1916]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              style={{
                fontFamily: playfair,
                fontSize: 'clamp(4rem, 10vw, 9rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.0,
                color: '#1A1916',
              }}
            >
              STORM{' '}
              <motion.span
                className="inline-block align-middle rounded-full overflow-hidden"
                style={{
                  width: 'clamp(60px, 8vw, 120px)',
                  height: 'clamp(60px, 8vw, 120px)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...spring, delay: 0.4 }}
              >
                <span
                  className="block w-full h-full relative"
                  style={{ background: 'linear-gradient(135deg, #1C1410, #2A1F18)' }}
                >
                  <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full" style={{ padding: '12%' }}>
                    <circle cx="30" cy="24" r="10" stroke="#D4A853" strokeWidth="0.8" fill="none" />
                    <circle cx="30" cy="24" r="4" stroke="#D4A853" strokeWidth="0.4" fill="none" opacity="0.5" />
                    <line x1="16" y1="40" x2="44" y2="40" stroke="#D4A853" strokeWidth="0.5" />
                    <text
                      x="30" y="50" textAnchor="middle" fill="#D4A853" fontSize="4.5"
                      style={{ fontFamily: 'serif' }}
                    >
                      menu
                    </text>
                  </svg>
                </span>
              </motion.span>
              <br />
              STUDIO
            </h1>
          </motion.div>

          <motion.p
            style={{ fontFamily: outfit }}
            className="text-xs uppercase tracking-[0.2em] text-[#6B6860] mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Posts para Instagram · 2026
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — TRABALHOS                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section id="trabalhos" className="py-32 md:py-48 px-8" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-[1320px] mx-auto">
          <SectionReveal>
            <p
              style={{ fontFamily: outfit }}
              className="text-xs uppercase tracking-[0.15em] text-[#6B6860] mb-16"
            >
              Trabalhos
            </p>
          </SectionReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {works.map((work) => (
              <motion.div
                key={work.num}
                variants={itemVariants}
                className={`md:col-span-1 ${work.span}`}
              >
                <PortfolioItem>
                  <work.Mockup />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        style={{ fontFamily: playfair }}
                        className="text-lg italic text-[#8B1A2F]"
                      >
                        {work.num}.
                      </span>
                      <span
                        style={{ fontFamily: playfair }}
                        className="text-xl italic text-[#1A1916]"
                      >
                        {work.name}
                      </span>
                    </div>
                    <span
                      style={{ fontFamily: outfit }}
                      className="text-xs uppercase tracking-[0.15em] text-[#6B6860] whitespace-nowrap hidden sm:inline"
                    >
                      {work.niche}
                    </span>
                  </div>
                </PortfolioItem>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — FILOSOFIA                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section className="py-32 md:py-48 px-8" style={{ backgroundColor: '#EFEDE7' }}>
        <div className="max-w-[1320px] mx-auto">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              <div className="lg:col-span-3">
                <MockupModa />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center">
                <p
                  style={{ fontFamily: outfit, lineHeight: 1.7, maxWidth: '65ch' }}
                  className="text-base text-[#1A1916]"
                >
                  Cada post é uma peça editorial. Não trabalhamos com templates prontos ou bancos de
                  imagem saturados. O processo começa pela identidade do negócio — seus códigos
                  visuais, sua tipografia, seu ritmo — e resulta em conteúdo que funciona como
                  vitrine permanente no feed. A diferença está nos detalhes que a maioria ignora: o
                  espaçamento entre letras, a proporção na composição, a paleta de cor que resiste à
                  fadiga visual do scroll infinito.
                </p>
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(26,25,22,0.1)' }}>
                  <p
                    style={{ fontFamily: outfit }}
                    className="text-xs uppercase tracking-[0.15em] text-[#6B6860]"
                  >
                    +47 marcas atendidas · desde março de 2021
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — CITAÇÃO                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section className="py-32 md:py-48 px-8" style={{ backgroundColor: '#EFEDE7' }}>
        <div className="max-w-[720px] mx-auto">
          <SectionReveal>
            <div className="flex flex-col items-center">
              <div
                className="w-2 h-2 rounded-full mb-12"
                style={{ backgroundColor: '#8B1A2F' }}
              />
              <blockquote
                style={{
                  fontFamily: playfair,
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  lineHeight: 1.3,
                  color: '#1A1916',
                }}
                className="text-center italic"
              >
                O conteúdo precede o design. Design sem conteúdo não é design — é decoração.
              </blockquote>
              <p
                style={{ fontFamily: outfit }}
                className="text-xs uppercase tracking-[0.2em] text-[#6B6860] mt-8 text-center"
              >
                — Jeffrey Zeldman
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — PROCESSO                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section id="processo" className="py-32 md:py-48 px-8" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-[1320px] mx-auto">
          <SectionReveal>
            <p
              style={{ fontFamily: outfit }}
              className="text-xs uppercase tracking-[0.15em] text-[#6B6860] mb-4"
            >
              Processo
            </p>
            <h2
              style={{ fontFamily: playfair }}
              className="text-4xl md:text-5xl text-[#1A1916] mb-16 md:mb-24"
            >
              O Fluxo Criativo
            </h2>
          </SectionReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className={`mt-0 ${step.offset}`}
              >
                <p
                  style={{ fontFamily: playfair }}
                  className="text-6xl italic text-[#8B1A2F] opacity-60 leading-none"
                >
                  {step.num}
                </p>
                <p
                  style={{ fontFamily: outfit }}
                  className="text-sm uppercase tracking-[0.15em] text-[#1A1916] mt-4 mb-4"
                >
                  {step.title}
                </p>
                <ProcessImage src={step.img} alt={step.title} />
                <p
                  style={{ fontFamily: outfit, lineHeight: 1.6 }}
                  className="text-sm text-[#6B6860]"
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — CLIENTES                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section id="clientes" className="py-32 md:py-48 px-8" style={{ backgroundColor: '#EFEDE7' }}>
        <div className="max-w-[1320px] mx-auto">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
              <div>
                <p
                  style={{ fontFamily: outfit }}
                  className="text-xs uppercase tracking-[0.15em] text-[#8B1A2F] mb-4"
                >
                  Clientes e Resultados
                </p>
                <h2
                  style={{ fontFamily: playfair }}
                  className="text-4xl italic text-[#1A1916]"
                >
                  Marcas que confiam
                  <br />
                  no nosso traço
                </h2>
              </div>
            </div>
          </SectionReveal>

          <StaggerGrid>
            {clients.map((client) => (
              <motion.div
                key={client.name}
                variants={itemVariants}
                className="flex items-center justify-between py-5"
                style={{ borderBottom: '1px solid rgba(26,25,22,0.1)' }}
              >
                <span
                  style={{ fontFamily: playfair }}
                  className="text-sm text-[#8B1A2F] w-20 shrink-0"
                >
                  {client.year}
                </span>
                <span
                  style={{ fontFamily: outfit }}
                  className="text-base text-[#1A1916] flex-1 px-4"
                >
                  {client.name}
                </span>
                <span
                  style={{ fontFamily: outfit }}
                  className="text-xs uppercase tracking-[0.15em] text-[#6B6860] whitespace-nowrap hidden sm:inline"
                >
                  {client.result}
                </span>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 7 — DESTAQUE                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section className="py-32 md:py-48 px-8" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-[1320px] mx-auto">
          <SectionReveal>
            <MockupFeatured />

            <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <h3
                  style={{
                    fontFamily: playfair,
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                    color: '#1A1916',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                  }}
                  className="uppercase"
                >
                  Carta Noturna
                </h3>
                <a
                  href="#"
                  style={{ fontFamily: outfit }}
                  className="inline-block mt-4 text-xs uppercase tracking-[0.15em] text-[#8B1A2F]"
                >
                  <span className="border-b-2 border-[#8B1A2F] pb-1">
                    Ver detalhes do projeto
                  </span>
                </a>
              </div>
              <div className="md:max-w-[400px] md:text-right">
                <p
                  style={{ fontFamily: outfit, lineHeight: 1.7 }}
                  className="text-sm text-[#6B6860]"
                >
                  Série de doze peças visuais para a temporada de inverno do restaurante Maré Alta.
                  Tipografia serifada sobre fotografia de baixa luminosidade, com paleta restrita a
                  tons de âmbar e carvão.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8 — CONTATO                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section id="contato" className="py-32 md:py-48 px-8" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-[1320px] mx-auto">
          <SectionReveal>
            <div className="flex flex-col items-center">
              <p
                style={{ fontFamily: outfit }}
                className="text-xs uppercase tracking-[0.2em] text-[#6B6860] text-center mb-8"
              >
                Orçamentos
              </p>
              <h2
                style={{
                  fontFamily: playfair,
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                  color: '#1A1916',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                }}
                className="text-center"
              >
                Vamos Criar
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-16 md:mt-24">
                <div className="text-center">
                  <p
                    style={{ fontFamily: outfit }}
                    className="text-xs uppercase tracking-[0.15em] text-[#8B1A2F] mb-3"
                  >
                    Escritório
                  </p>
                  <p style={{ fontFamily: outfit }} className="text-sm text-[#1A1916]">
                    Curitiba, PR
                  </p>
                  <p style={{ fontFamily: outfit }} className="text-sm text-[#6B6860] mt-1">
                    (42) 99809-7354
                  </p>
                  <p style={{ fontFamily: outfit }} className="text-sm text-[#6B6860] mt-1">
                    (42) 99816-1053
                  </p>
                </div>

                <div className="text-center">
                  <p
                    style={{ fontFamily: outfit }}
                    className="text-xs uppercase tracking-[0.15em] text-[#8B1A2F] mb-3"
                  >
                    Digital
                  </p>
                  <p style={{ fontFamily: outfit }} className="text-sm text-[#1A1916]">
                    gmconsultoriaswork@gmail.com
                  </p>
                  <p style={{ fontFamily: outfit }} className="text-sm text-[#6B6860] mt-1">
                    @stormstudio_br
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                                */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <footer
        className="px-8 py-6"
        style={{ borderTop: '1px solid rgba(26,25,22,0.1)', backgroundColor: '#F7F5F0' }}
      >
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: outfit }} className="text-xs text-[#6B6860]">
            © 2026 Storm Studio. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              style={{ fontFamily: outfit }}
              className="text-xs uppercase tracking-[0.15em] text-[#6B6860] hover:text-[#1A1916] transition-colors duration-300"
            >
              Instagram
            </a>
            <span className="text-[#6B6860] text-xs">·</span>
            <a
              href="#"
              style={{ fontFamily: outfit }}
              className="text-xs uppercase tracking-[0.15em] text-[#6B6860] hover:text-[#1A1916] transition-colors duration-300"
            >
              Portfólio
            </a>
            <span className="text-[#6B6860] text-xs">·</span>
            <a
              href="#"
              style={{ fontFamily: outfit }}
              className="text-xs uppercase tracking-[0.15em] text-[#6B6860] hover:text-[#1A1916] transition-colors duration-300"
            >
              Termos
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
