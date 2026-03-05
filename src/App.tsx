import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X,
  ShieldCheck,
  Zap,
  Sparkles,
  UserCheck,
  Award,
  MessageCircle,
  Calendar,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";
import { cn } from "./lib/utils";

// --- Custom Hooks ---

const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return { count, nodeRef };
};

// --- Components ---

const FloatingCTA = () => (
  <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
    <motion.a
      href="https://wa.me/918978920909"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30"
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
    <motion.a
      href="#appointment"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-14 h-14 bg-brand-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/30"
    >
      <Calendar className="w-7 h-7" />
    </motion.a>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Treatments", href: "#services" },
    { name: "Dr. Pavani", href: "#about" },
    { name: "Clinic", href: "#clinic" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[90] transition-all duration-500 px-6 py-6",
      isScrolled ? "bg-white/80 backdrop-blur-xl shadow-sm py-4" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-brand-500/20">
            I
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-extrabold tracking-tight text-neutral-900 leading-none">ISKINS</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold mt-1">Skin & Hair Clinic</span>
          </div>
        </motion.div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-neutral-600 hover:text-brand-500 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            href="#appointment"
            className="bg-neutral-900 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-brand-500 transition-all shadow-lg shadow-neutral-900/10 flex items-center gap-2"
          >
            Book Appointment
          </motion.a>
        </div>

        <button 
          className="lg:hidden p-2 text-neutral-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 p-8 flex flex-col gap-6 lg:hidden shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-bold text-neutral-800"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:+918978920909"
              className="bg-brand-500 text-white px-8 py-4 rounded-2xl text-center font-bold text-lg shadow-xl shadow-brand-500/20"
            >
              Call: +91 89789 20909
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-medical-50">
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full -z-10">
        <motion.div 
          style={{ y: y1 }}
          className="w-full h-full relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Dermatology Care" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-50 via-medical-50/80 lg:via-transparent to-transparent" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-brand-600 shadow-sm mb-8 border border-brand-100">
            <ShieldCheck className="w-4 h-4" />
            Premium Dermatology Institute
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-extrabold text-neutral-900 leading-[0.95] mb-8 tracking-tight text-balance">
            Advanced Skin & <span className="text-brand-500">Hair Care</span> in Hyderabad
          </h1>
          
          <p className="text-xl text-neutral-600 mb-10 max-w-xl leading-relaxed font-medium">
            Consult with <span className="text-neutral-900 font-bold">Dr. Pavani Reddy</span>, M.D.D.V.L, for personalized clinical treatments and aesthetic excellence.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <motion.a 
              href="#appointment"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-500 text-white px-10 py-5 rounded-full font-extrabold text-lg hover:bg-brand-600 transition-all shadow-2xl shadow-brand-500/30 flex items-center gap-3 group"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <div className="flex items-center gap-4 py-2 px-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
              <div className="flex items-center gap-1 text-brand-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-black text-neutral-900">4.9</span>
              </div>
              <div className="w-px h-8 bg-neutral-200" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-neutral-900">150+ Reviews</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Google Verified</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-neutral-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Patients Treated", value: 5000, suffix: "+" },
    { label: "Years Experience", value: 12, suffix: "+" },
    { label: "Treatments Offered", value: 30, suffix: "+" },
    { label: "Google Rating", value: 4.9, suffix: "/5", isDecimal: true },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => {
            const { count, nodeRef } = useCounter(stat.value);
            return (
              <div key={i} ref={nodeRef} className="flex flex-col items-center text-center">
                <div className="text-5xl md:text-6xl font-display font-black text-neutral-900 mb-2 flex items-baseline">
                  {stat.isDecimal ? count.toFixed(1) : count}
                  <span className="text-brand-500 ml-1">{stat.suffix}</span>
                </div>
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const categories = [
    {
      title: "Skin Treatments",
      icon: <ShieldCheck className="w-8 h-8" />,
      items: ["Acne Treatment", "Pigmentation", "Skin Allergies", "Dermatitis", "Psoriasis", "Fungal Infections"],
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Hair Treatments",
      icon: <Zap className="w-8 h-8" />,
      items: ["Hair Fall Treatment", "Density Improvement", "PRP Therapy", "Scalp Health Consultation"],
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Aesthetic Dermatology",
      icon: <Sparkles className="w-8 h-8" />,
      items: ["Chemical Peels", "Laser Treatments", "Anti-aging", "Skin Rejuvenation", "Facial Contouring"],
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="services" className="py-32 bg-medical-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block"
            >
              Specialized Care
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-display font-extrabold text-neutral-900 leading-tight"
            >
              Comprehensive Solutions for <span className="text-brand-500">Skin & Hair</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neutral-500 max-w-sm font-medium leading-relaxed"
          >
            We combine clinical expertise with advanced technology to deliver results that enhance your natural health and beauty.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="group bg-white rounded-[40px] overflow-hidden shadow-xl border border-neutral-100 flex flex-col h-full"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/0 transition-colors" />
                <div className="absolute top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-lg">
                  {cat.icon}
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-black text-neutral-900 mb-6">{cat.title}</h3>
                <ul className="space-y-4 mb-10 flex-1">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-600 font-medium group/item">
                      <div className="w-1.5 h-1.5 bg-brand-500 rounded-full group-hover/item:scale-150 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 text-brand-600 font-bold group/btn">
                  Learn More 
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutDoctor = () => (
  <section id="about" className="py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-3xl relative z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1000" 
              alt="Dr. Pavani Reddy" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute -bottom-10 -right-10 bg-neutral-900 text-white p-12 rounded-[40px] z-20 shadow-2xl max-w-xs border border-white/10"
          >
            <div className="flex items-center gap-2 text-brand-500 mb-4">
              <Award className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Expert Dermatologist</span>
            </div>
            <h4 className="text-3xl font-display font-black mb-2">Dr. Pavani Reddy</h4>
            <p className="text-brand-500 font-bold text-sm mb-4">M.D.D.V.L (Dermatology)</p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Dedicated to clinical excellence and patient-centric care for over 12 years.
            </p>
          </motion.div>
          
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-100 rounded-full -z-10 blur-[100px] opacity-60" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Meet the Expert</span>
          <h2 className="text-5xl md:text-7xl font-display font-extrabold text-neutral-900 mb-8 leading-tight">
            Clinical Expertise Meets <span className="text-brand-500">Compassion</span>
          </h2>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed font-medium">
            Dr. Pavani Reddy is a board-certified Consultant Dermatologist specializing in clinical dermatology, hair restoration, and aesthetic medicine.
          </p>
          <div className="space-y-6 mb-12">
            {[
              "Specialist in Diagnosis of Complex Skin Conditions",
              "Advanced Aesthetic & Anti-aging Procedures",
              "Personalized Hair Density Improvement Programs",
              "Evidence-based Clinical Dermatology"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-neutral-800 font-bold">{text}</span>
              </div>
            ))}
          </div>
          <a 
            href="#appointment"
            className="bg-neutral-900 text-white px-10 py-5 rounded-full font-extrabold hover:bg-brand-500 transition-all shadow-xl flex items-center gap-3 w-fit"
          >
            Consult with Dr. Pavani
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

const ClinicGallery = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000", title: "Reception Area", size: "lg" },
    { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800", title: "Consultation Room", size: "sm" },
    { src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800", title: "Treatment Suite", size: "sm" },
    { src: "https://images.unsplash.com/photo-1538108149393-fdfd81895907?auto=format&fit=crop&q=80&w=1000", title: "Advanced Equipment", size: "md" },
  ];

  return (
    <section id="clinic" className="py-32 bg-medical-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-extrabold text-neutral-900 mb-6">Modern Clinical <span className="text-brand-500">Infrastructure</span></h2>
          <p className="text-neutral-500 max-w-2xl mx-auto font-medium text-lg">A sterile, minimal, and premium environment designed for patient comfort and medical excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[800px]">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-2 rounded-[40px] overflow-hidden relative group"
          >
            <img src={images[0].src} alt={images[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
              <h4 className="text-2xl font-display font-bold text-white">{images[0].title}</h4>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 rounded-[40px] overflow-hidden relative group"
          >
            <img src={images[3].src} alt={images[3].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
              <h4 className="text-2xl font-display font-bold text-white">{images[3].title}</h4>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="rounded-[40px] overflow-hidden relative group"
          >
            <img src={images[1].src} alt={images[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <h4 className="text-lg font-display font-bold text-white">{images[1].title}</h4>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="rounded-[40px] overflow-hidden relative group"
          >
            <img src={images[2].src} alt={images[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <h4 className="text-lg font-display font-bold text-white">{images[2].title}</h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: "Ananya Rao", text: "Dr. Pavani is exceptional. Her diagnosis of my chronic eczema was spot on, and the treatment plan worked wonders within weeks.", rating: 5 },
    { name: "Rahul Sharma", text: "Best clinic for hair fall in Hyderabad. I've seen significant improvement in my hair density after just 3 sessions of PRP.", rating: 5 },
    { name: "Priya V.", text: "The aesthetic treatments are very professional. No over-selling, just honest advice and great results for my pigmentation.", rating: 5 },
  ];

  return (
    <section id="reviews" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-10">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-display font-black text-neutral-900 mb-6">What Our <span className="text-brand-500">Patients</span> Say</h2>
            <p className="text-neutral-500 text-lg font-medium">Real stories from people who trusted ISKINS for their dermatological journey.</p>
          </div>
          <div className="flex flex-col items-center bg-brand-50 p-10 rounded-[40px] border border-brand-100">
            <div className="flex items-center gap-1 text-brand-500 mb-2">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <span className="text-4xl font-display font-black text-neutral-900">4.9 / 5</span>
            <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-1">150+ Google Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[40px] bg-medical-50 border border-neutral-100 relative"
            >
              <div className="absolute -top-6 left-10 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-lg">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <p className="text-neutral-700 text-lg font-medium italic mb-8 leading-relaxed">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-black">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-neutral-900">{rev.name}</h4>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Verified Patient</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Appointment = () => (
  <section id="appointment" className="py-32 bg-neutral-900 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-500/10 -z-10 blur-[150px]" />
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <span className="text-brand-500 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Take the First Step</span>
          <h2 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-8 leading-tight">
            Ready for a <span className="text-brand-500">Transformation?</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-12 leading-relaxed font-medium">
            Book your clinical consultation with Dr. Pavani Reddy today. We offer flexible slots for both morning and evening sessions.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">Call Directly</p>
                <a href="tel:+918978920909" className="text-3xl font-display font-black text-white hover:text-brand-500 transition-colors">+91 89789 20909</a>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">Clinic Hours</p>
                <p className="text-xl font-display font-bold text-white">Mon – Sat: 10:30 AM – 8:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[60px] shadow-3xl"
        >
          <h3 className="text-3xl font-display font-black text-neutral-900 mb-8">Request Appointment</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-medical-50 border-none rounded-2xl px-6 py-4 text-neutral-900 font-bold focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Phone Number</label>
                <input type="tel" placeholder="+91 00000 00000" className="w-full bg-medical-50 border-none rounded-2xl px-6 py-4 text-neutral-900 font-bold focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Treatment Interested In</label>
              <select className="w-full bg-medical-50 border-none rounded-2xl px-6 py-4 text-neutral-900 font-bold focus:ring-2 focus:ring-brand-500 outline-none transition-all appearance-none">
                <option>Skin Treatment</option>
                <option>Hair Treatment</option>
                <option>Aesthetic Procedure</option>
                <option>General Consultation</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Preferred Date</label>
              <input type="date" className="w-full bg-medical-50 border-none rounded-2xl px-6 py-4 text-neutral-900 font-bold focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
            </div>
            <button className="w-full bg-brand-500 text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-600 transition-all shadow-2xl shadow-brand-500/30">
              Confirm Booking
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-display font-black text-neutral-900 mb-8">Visit Our <span className="text-brand-500">Clinic</span></h2>
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-medical-50 rounded-2xl flex items-center justify-center text-brand-500 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-2">Address</h4>
                <p className="text-neutral-800 font-bold leading-relaxed">
                  ISKINS Skin & Hair Clinic,<br />
                  Near Delhiwala Sweet House,<br />
                  Habsiguda, Hyderabad, Telangana
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-medical-50 rounded-2xl flex items-center justify-center text-brand-500 flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-2">Timings</h4>
                <div className="text-neutral-800 font-bold space-y-1">
                  <p>Morning: 10:30 AM – 1:30 PM</p>
                  <p>Evening: 5:30 PM – 8:30 PM</p>
                  <p className="text-red-500 font-black">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-neutral-100 relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.123456789!2d78.54321!3d17.4321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzU1LjYiTiA3OMKwMzInMzUuNiJF!5e0!3m2!1sen!2sin!4v1234567890" 
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a 
            href="https://maps.app.goo.gl/habsiguda" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm text-neutral-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Open in Maps <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-neutral-900 pt-32 pb-12 text-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              I
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-extrabold tracking-tight leading-none">ISKINS</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold mt-1">Skin & Hair Clinic</span>
            </div>
          </div>
          <p className="text-neutral-400 font-medium leading-relaxed">
            Leading dermatology clinic in Hyderabad providing advanced clinical and aesthetic treatments under the expertise of Dr. Pavani Reddy.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/iskinsclinic" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/iskinsclinic" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-display font-black mb-8">Quick Links</h4>
          <ul className="space-y-4">
            {["Home", "Treatments", "About Dr. Pavani", "Clinic Gallery", "Book Appointment"].map(link => (
              <li key={link}>
                <a href="#" className="text-neutral-400 hover:text-brand-500 font-bold transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-display font-black mb-8">Treatments</h4>
          <ul className="space-y-4">
            {["Acne Treatment", "Hair Fall Therapy", "Laser Hair Removal", "Chemical Peels", "Anti-aging"].map(link => (
              <li key={link}>
                <a href="#" className="text-neutral-400 hover:text-brand-500 font-bold transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-display font-black mb-8">Contact Info</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin className="w-6 h-6 text-brand-500 flex-shrink-0" />
              <span className="text-neutral-400 font-bold text-sm">Habsiguda, Hyderabad, Telangana</span>
            </li>
            <li className="flex gap-4">
              <Phone className="w-6 h-6 text-brand-500 flex-shrink-0" />
              <span className="text-neutral-400 font-bold text-sm">+91 89789 20909</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-500 text-sm font-bold">
          © {new Date().getFullYear()} ISKINS Skin & Hair Clinic. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm font-bold text-neutral-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <AboutDoctor />
      <ClinicGallery />
      <Reviews />
      <Appointment />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
