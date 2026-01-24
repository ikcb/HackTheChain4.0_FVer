"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  Globe,
  Smartphone,
  Brain,
  Link2,
  Lightbulb,
  Sparkles,
  Calendar,
  Users,
  FolderOpen,
  ArrowRight,
  Trophy,
  Award,
  Medal,
  CheckCircle,
  Clock,
  FileCode,
  Scale,
  ChevronDown,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Menu,
  X,
} from "lucide-react";

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = [
      "hero",
      "about",
      "domains",
      "timeline",
      "stats",
      "prizes",
      "rules",
      "judging",
      "team",
      "faq",
    ];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  // Timeline scroll-based slider
  useEffect(() => {
    const timelineSection = document.getElementById("timeline");
    if (!timelineSection) return;

    const timelineEventsCount = 4;

    const handleScroll = () => {
      const rect = timelineSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Only process when timeline section is in view
      if (sectionTop > viewportHeight || sectionTop + sectionHeight < 0) {
        return;
      }

      // Calculate when section enters viewport center
      // Progress: 0 when section top is at 40% viewport, 1 when section bottom is at 60% viewport
      const entryPoint = viewportHeight * 0.4;
      const exitPoint = viewportHeight * 0.6 - sectionHeight;

      if (sectionTop > entryPoint) {
        setActiveTimelineIndex(0);
        return;
      }

      if (sectionTop < exitPoint) {
        setActiveTimelineIndex(timelineEventsCount - 1);
        return;
      }

      // Calculate progress (0 to 1) as user scrolls through the section
      const scrollRange = entryPoint - exitPoint;
      const scrolled = entryPoint - sectionTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      // Map to event index with smooth transitions
      const rawIndex = progress * (timelineEventsCount - 1);
      const index = Math.round(rawIndex);
      const clampedIndex = Math.min(
        Math.max(0, index),
        timelineEventsCount - 1
      );

      setActiveTimelineIndex(clampedIndex);
    };

    // Use requestAnimationFrame for smooth updates
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  const teamMembers1 = [
    {
      name: "Sanidhya Madeshia",
      role: "Coordinator",
      image: "/sanidhya-lead.png",
    },
    {
      name: "Yash Agarwal",
      role: "Co-Coordinator",
      image: "/yash-lead.png",
    },
    {
      name: "Ashmit Singh",
      role: "Lead Organizer",
      image: "/ashmit-lead.png",
    },
    {
      name: "Ayush Kumar",
      role: "Lead Organizer",
      image: "/aayush-lead.png",
    },
    {
      name: "Dipesh Mundotiya",
      role: "Lead Organizer",
      image: "/dipesh-lead.png",
    },
    {
      name: "Harsh Raj",
      role: "Lead Organizer",
      image: "/harsh-lead.png",
    },
    {
      name: "Parth Rudrawar",
      role: "Lead Organizer",
      image: "/parth-lead.png",
    },
  ];

  const teamMembers2 = [
    {
      name: "Dhananjay Mangal",
      role: "Social Media Lead",
      image: "/dhananjay.png",
    },
    {
      name: "Megh Kagadiya",
      role: "Social Media Lead",
      image: "/megh.png",
    },
    {
      name: "Satyam Rajawat",
      role: "Web Dev Lead",
      image: "/satyam.png",
    },
    {
      name: "Shyam Faujdar",
      role: "Web Dev Lead",
      image: "/shyam.png",
    },
    {
      name: "Divyam Saraf",
      role: "Web Dev Lead",
      image: "/divyam.png",
    },
    {
      name: "Aayush Mittal",
      role: "Web3 Lead",
      image: "/aayush.png",
    },
    {
      name: "Raghav Gupta",
      role: "App dev Lead",
      image: "/raghav.png",
    },
    {
      name: "Aakarsh Bibhaw",
      role: "UI/UX Lead",
      image: "/aakarsh.png",
    },
    {
      name: "ujjwal Sharma",
      role: "ML Lead",
      image: "/ujjwal.png",
    },
    {
      name: "Gaurav",
      role: "Cloud Lead",
      image: "/gaurav.png",
    },
  ];
    
  const row1 = teamMembers1.slice(0, 7);
  const row2 = teamMembers2.slice(0,11);

  const faqData = [
    {
      question: "When and where is HackTheChain taking place?",
      answer:
        "HackTheChain 4.0 is held in Kota on Feb 2026 at IIIT Kota campus.",
    },
    {
      question: "I can't come to Kota. What's in it for me?",
      answer:
        "Virtual participation options are available. You can participate in Round 1 completely online and join us virtually for the presentations.",
    },
    {
      question: "What are the team size requirements?",
      answer:
        "Teams can have 2 to 5 members. Solo participation is also allowed for exceptional individuals.",
    },
    {
      question: "Is there any registration fee?",
      answer:
        "There is no registration fee for HackTheChain 4.0. It's completely free to participate!",
    },
    {
      question: "Does HackTheChain sponsor accommodation and travel?",
      answer:
        "Accommodation and travel may be sponsored for select participants based on distance and team performance in Round 1.",
    },
    {
      question:
        "Are there special tracks for beginners and underrepresented genders?",
      answer:
        "Yes, beginner-friendly and diversity-focused tracks are available to ensure inclusive participation.",
    },
    {
      question: "How are teams selected? Can I form a team later?",
      answer:
        "Teams are selected based on applications and Round 1 performance. Team formation can happen later, but we recommend forming teams early for better coordination.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <img src="/logo1.png" alt="Logo Icon" className="h-10 w-auto" />
            <img src="/logo2.png" alt="HackTheChain" className="h-8 w-auto max-[400px]:hidden" />
          </div>
          <nav className="hidden lg:flex gap-10 text-sm font-medium">
            <Link
              href="#about"
              className="text-muted-foreground hover:text-white transition-colors nav-link-underline"
            >
              About
            </Link>
            <Link
              href="#domains"
              className="text-muted-foreground hover:text-white transition-colors nav-link-underline"
            >
              Tracks
            </Link>
            <Link
              href="#timeline"
              className="text-muted-foreground hover:text-white transition-colors nav-link-underline"
            >
              Timeline
            </Link>
            <Link
              href="#prizes"
              className="text-muted-foreground hover:text-white transition-colors nav-link-underline"
            >
              Prizes
            </Link>
            <Link
              href="#faq"
              className="text-muted-foreground hover:text-white transition-colors nav-link-underline"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex gap-3 items-center">
            <button className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all duration-300">
              Register Now
            </button>
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-accent/20 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col p-6 gap-6 text-center">
            <Link
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-muted-foreground hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#domains"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Tracks
            </Link>
            <Link
              href="#timeline"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Timeline
            </Link>
            <Link
              href="#prizes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Prizes
            </Link>
            <Link
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-muted-foreground hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src="/images/black-hole-gif.gif"
            alt="Cosmic animation"
            className="w-auto h-3/4 object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-black/70" />

        {/* Content overlay */}
        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                visibleSections["hero"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                  CodeBase presents
                </span>
              </div>
              <h1 className="text-7xl lg:text-8xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  HackThe
                </span>
                <br />
                <span className="text-accent">Chain 4.0</span>
              </h1>
              <p className="text-2xl text-accent font-semibold mb-4">
                The Biggest Hackathon in Kota City
              </p>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                As part of our Tech-Summit organized by TechKnow Society, join
                the ultimate hackathon for developers of all skill levels! Hack
                your way to success at HackTheChain 4.0!
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 font-semibold text-lg flex items-center gap-3">
                  Register Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">
                    ₹1,00,000
                  </div>
                  <p className="text-sm text-white/60">Prize Pool</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">
                    Hybrid
                  </div>
                  <p className="text-sm text-white/60">Event Format</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">
                    IIIT Kota
                  </div>
                  <p className="text-sm text-white/60">Hosted By</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${
                visibleSections["hero"]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <div className="relative z-10 w-full max-w-sm lg:max-w-md aspect-square flex items-center justify-center animate-float">
                <img
                  src="/main-logo.png"
                  alt="HackTheChain 4.0"
                  className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="section-bg-image py-32 px-6 relative overflow-hidden isolate"
        style={{ backgroundImage: "url('/images/back2.png')" }}
      >
        {/* Overlay - contained within section */}
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections["about"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              About the Event
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 mb-6 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Welcome to HackTheChain
              </span>
            </h2>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              visibleSections["about"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xl text-white/80 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              Welcome to{" "}
              <span className="text-accent font-semibold">
                HackTheChain 4.0
              </span>
              , the biggest hackathon in Kota City, presented by the Indian
              Institute of Information Technology Kota (IIIT Kota) in
              association with Codebase IIIT Kota. This hybrid event will be
              hosted on Devfolio with a prize pool of{" "}
              <span className="text-accent font-semibold">₹1,00,000</span>.
            </p>

            <p className="text-lg text-white/70 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              HackTheChain is more than just a competition—it's a platform where
              innovation meets execution. We bring together brilliant minds from
              across the country to tackle real-world challenges, build
              cutting-edge solutions, and push the boundaries of technology.
            </p>

            <p className="text-lg text-white/70 leading-relaxed text-center max-w-4xl mx-auto">
              Our vision is to create an ecosystem that fosters creativity,
              collaboration, and technical excellence. Join us for an incredible
              journey where innovation, creativity, and problem-solving come to
              life, and be part of the next generation of tech innovators!
            </p>
          </div>
        </div>
      </section>

      {/* Domains/Tracks Section */}
      <section
        id="domains"
        className="section-bg-image py-24 px-6 relative overflow-hidden isolate"
        style={{ backgroundImage: "url('/images/back2.png')" }}
      >
        {/* Overlay - contained within section */}
        <div className="absolute inset-0 bg-black/80 z-0 transition-opacity duration-300" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections["domains"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              Tracks
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 mb-6 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Choose Your Domain
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                icon: Globe,
                title: "Web Development",
                desc: "Develop innovative solutions that use web technologies to solve problems efficiently and bring meaningful innovation to benefit users.",
              },
              {
                icon: Smartphone,
                title: "App Development",
                desc: "Develop innovative solutions using app development technologies to solve problems and bring impactful innovation to users.",
              },
              {
                icon: Brain,
                title: "AI / ML",
                desc: "Leverage Generative AI and Machine Learning to develop apps that enhance automation, analysis, and decision-making.",
              },
              {
                icon: Link2,
                title: "Ethereum & Blockchain",
                desc: "This track is for Ethereum ecosystem projects, including those on EVM-compatible chains like Arbitrum, Polygon, Optimism, etc.",
              },
              {
                icon: Lightbulb,
                title: "Business Innovation",
                desc: "Tackle real-world business challenges and develop innovative solutions that can be scaled into full-fledged startups.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              const isVisible = visibleSections["domains"];
              
              // Variable width logic for 3:2 layout
              // First 3 items (0,1,2) -> width like grid-cols-3
              // Next 2 items (3,4) -> width approx 1/3 but centered? No, flex will handle it if we size them carefully.
              // To ensure 3 top, 2 bottom, we can enforce widths.
              // md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]
              
              return (
                <div
                  key={i}
                  className={`w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)] group relative hover-lift p-8 border border-accent/10 hover:border-accent/40 rounded-2xl glassmorphism cursor-pointer flex flex-col ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
                  <div className="relative flex-grow">
                    <Icon className="w-10 h-10 mb-6 text-accent group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
                    <h3 className="font-display font-bold text-xl mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="section-bg-image py-24 px-6 relative overflow-hidden isolate"
        style={{ backgroundImage: "url('/images/back2.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections["timeline"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              Schedule
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Event Timeline
              </span>
            </h2>
          </div>

          <div className="relative py-8">
            {/* Vertical Timeline Line */}
            <div className="timeline-line" />

            {/* Timeline Events Container */}
            <div className="relative space-y-20 md:space-y-24">
              {[
                {
                  title: "Round 1",
                  date: "21-02-2026",
                  desc: "Registration starts for Round 1 HackTheChain 4.0",
                },
                {
                  title: "Round 1 Result",
                  date: "23-02-2026",
                  desc: "Round 1 result declaration",
                },
                {
                  title: "Round 2",
                  date: "23-02-2026",
                  desc: "Presentation round starts",
                },
                {
                  title: "Final Result",
                  date: "23-02-2026",
                  desc: "Winner Announcement and Closing Ceremony",
                },
              ].map((step, i) => {
                const isVisible = visibleSections["timeline"];
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={i}
                    className={`relative grid grid-cols-1 md:grid-cols-[1fr_4rem_1fr] items-center transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Left Side (Empty or Card) */}
                    <div className={`order-2 md:order-1 flex md:justify-end ${isLeft ? "justify-center" : ""}`}>
                      {isLeft && (
                        <div className="w-full max-w-xl">
                          <div className="glassmorphism rounded-2xl p-8 md:p-10 hover:translate-y-[-5px] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 border border-accent/10 hover:border-accent/30 relative overflow-hidden group">
                             {/* Content same as before */}
                             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-transparent opacity-50" />
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                                <Calendar className="w-6 h-6 text-accent" />
                              </div>
                              <div>
                                <div className="text-accent font-semibold text-base md:text-lg">
                                  {step.date}
                                </div>
                              </div>
                            </div>
                            <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white neon-text-glow group-hover:text-accent transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center Column with Dot */}
                    <div className="order-1 md:order-2 flex justify-center h-full relative py-8 md:py-0">
                       <div
                        className="timeline-dot relative"
                        style={{
                          width: "16px",
                          height: "16px",
                          zIndex: 2,
                        }}
                      />
                      {/* Connector Line Logic per item? No, the main vertical line covers it. We can add small horizontal connectors here if needed. */}
                      {/* Horizontal Connector */}
                       <div
                          className="hidden md:block absolute top-1/2 h-px opacity-30"
                          style={{
                            left: isLeft ? "50%" : "auto",
                            right: isLeft ? "auto" : "50%",
                            width: "2rem", /* Short connector towards the card */
                            background: isLeft
                              ? "linear-gradient(to right, rgba(168, 85, 247, 0.25), transparent)"
                              : "linear-gradient(to left, rgba(168, 85, 247, 0.25), transparent)",
                            transform: "translateY(-50%)",
                            zIndex: 1,
                          }}
                        />
                    </div>

                    {/* Right Side (Card or Empty) */}
                     <div className={`order-3 md:order-3 flex md:justify-start ${!isLeft ? "justify-center" : ""}`}>
                      {!isLeft && (
                        <div className="w-full max-w-xl">
                          <div className="glassmorphism rounded-2xl p-8 md:p-10 hover:translate-y-[-5px] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 border border-accent/10 hover:border-accent/30 relative overflow-hidden group">
                               {/* Content same as before */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-transparent opacity-50" />
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                                <Calendar className="w-6 h-6 text-accent" />
                              </div>
                              <div>
                                <div className="text-accent font-semibold text-base md:text-lg">
                                  {step.date}
                                </div>
                              </div>
                            </div>
                            <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white neon-text-glow group-hover:text-accent transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="section-bg-image py-24 px-6 relative overflow-hidden isolate"
        style={{ backgroundImage: "url('/images/back2.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections["stats"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              Impact
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                By The Numbers
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: 200,
                suffix: "+",
                label: "Registrations",
                desc: "200+ registrations from across the country.",
                icon: Users,
              },
              {
                value: 100,
                suffix: "+",
                label: "Offline Participants",
                desc: "100+ participants joined the offline hackathon!",
                icon: Users,
              },
              {
                value: 20,
                suffix: "+",
                label: "Volunteers",
                desc: "To help you get the best out of HackTheChain 4.0.",
                icon: Users,
              },
              {
                value: 50,
                suffix: "+",
                label: "Projects",
                desc: "Innovative submissions from various domains.",
                icon: FolderOpen,
              },
            ].map((stat, i) => {
              const isVisible = visibleSections["stats"];
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 w-full ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition" />
                  <div className="relative p-10 border border-accent/10 hover:border-accent/40 rounded-2xl glassmorphism h-full flex flex-col items-center text-center transition-all bg-black/40">
                    <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-5xl font-display font-black text-accent mb-2 neon-text-glow">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2 text-white">
                      {stat.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="prizes"
        className="section-bg-image py-24 px-6 relative overflow-hidden isolate"
        style={{ backgroundImage: "url('/images/back2.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections["prizes"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              Rewards
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 mb-4 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Our Prizes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Compete to earn elite rewards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                place: "1st Place",
                title: "SUPREME",
                icon: Trophy,
                rank: "01",
                amount: "₹45,000",
              },
              {
                place: "2nd Place",
                title: "PRESTIGIOUS",
                icon: Award,
                rank: "02",
                amount: "₹35,000",
              },
              {
                place: "3rd Place",
                title: "RENOWNED",
                icon: Medal,
                rank: "03",
                amount: "₹20,000",
              },
            ].map((prize, i) => {
              const Icon = prize.icon;
              const isVisible = visibleSections["prizes"];
              return (
                <div
                  key={i}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="relative group hover-lift">
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                      {/* Main card */}
                      <div className="relative glassmorphism rounded-3xl p-10 text-center transition-all duration-500 h-full flex flex-col items-center justify-start min-h-[500px]">
                        {/* Rank number - subtle background */}
                        <div className="absolute top-6 right-6 text-6xl font-display font-black text-accent/5 select-none">
                          {prize.rank}
                        </div>

                        {/* Icon */}
                        <div className="relative mb-6 inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-500">
                          <Icon className="w-14 h-14 text-accent group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 rounded-2xl bg-accent/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                        </div>

                        {/* Badge */}
                        <div className="text-xs font-medium tracking-widest text-accent/70 uppercase mb-3">
                          HACKATHON WINNER
                        </div>

                        {/* Title with glow */}
                        <h3 className="text-4xl lg:text-5xl font-display font-black mb-3 neon-text-glow text-accent">
                          {prize.title}
                        </h3>

                        {/* Place */}
                        <p className="text-white/90 font-semibold text-xl mb-6">
                          {prize.place}
                        </p>

                        {/* Placeholder Content */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[250px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>

                        <div className="mt-auto w-full">
                           {/* Decorative line */}
                           <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-6" />
                           
                           {/* Money Box */}
                           <div className="mx-auto inline-block px-8 py-3 bg-accent/10 border border-accent/20 rounded-xl">
                              <span className="text-2xl font-mono font-bold text-accent">
                                {prize.amount}
                              </span>
                           </div>
                        </div>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="rules"
        className="section-bg-image py-24 px-6 relative overflow-hidden isolate"
        style={{ backgroundImage: "url('/images/back2.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections["rules"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              Key Attributes
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Rules and Guidelines
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: "Eligibility",
                desc: "The hackathon is open to all students, regardless of their college or academic background. Inter-college and inter-specialization teams are allowed.",
              },
              {
                icon: Users,
                title: "Team Formation",
                desc: "Teams must consist of 1 to 5 members. Solo participation is allowed. Each participant can be part of only one team.",
              },
              {
                icon: Lightbulb,
                title: "Track & Problem Statement",
                desc: "Participants may choose their own problem statement within any track. Five reference problem statements will be provided, but teams are free to work on their own ideas.",
              },
              {
                icon: Clock,
                title: "Hackathon Format & Timeline",
                desc: "30-hour non-stop coding event. Start: 21st Feb, 7:00 PM. End: 23rd Feb, 1:00 AM. Top 10 teams shortlisted after coding. Final Presentation: 23rd Feb, 9:00 AM.",
              },
              {
                icon: CheckCircle,
                title: "Originality & Ethics",
                desc: "Projects must be developed during the hackathon. Pre-built solutions, plagiarism, or copying will result in disqualification. Open-source libraries and APIs are allowed with proper credit.",
              },
              {
                icon: Scale,
                title: "Team Conduct",
                desc: "Teams must follow fair play and professional ethics. Any misconduct or harassment leads to disqualification.",
              },
              {
                icon: FileCode,
                title: "Submission Guidelines",
                desc: "Teams must submit source code, demo video, and documentation before 23rd Feb, 1:00 AM.",
              },
              {
                icon: Award,
                title: "Judging Criteria",
                desc: "Innovation, technical implementation, usability & impact, and presentation quality.",
              },
            ].map((rule, i) => {
              const Icon = rule.icon;
              const isVisible = visibleSections["rules"];
              return (
                <div
                  key={i}
                  className={`group relative hover-lift p-6 border border-accent/10 hover:border-accent/40 rounded-2xl glassmorphism ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-2 text-white">
                        {rule.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="judging"
        className="section-bg-image py-24 px-6 relative overflow-hidden isolate"
        style={{ backgroundImage: "url('/images/back2.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections["judging"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              Key Attributes
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Judging Criteria
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: "Innovation & Creativity",
                desc: "Originality, novelty, and creative problem-solving.",
                details: "We look for unique approaches to existing problems. Does your solution offer a fresh perspective? Is it creative in its implementation?",
                icon: Lightbulb,
              },
              {
                title: "Technical Ability",
                desc: "Proper use of technologies and solid implementation.",
                details: "Assessment of the code quality, stack choice, and technical complexity. Does it work efficiently? Is the architecture sound?",
                icon: FileCode,
              },
              {
                title: "Impact & Relevance",
                desc: "Potential industry or societal impact.",
                details: "How useful is this solution in the real world? Does it address a significant problem for a specific community or industry?",
                icon: Globe,
              },
              {
                title: "User Experience",
                desc: "Usability, clarity, and demonstration quality.",
                details: "Is the interface intuitive? Is the user flow smooth? A great backend needs a usable frontend to be truly effective.",
                icon: Users,
              },
              {
                title: "Presentation",
                desc: "Clear explanation, structure, and pitch delivery.",
                details: "How well can you communicate your idea? The pitch should be concise, clear, and engaging to the judges.",
                icon: Award,
              },
              {
                title: "Completion",
                desc: "Project completeness and working state.",
                details: "Is the MVP working? We value a finished core feature set over a half-baked massive platform.",
                icon: CheckCircle,
              },
            ].map((criteria, i) => {
              const Icon = criteria.icon;
              const isVisible = visibleSections["judging"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Rebuilt Hover Effect: Overlay Card on top */}
                  <div className="relative group h-full">
                    {/* Base Card (Visible, remains underneath) */}
                    <div className="relative z-10 p-8 border border-accent/20 rounded-2xl glassmorphism h-full flex flex-col items-center text-center transition-opacity duration-300">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
                      </div>
                      <h3 className="font-display font-bold text-xl lg:text-2xl mb-2 text-white">
                        {criteria.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {criteria.desc}
                      </p>
                    </div>

                    {/* Overlay Card (Appears on hover, larger, higher z-index) */}
                    <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-out transform scale-95 group-hover:scale-105">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-auto min-h-[110%] p-8 border border-accent/50 rounded-3xl bg-[#050505] shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col items-center text-center">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center mb-4">
                          <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-accent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        </div>
                        <h3 className="font-display font-bold text-xl lg:text-2xl mb-2 text-white drop-shadow-md">
                          {criteria.title}
                        </h3>
                        <p className="text-white/80 text-base leading-relaxed mb-4">
                          {criteria.desc}
                        </p>
                        
                        {/* Expanded Details */}
                        <div className="pt-4 border-t border-accent/20 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <p className="text-sm text-accent/90 font-medium leading-relaxed">
                            {criteria.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections["team"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              The People Behind
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
          </div>

          {/* Row 1 - Scrolling Left */}
          <div className="relative mb-8">
            <div className="flex whitespace-nowrap animate-scroll-left hover:pause-none">
              {[...row1, ...row1].map(
                (member, i) => (
                  <div key={i} className="flex-shrink-0 px-4">
                    <div className="w-56 lg:w-64 p-8 lg:p-10 border border-accent/10 rounded-2xl glassmorphism text-center">
                      <div className="w-28 h-28 lg:w-32 lg:h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-accent/30">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-display font-bold text-base lg:text-lg mb-1 text-white">
                        {member.name}
                      </h3>
                      <p className="text-accent text-sm font-medium">{member.role}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className="relative mb-8">
            <div className="flex whitespace-nowrap animate-scroll-right hover:pause-none">
              {[...row2, ...row2].map(
                (member, i) => (
                  <div key={i} className="flex-shrink-0 px-4">
                    <div className="w-56 lg:w-64 p-8 lg:p-10 border border-accent/10 rounded-2xl glassmorphism text-center">
                      <div className="w-28 h-28 lg:w-32 lg:h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-accent/30">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-display font-bold text-base lg:text-lg mb-1 text-white">
                        {member.name}
                      </h3>
                      <p className="text-accent text-sm font-medium">{member.role}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-32 px-6 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections["faq"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">
              Got Questions?
            </span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 neon-heading-glow">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, i) => {
              const isVisible = visibleSections["faq"];
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`w-full p-6 border rounded-2xl text-left transition-all duration-500 glassmorphism hover-lift ${
                      isOpen
                        ? "border-accent/50 bg-accent/10 neon-border-glow"
                        : "border-accent/10 hover:border-accent/30"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h3
                        className={`font-display font-bold text-lg ${
                          isOpen ? "text-accent" : "text-white"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isOpen ? "max-h-40 mt-4" : "max-h-0"
                      }`}
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-accent/20 pt-20 pb-10 px-6 overflow-hidden">
        {/* Footer Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/images/back4.png" alt="Footer Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/90" />
        </div>

        {/* Glow divider at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16 items-start">
            {/* Brand - Left */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo1.png" alt="Logo Icon" className="h-10 w-auto" />
                <img src="/logo2.png" alt="HackTheChain" className="h-8 w-auto" />
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                The biggest hackathon in Kota City, presented by IIIT Kota in
                association with Codebase.
              </p>
            </div>

            {/* Quick Links - Center (Spanning 2 columns visually or just center alignment? Reference says Center. We'll use col-span-2 and flex to center) */}
            <div className="md:col-span-2 flex justify-center">
                <div className="text-center md:text-left">
                    <h4 className="font-display font-bold text-lg mb-6 text-white">
                        Quick Links
                    </h4>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                        <Link href="#about" className="text-muted-foreground hover:text-accent transition-colors duration-300">About</Link>
                        <Link href="#domains" className="text-muted-foreground hover:text-accent transition-colors duration-300">Tracks</Link>
                        <Link href="#timeline" className="text-muted-foreground hover:text-accent transition-colors duration-300">Timeline</Link>
                        <Link href="#prizes" className="text-muted-foreground hover:text-accent transition-colors duration-300">Prizes</Link>
                        <Link href="#rules" className="text-muted-foreground hover:text-accent transition-colors duration-300">Rules</Link>
                        <Link href="#faq" className="text-muted-foreground hover:text-accent transition-colors duration-300">FAQ</Link>
                    </div>
                </div>
            </div>

            {/* Contact / Socials - Right */}
            <div className="md:col-span-1 flex flex-col items-start md:items-end text-left md:text-right">
              <h4 className="font-display font-bold text-lg mb-6 text-white">
                Contact Us
              </h4>
              <ul className="space-y-4 mb-6">
                <li className="text-muted-foreground hover:text-accent transition-colors">
                  <a href="mailto:hackthechain@iiitk.ac.in">hackthechain@iiitk.ac.in</a>
                </li>
                <li className="text-muted-foreground">
                  IIIT Kota Campus, Rajasthan
                </li>
              </ul>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 hover:scale-110 transition-all duration-300">
                   <Twitter className="w-4 h-4 text-accent" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 hover:scale-110 transition-all duration-300">
                   <Instagram className="w-4 h-4 text-accent" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 hover:scale-110 transition-all duration-300">
                   <Linkedin className="w-4 h-4 text-accent" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 hover:scale-110 transition-all duration-300">
                   <Github className="w-4 h-4 text-accent" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 HackTheChain 4.0 — All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by Divyam Saraf
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
