import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, MessageCircle, ChevronRight, Check, Globe, Code, Cpu,
  Lightbulb, Users, Rocket, ArrowRight, ChevronDown, ExternalLink,
  Linkedin, ArrowUpRight, Plus, Minus, Star, Zap, Shield, Clock,
  Layers, Smartphone, BarChart3
} from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/918441078510?text=Hi%20ATA%20Tech%20Hub,%20I'm%20interested%20in%20building%20a%20tech%20solution%20for%20my%20business.";

// ─── Shared UI Components (Zuperior-style) ───────────────────────────────────

const GradientButton = ({ href, children, variant = 'primary', external = true }: {
  href: string; children: ReactNode; variant?: 'primary' | 'outline'; external?: boolean;
}) => (
  <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
    <div className="relative rounded-full overflow-hidden p-[1px] w-fit group cursor-pointer">
      <div
        className="absolute inset-[-40px] z-[2] opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: 'conic-gradient(from 287deg at 45.6% 44.7%, rgba(0,0,0,0.07) 144deg, rgb(203,182,250) 178deg, rgba(0,0,0,0.36) 331deg)' }}
      />
      <div className={`relative z-[3] flex items-center gap-2.5 px-6 py-3 rounded-full font-medium text-[15px] tracking-tight transition-all ${
        variant === 'primary'
          ? 'bg-gradient-to-tr from-[#6242A5] to-[#9F8BCF] text-white/90'
          : 'bg-[#01040d] text-white/85'
      }`}>
        {children}
        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" strokeWidth={2.5} />
      </div>
    </div>
  </a>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center space-y-2.5 mb-12">
    <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-[52px] tracking-tighter text-gradient leading-[1.1]">
      {title}
    </h2>
    {subtitle && (
      <p className="font-sans font-medium text-base lg:text-lg tracking-tight text-white/50 max-w-xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

const GlowOrb = ({ className = '' }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="w-[500px] h-[500px] rounded-full bg-[#9F8BCF]/10 blur-[120px]" />
  </div>
);

// ─── Modal ───────────────────────────────────────────────────────────────────

const ConfirmationModal = ({ isOpen, onClose, onConfirm }: {
  isOpen: boolean; onClose: () => void; onConfirm: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0F0F23] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#9F8BCF]/20 purple-glow-sm"
        >
          <h3 className="text-2xl font-bold mb-4 text-gradient">Leaving Website?</h3>
          <p className="text-white/50 mb-8 leading-relaxed">Are you sure you want to leave the website?</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-3.5 rounded-full font-medium bg-white/5 hover:bg-white/10 transition-colors text-white/75 border border-white/10">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 py-3.5 rounded-full font-medium bg-gradient-to-tr from-[#6242A5] to-[#9F8BCF] text-white/90 hover:opacity-95 transition-opacity">
              Yes, Continue
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// ─── Navbar (Zuperior pill nav) ─────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-4 xl:px-[75px] py-4 xl:py-[15px]">
      <div className="w-full xl:rounded-full xl:glass-nav xl:px-8 xl:py-2 rounded-lg flex flex-col transition-all duration-300">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <img
              src="https://lh3.googleusercontent.com/d/1jm1YowbNOdo5KlWO77LFeFDiiuhplanE"
              alt="ATA Tech Hub"
              className="h-8 w-auto"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-logo font-semibold tracking-tight text-white">ATA <span class="text-[#9F8BCF]">Tech Hub</span></span>';
              }}
            />
          </a>

          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}
                className="py-2 px-4 text-[14px] font-semibold text-white/75 hover:text-white transition-colors tracking-tight">
                {link.name}
              </a>
            ))}
            <a href="#about" className="py-2 px-4 text-[14px] font-black text-[#9F8BCF] shimmer">Why ATA</a>
          </div>

          <div className="hidden xl:flex items-center gap-2">
            <GradientButton href={WHATSAPP_URL}>
              <MessageCircle size={16} />
              <span>Get Started</span>
            </GradientButton>
          </div>

          <button className="xl:hidden flex flex-col gap-1.5 p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : (
              <>
                <div className="bg-[#999] h-[3px] w-5 rounded-full" />
                <div className="bg-[#999] h-[3px] w-4 rounded-full" />
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="xl:hidden overflow-hidden mt-4">
              <div className="flex flex-col gap-3 pb-2">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                    className="text-white/75 hover:text-white py-2 font-semibold text-sm">{link.name}</a>
                ))}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="bg-gradient-to-tr from-[#6242A5] to-[#9F8BCF] text-white py-3 rounded-full text-center font-medium flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// ─── Hero (Zuperior full-screen hero) ─────────────────────────────────────────

