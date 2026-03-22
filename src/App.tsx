import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, MessageCircle, ChevronRight, Check, Globe, Code, Cpu, Lightbulb, Users, Rocket, ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/918441078510?text=Hi%20ATA%20Tech%20Hub,%20I'm%20interested%20in%20building%20a%20tech%20solution%20for%20my%20business.";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, url }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, url: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-4">Leaving Website?</h3>
            <p className="text-black/60 mb-8 leading-relaxed">
              Are you sure you want to leave the website?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl font-bold bg-black/5 hover:bg-black/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="flex-1 py-4 rounded-2xl font-bold bg-whatsapp text-white hover:bg-whatsapp/90 transition-colors"
              >
                Yes, Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <img 
            src="https://lh3.googleusercontent.com/d/1jm1YowbNOdo5KlWO77LFeFDiiuhplanE" 
            alt="ATA Tech Hub Logo" 
            className="h-10 w-auto"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback if Drive link fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-bold tracking-tighter font-display">ATA <span class="text-whatsapp">Tech Hub</span></span>';
            }}
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-whatsapp transition-colors">
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-whatsapp transition-colors flex items-center gap-2"
          >
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-whatsapp/10 text-whatsapp text-xs font-bold uppercase tracking-wider mb-6">
            Tech for Growth
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Build, Launch & Scale Your Tech — <span className="text-whatsapp">Without Hiring a Team</span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 mb-10 max-w-xl leading-relaxed">
            Websites, software & custom solutions built for real business growth. We handle the tech, you scale the business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileTap={{ scale: 0.95 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 whatsapp-shadow"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#work"
              className="bg-black/5 text-primary px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-black/10 transition-colors"
            >
              View Work
              <ChevronRight size={20} />
            </motion.a>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-sm text-black/40 font-medium">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-black/10 flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <span>Trusted by 20+ businesses globally</span>
          </div>
        </motion.div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-whatsapp rounded-full blur-[120px]" />
      </div>
    </section>
  );
};

const SocialProof = ({ onClientClick }: { onClientClick: (url: string) => void }) => {
  const brands = [
    { name: 'Zuperior', url: 'https://zuperior.com' },
    { name: 'Fastio', url: 'https://fastio.in' },
    { name: 'Shikha Tripathi', url: 'https://shikha-tripathi.vercel.app' },
    { name: 'Viacation', url: 'https://viacation.com' },
    { name: 'Travel Deals Online', url: 'https://dev.traveldealsonline.com/' },
  ];

  return (
    <section className="py-12 bg-black/5 border-y border-black/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-black/30">Helping brands scale</p>
      </div>
      <div className="flex overflow-hidden group">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex space-x-12 whitespace-nowrap px-6"
        >
          {[...brands, ...brands].map((brand, i) => (
            <button 
              key={i} 
              onClick={() => onClientClick(brand.url)}
              className="text-2xl md:text-3xl font-display font-bold text-black/20 hover:text-whatsapp transition-colors cursor-pointer"
            >
              {brand.name}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Globe className="text-whatsapp" size={32} />,
      title: "Website Development",
      points: ["High-conversion landing pages", "E-commerce solutions", "SEO-optimized architecture"]
    },
    {
      icon: <Code className="text-whatsapp" size={32} />,
      title: "Software Development",
      points: ["Custom SaaS platforms", "Internal business tools", "Scalable backend systems"]
    },
    {
      icon: <Rocket className="text-whatsapp" size={32} />,
      title: "App Development",
      points: ["Native & Cross-platform apps", "iOS & Android solutions", "Seamless user experience"]
    },
    {
      icon: <Cpu className="text-whatsapp" size={32} />,
      title: "AI Integrations",
      points: ["Custom AI agents", "LLM implementations", "Data-driven automation"]
    },
    {
      icon: <Lightbulb className="text-whatsapp" size={32} />,
      title: "Custom Tech Solutions",
      points: ["API integrations", "Automation workflows", "Legacy system modernization"]
    },
    {
      icon: <Users className="text-whatsapp" size={32} />,
      title: "Product Consulting",
      points: ["Tech roadmap strategy", "MVP definition", "Scalability audits"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
          <p className="text-black/60 max-w-xl mx-auto">We don't just write code; we build tools that solve problems and drive revenue.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-black/5 border border-black/5 flex flex-col h-full"
            >
              <div className="mb-6">{s.icon}</div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <ul className="space-y-3 mt-auto">
                {s.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-black/60">
                    <Check size={16} className="text-whatsapp mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ onClientClick }: { onClientClick: (url: string) => void }) => {
  const projects = [
    {
      name: "Zuperior",
      url: "https://zuperior.com",
      image: "https://www.zuperior.com/_next/image?url=%2Fhome%2Fwhy%20traders%2Fnegative%20balance%20protection.png&w=1200&q=75"
    },
    {
      name: "Fastio",
      url: "https://fastio.in",
      image: "https://www.fastio.in/assets/fastiologo1-B3jkDBne.svg"
    },
    {
      name: "Shikha Tripathi",
      url: "https://shikha-tripathi.vercel.app/",
      image: "https://lh3.googleusercontent.com/d/1M469rJ_bx_cEZMLRwS6Tgfy3yVebSTdr"
    },
    {
      name: "Viacation",
      url: "https://viacation.com",
      image: "https://www.viacation.com/_next/image?url=%2Fviacation-logo-light.png&w=320&q=75"
    },
    {
      name: "Travel Deals Online",
      url: "https://dev.traveldealsonline.com/",
      image: "https://dev.traveldealsonline.com/login/images/back1.jpeg"
    }
  ];

  return (
    <section id="work" className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
            <p className="text-white/60 max-w-xl">Real solutions for real businesses. No fluff, just results.</p>
          </div>
          <a href={WHATSAPP_URL} className="text-whatsapp font-bold flex items-center gap-2 hover:underline">
            Want something like this? <ArrowRight size={20} />
          </a>
        </div>
      </div>

      <div className="flex overflow-hidden group">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex gap-8 whitespace-nowrap px-6"
        >
          {[...projects, ...projects].map((p, i) => (
            <div 
              key={i}
              onClick={() => onClientClick(p.url)}
              className="group cursor-pointer block w-[350px] md:w-[450px] shrink-0"
            >
              <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 bg-white/10 border border-white/5 flex items-center justify-center p-4">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-center px-2">
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <ExternalLink size={20} className="text-whatsapp opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Founders = () => {
  const founders = [
    {
      name: "Akshay Jain",
      role: "Product + Strategy",
      linkedin: "https://www.linkedin.com/in/akshay19/",
      image: "https://lh3.googleusercontent.com/d/1LI9TOaQr-be78ARQnTn-LyZb-lUjpMTT",
      bullets: ["Startup growth expert", "Product strategy specialist", "Business-first approach"]
    },
    {
      name: "Tarun Charan",
      role: "Tech + Execution",
      linkedin: "https://www.linkedin.com/in/taruncharan/",
      image: "https://lh3.googleusercontent.com/d/1RMNQHYu2hQwc-Fqg4PjZ3zqvC2uR_W3",
      bullets: ["Full-stack architect", "Scalable systems expert", "Fast delivery focus"]
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Founders</h2>
          <p className="text-black/60 max-w-xl mx-auto">The duo combining product vision with technical excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {founders.map((f, i) => (
            <motion.a 
              key={i} 
              href={f.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-black/5 group-hover:border-whatsapp transition-colors">
                <img src={f.image} alt={f.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                {f.name}
                <ArrowRight size={18} className="text-whatsapp opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-whatsapp font-bold mb-4 uppercase tracking-widest text-xs">{f.role}</p>
              <ul className="space-y-2">
                {f.bullets.map((b, j) => (
                  <li key={j} className="text-black/60 text-sm flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-whatsapp" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Understand", desc: "We dive deep into your business goals and user needs." },
    { title: "Define", desc: "We map out the exact tech requirements and roadmap." },
    { title: "Build", desc: "Fast, iterative development with regular updates." },
    { title: "Iterate", desc: "Refining based on feedback and real-world testing." },
    { title: "Launch", desc: "Deploying a scalable, production-ready solution." }
  ];

  return (
    <section id="process" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
          <p className="text-white/60 max-w-xl mx-auto">How we turn your ideas into scalable tech products.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-6 mb-12 last:mb-0 relative">
              {i !== steps.length - 1 && (
                <div className="absolute top-10 left-5 w-0.5 h-full bg-white/10" />
              )}
              <div className="w-10 h-10 rounded-full bg-whatsapp flex items-center justify-center font-bold shrink-0 z-10">
                {i + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-white/40">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  const stats = [
    { label: "Products built from scratch", icon: <Rocket size={24} /> },
    { label: "Startup experience", icon: <Users size={24} /> },
    { label: "Fast delivery", icon: <Cpu size={24} /> },
    { label: "Business-first approach", icon: <Lightbulb size={24} /> }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="p-8 rounded-3xl bg-black/5 flex flex-col items-center text-center">
              <div className="text-whatsapp mb-4">{s.icon}</div>
              <p className="font-bold text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const options = [
    {
      title: "ATA Tech Hub",
      points: ["Product + Tech expertise", "Fast delivery (weeks, not months)", "Outcome-driven approach", "Direct founder access"],
      highlight: true
    },
    {
      title: "Freelancers",
      points: ["Hit or miss quality", "Communication gaps", "Hard to scale", "Limited business context"],
      highlight: false
    },
    {
      title: "Traditional Agencies",
      points: ["Expensive overheads", "Slow processes", "Junior devs on project", "Complex contracts"],
      highlight: false
    }
  ];

  return (
    <section className="py-24 bg-black/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-black/60 max-w-xl mx-auto">We bridge the gap between solo freelancers and bloated agencies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((o, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-3xl border ${o.highlight ? 'bg-black text-white border-black' : 'bg-white border-black/5'}`}
            >
              <h3 className="text-2xl font-bold mb-6">{o.title}</h3>
              <ul className="space-y-4">
                {o.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    {o.highlight ? <Check size={18} className="text-whatsapp shrink-0" /> : <X size={18} className="text-red-500 shrink-0" />}
                    <span className={o.highlight ? 'text-white/80' : 'text-black/60'}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How fast can you build a website?", a: "We prioritize quality work with the fastest possible delivery. Our agile process ensures you get a production-ready solution without unnecessary delays." },
    { q: "Do you offer post-launch support?", a: "Yes, we provide ongoing maintenance and scaling support to ensure your tech grows with your business." },
    { q: "Will I own the code?", a: "Absolutely. You have 100% ownership of the code and all intellectual property we build for you." },
    { q: "How do we communicate?", a: "We use WhatsApp for quick updates and weekly video calls for deep dives and strategy." }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-black/5 rounded-2xl overflow-hidden">
              <button 
                className="w-full p-6 text-left flex justify-between items-center font-bold hover:bg-black/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                {f.q}
                <ChevronDown className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-black/60 leading-relaxed">
                      {f.a}
                    </div>
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

const FinalCTA = () => {
  return (
    <section className="py-24 bg-whatsapp text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
          Let’s build something that actually grows your business
        </h2>
        <p className="text-xl mb-12 text-white/80">Free consultation. Replies within 24 hours.</p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-whatsapp px-10 py-5 rounded-2xl font-bold text-xl shadow-xl"
        >
          <MessageCircle size={24} />
          Chat on WhatsApp
        </motion.a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-black text-white/40 text-sm border-t border-white/5 pb-32">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display font-bold text-white text-lg">
          ATA <span className="text-whatsapp">Tech Hub</span>
        </div>
        <div>© 2026 ATA Tech Hub. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
      <motion.a
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-whatsapp text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 whatsapp-shadow"
      >
        <MessageCircle size={22} />
        Chat on WhatsApp
      </motion.a>
    </div>
  );
};

const WhatsAppPopup = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 right-6 z-[60] max-w-xs w-full"
        >
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-black/5 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-black/20 hover:text-black/60 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center text-white shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary">Need Help?</h4>
                <p className="text-xs text-black/40">We're online now</p>
              </div>
            </div>
            <p className="text-sm text-black/60 mb-6 leading-relaxed">
              Have a project in mind? Let's discuss how we can help your business grow.
            </p>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full bg-whatsapp text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-whatsapp/90 transition-colors shadow-lg shadow-whatsapp/20"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState('');
  const [whatsappPopupOpen, setWhatsappPopupOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWhatsappPopupOpen(true);
    }, 25000);

    // Show initial popup after 5 seconds
    const initialTimeout = setTimeout(() => {
      setWhatsappPopupOpen(true);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
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
    <div className="relative">
      <ConfirmationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={confirmRedirection} 
        url={pendingUrl}
      />
      <Navbar />
      <Hero />
      <SocialProof onClientClick={handleClientClick} />
      <Services />
      <Portfolio onClientClick={handleClientClick} />
      <Founders />
      <Process />
      <Trust />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
      <WhatsAppPopup 
        isOpen={whatsappPopupOpen} 
        onClose={() => setWhatsappPopupOpen(false)} 
      />
    </div>
  );
}