const Hero = () => (
  <section className="relative w-full min-h-screen overflow-hidden flex items-start pt-[120px] lg:pt-[170px] px-6 lg:px-[80px]">
    <div className="absolute inset-0 -z-20 bg-black" />
    <div className="absolute inset-0 -z-10"
      style={{ background: 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 100%)' }} />
    <GlowOrb className="top-1/4 right-0 -translate-y-1/2" />
    <GlowOrb className="bottom-0 left-1/4 opacity-50" />

    {/* Decorative grid pattern */}
    <div className="absolute inset-0 -z-10 opacity-[0.03]"
      style={{ backgroundImage: 'radial-gradient(circle, #9F8BCF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <div className="relative z-10 w-full flex flex-col lg:items-start items-center lg:text-left text-center gap-5 max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-[32px] md:text-[49px] font-medium font-display tracking-tighter leading-[1.1] text-gradient">
        Think Growth
      </motion.h2>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="text-[44px] lg:-mt-4 md:text-[80px] lg:text-[92px] font-semibold font-heading tracking-tighter leading-[1.1] text-[#9F8BCF]">
        Build ATA
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        className="md:text-lg text-base leading-[26px] font-semibold text-white/60 max-w-[532px] tracking-tight">
        Websites, software & custom solutions built for real business growth. We handle the tech, you scale the business.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mt-2">
        <GradientButton href={WHATSAPP_URL}>
          <MessageCircle size={16} />
          <span>Start Your Project</span>
        </GradientButton>
        <a href="#work" className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#9F8BCF]/25 text-white/75 hover:text-white hover:border-[#9F8BCF]/50 transition-all font-medium text-[15px]">
          View Our Work <ChevronRight size={16} />
        </a>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-8 flex items-center gap-4 text-sm text-white/40 font-medium">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-[#513D80]/40 overflow-hidden">
              <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <span>Trusted by 20+ businesses globally</span>
      </motion.div>
    </div>
  </section>
);

// ─── Social Proof Marquee ─────────────────────────────────────────────────────

const SocialProof = ({ onClientClick }: { onClientClick: (url: string) => void }) => {
  const brands = [
    { name: 'Zuperior', url: 'https://zuperior.com' },
    { name: 'Fastio', url: 'https://fastio.in' },
    { name: 'Shikha Tripathi', url: 'https://shikha-tripathi.vercel.app' },
    { name: 'Viacation', url: 'https://viacation.com' },
    { name: 'Travel Deals Online', url: 'https://dev.traveldealsonline.com/' },
  ];

  return (
    <section className="py-12 border-y border-[#9F8BCF]/10 overflow-hidden bg-black/50">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-white/25 mb-6">Helping brands scale</p>
      <div className="flex overflow-hidden">
        <motion.div animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex space-x-16 whitespace-nowrap px-6">
          {[...brands, ...brands].map((brand, i) => (
            <button key={i} onClick={() => onClientClick(brand.url)}
              className="text-2xl md:text-3xl font-heading font-semibold text-white/15 hover:text-[#9F8BCF] transition-colors cursor-pointer">
              {brand.name}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Pricing Comparison (Zuperior account cards) ──────────────────────────────

const PricingComparison = () => {
  const features = ['Timeline', 'Scope', 'Revisions', 'Support', 'Code Ownership', 'Post-Launch', 'Team Access', 'Delivery'];
  const mvp = ['2–4 weeks', 'Landing page / MVP', '3 rounds', '30 days', '100% yours', '1 month free', 'Direct founders', 'Weekly updates'];
  const full = ['6–12 weeks', 'Full product build', 'Unlimited', '90 days', '100% yours', '3 months free', 'Dedicated team', 'Daily standups'];

  return (
    <section className="relative flex flex-col items-center gap-12 w-full py-16 lg:py-24 lg:px-[100px] md:px-12 px-4 bg-radial-purple">
      <GlowOrb className="top-0 left-1/2 -translate-x-1/2" />
      <SectionTitle title="Choose your build plan" subtitle="Designed for startups and growing businesses alike" />

      <div className="flex justify-center items-start md:flex-row flex-col gap-[5px] relative z-10">
        {/* Feature labels column */}
        <div className="hidden lg:flex flex-col px-[50px] pt-[60px] gap-[15px] items-start bg-black border border-[#222] text-sm font-medium tracking-tight text-white/75">
          {features.map((f, i) => (
            <div key={i} className="w-full">
              {f}
              {i < features.length - 1 && <div className="w-full h-px mt-[15px] bg-gradient-to-r from-black via-[#736496] to-black opacity-40" />}
            </div>
          ))}
        </div>

        {/* MVP Card (Recommended) */}
        <div className="relative px-[25px] pb-[25px] pt-[35px] flex flex-col gap-3.5 rounded-[15px] bg-[#513D80] purple-glow-sm">
          <p className="absolute top-2.5 left-1/2 -translate-x-1/2 text-white/75 font-medium text-[15px]">Recommended</p>
          <div className="space-y-2.5 w-full">
            <div className="p-[15px] flex items-center justify-center gap-2.5 bg-black rounded-sm">
              <Star size={20} className="text-[#CFBAFF]" fill="#CFBAFF" />
              <p className="text-gradient-purple text-xl tracking-tight font-medium">MVP Launch</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[68px] font-semibold tracking-tight leading-none text-gradient-purple">Fast</span>
              <span className="text-white/50 text-sm mt-1">Get to market quickly</span>
            </div>
          </div>
          <div className="pb-2.5 space-y-[15px] text-white/90 text-center font-medium text-sm w-72">
            {mvp.map((v, i) => (
              <div key={i}>
                <div className="divider-purple opacity-60" />
                <p className="py-1">{v}</p>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="relative overflow-hidden p-[1.5px] w-full rounded-full mt-2 block">
            <div className="py-3.5 w-full flex items-center justify-center rounded-full text-base tracking-tight font-medium uppercase text-white/85 bg-black hover:opacity-95 transition-opacity border border-[#9F8BCF]/20">
              Start MVP
            </div>
          </a>
        </div>

        {/* Full Build Card */}
        <div className="relative px-[25px] pb-[25px] pt-[35px] flex flex-col gap-3.5 rounded-[15px] border-2 border-[#9F8BCF]/10">
          <div className="space-y-2.5 w-full">
            <div className="p-[15px] flex items-center justify-center gap-2.5 bg-[#9F8ACF]/25 rounded-sm">
              <Zap size={20} className="text-[#CFBAFF]" />
              <p className="text-gradient-purple text-xl tracking-tight font-medium">Full Build</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[68px] font-semibold tracking-tight leading-none text-gradient-purple">Scale</span>
              <span className="text-white/50 text-sm mt-1">Production-ready product</span>
            </div>
          </div>
          <div className="pb-2.5 space-y-[15px] text-white/90 text-center font-medium text-sm w-72">
            {full.map((v, i) => (
              <div key={i}>
                <div className="divider-purple opacity-40" />
                <p className="py-1">{v}</p>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="py-3.5 w-full flex items-center justify-center rounded-full text-base tracking-tight font-medium uppercase text-white/85 bg-gradient-to-r from-[#6242A5] to-[#9F8BCF] hover:opacity-95 transition-opacity mt-2">
            Build Full Product
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Services Bento Grid (Zuperior feature cards) ─────────────────────────────

const Services = () => {
  const services = [
    { icon: Globe, title: 'Website Development', desc: 'High-conversion landing pages, e-commerce & SEO-optimized architecture', large: true },
    { icon: Code, title: 'Software Development', desc: 'Custom SaaS platforms, internal tools & scalable backends' },
    { icon: Smartphone, title: 'App Development', desc: 'Native & cross-platform iOS & Android solutions' },
    { icon: Cpu, title: 'AI Integrations', desc: 'Custom AI agents, LLM implementations & automation' },
    { icon: Shield, title: 'Secure Solutions', desc: 'Enterprise-grade security & compliance built in' },
    { icon: BarChart3, title: 'Product Consulting', desc: 'Tech roadmap strategy, MVP definition & audits' },
  ];

  return (
    <section id="services" className="relative w-full lg:p-[100px] md:p-10 px-4 py-16 overflow-hidden">
      <GlowOrb className="top-0 right-0" />
      <SectionTitle title="ATA Tech Hub Portal" subtitle="One ecosystem, infinite building power" />

      <div className="relative z-10 mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1fr_1fr_280px_1fr_1fr] gap-2.5">
        {/* Large hero card */}
        <motion.div whileHover={{ scale: 1.01 }}
          className="group relative lg:col-span-2 row-span-2 pt-5 pl-7 h-[420px] rounded-2xl overflow-hidden bg-conic-hero-card">
          <div className="relative z-10 flex flex-col h-full p-6">
            <Globe size={40} className="text-[#9F8BCF] mb-4" />
            <h3 className="lg:text-[28px] text-[22px] leading-[1.3] tracking-tight font-semibold text-white">
              {services[0].title}
            </h3>
            <p className="text-white/50 lg:text-lg text-base font-medium mt-3 max-w-[300px]">{services[0].desc}</p>
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-tl from-[#9F8BCF]/30 to-transparent rounded-tl-full" />
          </div>
        </motion.div>

        {/* Medium cards */}
        {services.slice(1, 4).map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }}
            className={`group rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative transition-all duration-500 h-[200px] bg-conic-card ${
              i === 0 ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-2'
            }`}>
            <div className="z-10">
              <s.icon size={28} className="text-[#9F8BCF] mb-3" />
              <h3 className="lg:text-[22px] text-[18px] font-semibold tracking-tight text-white">{s.title}</h3>
              <p className="text-white/50 text-sm font-medium mt-2 max-w-[250px]">{s.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* Bottom row */}
        <div className="lg:col-span-5 md:col-span-3 grid lg:grid-cols-2 grid-cols-1 gap-2.5">
          {services.slice(4).map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }}
              className="group rounded-2xl p-6 flex items-center justify-between overflow-hidden relative h-[181px] bg-conic-card">
              <div className="z-10 max-w-[300px]">
                <s.icon size={28} className="text-[#9F8BCF] mb-3" />
                <h3 className="lg:text-[22px] text-[18px] font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="text-white/50 text-sm font-medium mt-2">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Portfolio ────────────────────────────────────────────────────────────────

const Portfolio = ({ onClientClick }: { onClientClick: (url: string) => void }) => {
  const projects = [
    { name: 'Zuperior', url: 'https://zuperior.com', image: 'https://www.zuperior.com/_next/image?url=%2Fhome%2Fwhy%20traders%2Fnegative%20balance%20protection.png&w=1200&q=75' },
    { name: 'Fastio', url: 'https://fastio.in', image: 'https://www.fastio.in/assets/fastiologo1-B3jkDBne.svg' },
    { name: 'Shikha Tripathi', url: 'https://shikha-tripathi.vercel.app/', image: 'https://lh3.googleusercontent.com/d/1M469rJ_bx_cEZMLRwS6Tgfy3yVebSTdr' },
    { name: 'Viacation', url: 'https://viacation.com', image: 'https://www.viacation.com/_next/image?url=%2Fviacation-logo-light.png&w=320&q=75' },
    { name: 'Travel Deals Online', url: 'https://dev.traveldealsonline.com/', image: 'https://dev.traveldealsonline.com/login/images/back1.jpeg' },
  ];

  return (
    <section id="work" className="lg:min-h-[60vh] p-8 lg:p-[100px] overflow-hidden relative w-full bg-radial-portal flex flex-col gap-8">
      <GlowOrb className="top-[100px] left-1/2 -translate-x-1/2" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-gradient font-display text-[36px] lg:text-[52px] font-medium leading-[1.3] tracking-tighter">Selected Work</h2>
          <p className="text-white/50 font-medium mt-3 max-w-xl">Real solutions for real businesses. No fluff, just results.</p>
        </div>
        <a href={WHATSAPP_URL} className="text-[#9F8BCF] font-bold flex items-center gap-2 hover:underline text-sm">
          Want something like this? <ArrowRight size={18} />
        </a>
      </div>

      <div className="flex overflow-hidden relative z-10">
        <motion.div animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap">
          {[...projects, ...projects].map((p, i) => (
            <div key={i} onClick={() => onClientClick(p.url)}
              className="group cursor-pointer w-[350px] md:w-[420px] shrink-0">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-conic-card border border-[#9F8BCF]/10 flex items-center justify-center p-6 group-hover:border-[#9F8BCF]/30 transition-colors">
                <img src={p.image} alt={p.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer" />
              </div>
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                <ExternalLink size={18} className="text-[#9F8BCF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Process Steps (Zuperior 3-step) ──────────────────────────────────────────

const Process = () => {
  const steps = [
    { num: '1', title: 'Share Your Vision', desc: 'Tell us about your business goals and what you want to build', icon: Lightbulb },
    { num: '2', title: 'We Build It', desc: 'Fast, iterative development with regular updates and feedback', icon: Layers },
    { num: '3', title: 'Launch & Scale', desc: 'Deploy a production-ready solution and grow with ongoing support', icon: Rocket },
    { num: '4', title: 'Ongoing Support', desc: 'Post-launch maintenance, scaling & feature additions', icon: Clock },
  ];

  return (
    <section id="process" className="w-full flex flex-col gap-12 lg:p-[100px] md:p-10 px-4 py-16 relative overflow-hidden">
      <GlowOrb className="bottom-0 right-0" />
      <SectionTitle title="3 simple steps to start your project" subtitle="From idea to launch in weeks, not months" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 max-w-[1200px] mx-auto w-full">
        {steps.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -5, scale: 1.02 }}
            className="group rounded-2xl p-6 bg-conic-card border border-[#9F8BCF]/10 hover:border-[#9F8BCF]/30 transition-all duration-300 purple-glow-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6242A5] to-[#9F8BCF] flex items-center justify-center font-bold text-white text-sm mb-4">
              {s.num}
            </div>
            <s.icon size={24} className="text-[#9F8BCF] mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── Why Traders Stay Ahead → Why Clients Choose ATA ──────────────────────────

const Trust = () => {
  const stats = [
    { label: 'Products built from scratch', icon: Rocket },
    { label: 'Startup experience', icon: Users },
    { label: 'Fast delivery', icon: Zap },
    { label: 'Business-first approach', icon: Lightbulb },
    { label: 'Direct founder access', icon: MessageCircle },
    { label: '100% code ownership', icon: Shield },
    { label: 'AI-ready solutions', icon: Cpu },
    { label: 'Post-launch support', icon: Clock },
  ];

  return (
    <section className="relative w-full lg:p-[100px] md:p-10 px-4 py-16 overflow-hidden">
      <SectionTitle title="Why our clients stay ahead" subtitle="Because ATA clients build with intelligence, not guesswork" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-[1000px] mx-auto relative z-10">
        {stats.map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }}
            className="rounded-2xl p-6 bg-conic-card border border-[#9F8BCF]/10 flex flex-col items-center text-center gap-3 hover:border-[#9F8BCF]/25 transition-colors">
            <s.icon size={24} className="text-[#9F8BCF]" />
            <p className="font-semibold text-sm text-white/80">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── Comparison (Why Choose Us) ───────────────────────────────────────────────

const Comparison = () => {
  const options = [
    { title: 'ATA Tech Hub', points: ['Product + Tech expertise', 'Fast delivery (weeks, not months)', 'Outcome-driven approach', 'Direct founder access'], highlight: true },
    { title: 'Freelancers', points: ['Hit or miss quality', 'Communication gaps', 'Hard to scale', 'Limited business context'], highlight: false },
    { title: 'Traditional Agencies', points: ['Expensive overheads', 'Slow processes', 'Junior devs on project', 'Complex contracts'], highlight: false },
  ];

  return (
    <section className="w-full flex flex-col gap-12 lg:p-[100px] md:p-10 px-4 py-16 bg-radial-purple relative overflow-hidden">
      <SectionTitle title="Why choose us?" subtitle="We bridge the gap between solo freelancers and bloated agencies" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1000px] mx-auto w-full relative z-10">
        {options.map((o, i) => (
          <div key={i} className={`rounded-2xl p-8 border transition-all ${
            o.highlight
              ? 'bg-[#513D80] border-[#9F8BCF]/30 purple-glow-sm'
              : 'bg-black/50 border-[#9F8BCF]/10'
          }`}>
            {o.highlight && <p className="text-[#9F8BCF] text-xs font-bold uppercase tracking-widest mb-4">Recommended</p>}
            <h3 className="text-2xl font-semibold mb-6 text-white">{o.title}</h3>
            <ul className="space-y-4">
              {o.points.map((p, j) => (
                <li key={j} className="flex items-start gap-3 text-sm">
                  {o.highlight
                    ? <Check size={18} className="text-[#CFBAFF] shrink-0 mt-0.5" />
                    : <X size={18} className="text-white/30 shrink-0 mt-0.5" />}
                  <span className="text-white/70">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Founders ─────────────────────────────────────────────────────────────────

const Founders = () => {
  const founders = [
    { name: 'Akshay Jain', role: 'Product + Strategy', linkedin: 'https://www.linkedin.com/in/akshay19/', bullets: ['Startup growth expert', 'Product strategy specialist', 'Business-first approach'] },
    { name: 'Tarun Charan', role: 'Tech + Execution', linkedin: 'https://www.linkedin.com/in/taruncharan/', bullets: ['Full-stack architect', 'Scalable systems expert', 'Fast delivery focus'] },
    { name: 'Prakhar Patni', role: 'Growth + Partnerships', linkedin: 'https://www.linkedin.com/in/prakhar-patni/', bullets: ['Business development lead', 'Client relationship expert', 'Revenue growth focus'] },
  ];

  return (
    <section id="about" className="w-full lg:p-[100px] md:p-10 px-4 py-16 relative overflow-hidden">
      <GlowOrb className="top-1/2 left-0 -translate-y-1/2" />
      <SectionTitle title="Connect with founders" subtitle="Product vision, technical excellence, and business growth — all in one team" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto relative z-10">
        {founders.map((f, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-conic-card border border-[#9F8BCF]/10 hover:border-[#9F8BCF]/25 transition-all group">
            <h3 className="text-2xl font-semibold text-white mb-1">{f.name}</h3>
            <p className="text-[#9F8BCF] font-bold mb-6 uppercase tracking-widest text-xs">{f.role}</p>
            <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
              className="w-full max-w-[260px] bg-[#0077b5] text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#006396] transition-all shadow-lg shadow-[#0077b5]/20 mb-8 group-hover:scale-[1.02]">
              <Linkedin size={22} /> Connect Now
            </a>
            <ul className="space-y-2">
              {f.bullets.map((b, j) => (
                <li key={j} className="text-white/50 text-sm flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9F8BCF]" />{b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── FAQ (Zuperior accordion) ─────────────────────────────────────────────────

const FAQ = () => {
  const faqs = [
    { q: 'How fast can you build a website?', a: 'We prioritize quality work with the fastest possible delivery. Our agile process ensures you get a production-ready solution without unnecessary delays.' },
    { q: 'Do you offer post-launch support?', a: 'Yes, we provide ongoing maintenance and scaling support to ensure your tech grows with your business.' },
    { q: 'Will I own the code?', a: 'Absolutely. You have 100% ownership of the code and all intellectual property we build for you.' },
    { q: 'How do we communicate?', a: 'We use WhatsApp for quick updates and weekly video calls for deep dives and strategy.' },
  ];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full lg:p-[100px] md:p-10 px-4 py-16 relative overflow-hidden">
      <GlowOrb className="top-0 right-1/4" />
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-gradient font-display text-[36px] lg:text-[52px] font-medium tracking-tighter mb-12">FAQ's</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i}
              className={`border rounded-xl overflow-hidden transition-colors ${
                openIndex === i ? 'border-[#9F8BCF]/30 bg-[#0F0F23]' : 'border-white/10 bg-black hover:border-[#9F8BCF]/20'
              }`}>
              <button className="w-full p-5 text-left flex justify-between items-center font-semibold text-white/90"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                {f.q}
                {openIndex === i ? <Minus size={20} className="text-[#9F8BCF] shrink-0" /> : <Plus size={20} className="text-white/40 shrink-0" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 text-white/50 leading-relaxed text-sm">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Final CTA ────────────────────────────────────────────────────────────────

const FinalCTA = () => (
  <section className="w-full flex flex-col items-center gap-8 lg:p-[100px] md:p-10 px-4 py-16 relative overflow-hidden">
    <div className="absolute inset-0 bg-radial-purple" />
    <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    <div className="relative z-10 text-center max-w-3xl">
      <h2 className="text-gradient font-display text-[36px] lg:text-[52px] font-medium tracking-tighter leading-[1.2] mb-6">
        Don't just imagine — build something that grows your business
      </h2>
      <p className="text-white/50 font-medium text-lg mb-10">Free consultation. Replies within 24 hours.</p>
      <div className="flex justify-center">
        <GradientButton href={WHATSAPP_URL}>
          <MessageCircle size={16} />
          <span>Chat on WhatsApp</span>
        </GradientButton>
      </div>
    </div>
  </section>
);

// ─── Footer (Zuperior multi-column) ───────────────────────────────────────────

const Footer = () => {
  const columns = [
    { title: 'Services', links: ['Website Development', 'Software Development', 'App Development', 'AI Integrations'] },
    { title: 'Company', links: ['About Us', 'Our Work', 'Process', 'Contact'] },
    { title: 'Connect', links: ['WhatsApp', 'LinkedIn', 'Email Us'] },
  ];

  return (
    <footer className="relative w-full bg-black border-t border-[#9F8BCF]/10 pt-16 pb-32 px-6 lg:px-[100px]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9F8BCF]/30 to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="font-logo font-bold text-white text-xl mb-4">
            ATA <span className="text-[#9F8BCF]">Tech Hub</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">Custom websites, software & scalable tech solutions built for real business growth.</p>
        </div>
        {columns.map((col, i) => (
          <div key={i}>
            <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="text-white/40 text-sm hover:text-[#9F8BCF] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
        <span>© 2026 ATA Tech Hub. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#9F8BCF] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#9F8BCF] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// ─── Sticky CTA & WhatsApp Popup ──────────────────────────────────────────────

const StickyCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      className="w-full bg-gradient-to-tr from-[#6242A5] to-[#9F8BCF] text-white py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 purple-glow-sm">
      <MessageCircle size={20} /> Chat on WhatsApp
    </a>
  </div>
);

const WhatsAppPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-24 right-6 z-[60] max-w-xs w-full">
        <div className="bg-[#0F0F23] rounded-2xl p-6 shadow-2xl border border-[#9F8BCF]/20 purple-glow-sm relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/20 hover:text-white/60 transition-colors">
            <X size={20} />
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#6242A5] to-[#9F8BCF] rounded-full flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Need Help?</h4>
              <p className="text-xs text-white/40">We're online now</p>
            </div>
          </div>
          <p className="text-sm text-white/50 mb-5 leading-relaxed">
            Have a project in mind? Let's discuss how we can help your business grow.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={onClose}
            className="w-full bg-gradient-to-tr from-[#6242A5] to-[#9F8BCF] text-white py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity">
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState('');
  const [whatsappPopupOpen, setWhatsappPopupOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setWhatsappPopupOpen(true), 25000);
    const initialTimeout = setTimeout(() => setWhatsappPopupOpen(true), 5000);
    return () => { clearInterval(interval); clearTimeout(initialTimeout); };
  }, []);

  const handleClientClick = (url: string) => {
    if (url === '#') return;
    setPendingUrl(url);
    setModalOpen(true);
  };

  const confirmRedirection = () => {
    window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    setModalOpen(false);
  };

  return (
    <div className="relative bg-void overflow-x-hidden">
      <ConfirmationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={confirmRedirection} />
      <Navbar />
      <Hero />
      <SocialProof onClientClick={handleClientClick} />
      <PricingComparison />
      <Services />
      <Portfolio onClientClick={handleClientClick} />
      <Process />
      <Trust />
      <Comparison />
      <Founders />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
      <WhatsAppPopup isOpen={whatsappPopupOpen} onClose={() => setWhatsappPopupOpen(false)} />
    </div>
  );
}
