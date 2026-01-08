"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
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
} from "lucide-react"

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {}

    const sectionIds = ["hero", "about", "domains", "timeline", "stats", "prizes", "rules", "judging", "team", "faq"]

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }))
            observers[id].unobserve(element)
          }
        },
        { threshold: 0.15 },
      )

      observers[id].observe(element)
    })

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect())
    }
  }, [])

  const teamMembers = [
    { name: "Arjun Sharma", role: "Lead Organizer", image: "/professional-indian-man-portrait.png" },
    { name: "Priya Patel", role: "Tech Lead", image: "/professional-indian-woman-portrait.png" },
    { name: "Rahul Verma", role: "Design Head", image: "/young-indian-man-developer.jpg" },
    { name: "Ananya Gupta", role: "Marketing Lead", image: "/young-indian-professional.png" },
    { name: "Vikram Singh", role: "Sponsorship Head", image: "/indian-businessman.png" },
    { name: "Sneha Reddy", role: "Operations Lead", image: "/indian-woman-manager.jpg" },
    { name: "Aditya Kumar", role: "Developer", image: "/indian-developer-male.jpg" },
    { name: "Kavya Nair", role: "Content Lead", image: "/indian-woman-creative.jpg" },
    { name: "Rohan Mehta", role: "Logistics Head", image: "/indian-man-coordinator.jpg" },
    { name: "Ishita Jain", role: "Volunteer Lead", image: "/indian-woman-volunteer.jpg" },
    { name: "Karan Malhotra", role: "Social Media", image: "/indian-man-social-media.jpg" },
    { name: "Meera Chopra", role: "PR Lead", image: "/indian-woman-communications.jpg" },
  ]

  const faqData = [
    {
      question: "When and where is HackTheChain taking place?",
      answer: "HackTheChain 4.0 is held in Kota on Feb 2026 at IIIT Kota campus.",
    },
    {
      question: "I can't come to Kota. What's in it for me?",
      answer:
        "Virtual participation options are available. You can participate in Round 1 completely online and join us virtually for the presentations.",
    },
    {
      question: "What are the team size requirements?",
      answer: "Teams can have 2 to 5 members. Solo participation is also allowed for exceptional individuals.",
    },
    {
      question: "Is there any registration fee?",
      answer: "There is no registration fee for HackTheChain 4.0. It's completely free to participate!",
    },
    {
      question: "Does HackTheChain sponsor accommodation and travel?",
      answer:
        "Accommodation and travel may be sponsored for select participants based on distance and team performance in Round 1.",
    },
    {
      question: "Are there special tracks for beginners and underrepresented genders?",
      answer: "Yes, beginner-friendly and diversity-focused tracks are available to ensure inclusive participation.",
    },
    {
      question: "How are teams selected? Can I form a team later?",
      answer:
        "Teams are selected based on applications and Round 1 performance. Team formation can happen later, but we recommend forming teams early for better coordination.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <Link2 className="w-6 h-6 text-black" />
            </div>
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              HackTheChain
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <Link href="#about" className="text-muted-foreground hover:text-white transition-colors">
              About
            </Link>
            <Link href="#domains" className="text-muted-foreground hover:text-white transition-colors">
              Tracks
            </Link>
            <Link href="#timeline" className="text-muted-foreground hover:text-white transition-colors">
              Timeline
            </Link>
            <Link href="#prizes" className="text-muted-foreground hover:text-white transition-colors">
              Prizes
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Register Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="Cosmic animation" className="w-auto h-3/4 object-contain" />
        </div>
        <div className="absolute inset-0 bg-black/70" />

        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">CodeBase presents</span>
              </div>
              <h1 className="text-7xl lg:text-8xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  HackThe
                </span>
                <br />
                <span className="text-accent">Chain 4.0</span>
              </h1>
              <p className="text-2xl text-accent font-semibold mb-4">The Biggest Hackathon in Kota City</p>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                As part of our Tech-Summit organized by TechKnow Society, join the ultimate hackathon for developers of
                all skill levels! Hack your way to success at HackTheChain 4.0!
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3">
                  Register Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">₹1,00,000</div>
                  <p className="text-sm text-white/60">Prize Pool</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">Hybrid</div>
                  <p className="text-sm text-white/60">Event Format</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">IIIT Kota</div>
                  <p className="text-sm text-white/60">Hosted By</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <div className="relative z-10 w-full max-w-sm lg:max-w-md aspect-square rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center animate-float">
                <div className="text-center">
                  <div className="text-9xl font-display font-black text-accent mb-4">4.0</div>
                  <div className="text-xl text-white/60 font-medium">Feb 21-23, 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["about"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">About the Event</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Welcome to HackTheChain
              </span>
            </h2>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${visibleSections["about"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-xl text-white/80 leading-relaxed mb-12 text-center max-w-4xl mx-auto">
              Welcome to <span className="text-accent font-semibold">HackTheChain 4.0</span>, the biggest hackathon in
              Kota City, presented by the Indian Institute of Information Technology Kota (IIIT Kota) in association
              with Codebase IIIT Kota. This hybrid event will be hosted on Devfolio with a prize pool of{" "}
              <span className="text-accent font-semibold">₹1,00,000</span>.
            </p>

            <p className="text-lg text-white/70 text-center mb-12">The hackathon unfolds in two thrilling rounds:</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group p-8 border border-accent/20 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 backdrop-blur-sm">
                <div className="text-accent font-display font-bold text-2xl mb-4">Round 1</div>
                <div className="text-white font-semibold text-lg mb-2">Code Submission</div>
                <p className="text-muted-foreground leading-relaxed">
                  Scheduled from <span className="text-accent">February 21st to 22nd, 2026</span>, where participants
                  will submit project code, engage in quizzes, and take part in fun activities.
                </p>
              </div>

              <div className="group p-8 border border-accent/20 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 backdrop-blur-sm">
                <div className="text-accent font-display font-bold text-2xl mb-4">Round 2</div>
                <div className="text-white font-semibold text-lg mb-2">Final Project Showcase</div>
                <p className="text-muted-foreground leading-relaxed">
                  On <span className="text-accent">February 23rd, 2026</span>, participants will present their
                  revolutionary ideas to a panel of judges.
                </p>
              </div>
            </div>

            <p className="text-lg text-white/70 text-center mt-12 max-w-3xl mx-auto">
              Join us for an incredible journey where innovation, creativity, and problem-solving come to life!
            </p>
          </div>
        </div>
      </section>

      {/* Domains/Tracks Section */}
      <section id="domains" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["domains"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Tracks</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Choose Your Domain
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {
                icon: Sparkles,
                title: "Open",
                desc: "This track welcomes diverse and boundary-pushing ideas using emerging technologies.",
              },
            ].map((item, i) => {
              const Icon = item.icon
              const isVisible = visibleSections["domains"]
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Icon className="w-10 h-10 mb-6 text-accent group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["timeline"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Schedule</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Event Timeline
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Round 1", date: "21-02-2026", desc: "Registration starts for Round 1 HackTheChain 4.0" },
              { title: "Round 1 Result", date: "23-02-2026", desc: "Round 1 result declaration" },
              { title: "Round 2", date: "23-02-2026", desc: "Presentation round starts" },
              { title: "Final Result", date: "23-02-2026", desc: "Winner announcement and closing ceremony" },
            ].map((step, i) => {
              const isVisible = visibleSections["timeline"]
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-accent" />
                        <span className="text-accent font-semibold">{step.date}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["stats"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Impact</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4">
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
              const isVisible = visibleSections["stats"]
              const Icon = stat.icon
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition" />
                  <div className="relative p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 h-full flex flex-col items-center text-center transition-all backdrop-blur-sm">
                    <Icon className="w-8 h-8 text-accent mb-4" />
                    <div className="text-5xl font-display font-black text-accent mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">{stat.label}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="prizes" className="py-32 px-6 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["prizes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Rewards</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Our Prizes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Compete to earn rewards</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                place: "1st Place",
                title: "SUPREME",
                icon: Trophy,
                gradient: "from-accent via-purple-400 to-fuchsia-500",
              },
              {
                place: "2nd Place",
                title: "PRESTIGIOUS",
                icon: Award,
                gradient: "from-purple-400 via-accent to-violet-500",
              },
              {
                place: "3rd Place",
                title: "RENOWNED",
                icon: Medal,
                gradient: "from-violet-500 via-purple-400 to-accent",
              },
            ].map((prize, i) => {
              const Icon = prize.icon
              const isVisible = visibleSections["prizes"]
              return (
                <div
                  key={i}
                  className={`prize-card transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="relative group">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${prize.gradient} rounded-3xl opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500`}
                    />
                    <div className="relative h-full p-10 border border-accent/30 hover:border-accent/60 rounded-2xl bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-xl transition-all duration-500 neon-border-glow text-center">
                      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30">
                        <Icon className="w-10 h-10 text-accent" />
                      </div>
                      <div className="text-xs font-medium tracking-widest text-accent/80 uppercase mb-2">HACKATHON</div>
                      <h3 className="text-4xl font-display font-black mb-2 neon-text-glow text-accent">
                        {prize.title}
                      </h3>
                      <p className="text-white/80 font-semibold text-lg">{prize.place}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="rules" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["rules"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Key Attributes</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4">
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
              const Icon = rule.icon
              const isVisible = visibleSections["rules"]
              return (
                <div
                  key={i}
                  className={`group p-6 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 backdrop-blur-sm ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-2 text-white">{rule.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{rule.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="judging" className="py-32 px-6 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["judging"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Key Attributes</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Judging Criteria
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                title: "Innovation & Creativity",
                desc: "Originality, novelty, and creative problem-solving.",
                icon: Lightbulb,
              },
              {
                title: "Technical Ability",
                desc: "Proper use of technologies and solid implementation.",
                icon: FileCode,
              },
              { title: "Impact & Relevance", desc: "Potential industry or societal impact.", icon: Globe },
              { title: "User Experience", desc: "Usability, clarity, and demonstration quality.", icon: Users },
              { title: "Presentation", desc: "Clear explanation, structure, and pitch delivery.", icon: Award },
              { title: "Completion", desc: "Project completeness and working state.", icon: CheckCircle },
              { title: "Code Quality", desc: "Clean structure, documentation, and best practices.", icon: FileCode },
            ].map((criteria, i) => {
              const Icon = criteria.icon
              const isVisible = visibleSections["judging"]
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-500" />
                  <div className="relative p-6 border border-accent/20 hover:border-accent/50 rounded-2xl bg-card/50 hover:bg-card/80 h-full transition-all duration-500 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">{criteria.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{criteria.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="team" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["team"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">The People Behind</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
          </div>

          {/* Row 1 - Scrolling Left */}
          <div className="relative mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-scroll-left">
              {[...teamMembers.slice(0, 6), ...teamMembers.slice(0, 6)].map((member, i) => (
                <div key={i} className="flex-shrink-0 px-3">
                  <div className="group w-48 p-6 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 backdrop-blur-sm text-center neon-border-glow">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-accent/30 group-hover:border-accent/60 transition-colors">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display font-bold text-sm mb-1 truncate">{member.name}</h3>
                    <p className="text-accent text-xs">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-scroll-right">
              {[...teamMembers.slice(6), ...teamMembers.slice(6)].map((member, i) => (
                <div key={i} className="flex-shrink-0 px-3">
                  <div className="group w-48 p-6 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 backdrop-blur-sm text-center neon-border-glow">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-accent/30 group-hover:border-accent/60 transition-colors">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display font-bold text-sm mb-1 truncate">{member.name}</h3>
                    <p className="text-accent text-xs">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-32 px-6 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Got Questions?</span>
            <h2 className="text-6xl lg:text-7xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, i) => {
              const isVisible = visibleSections["faq"]
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`w-full p-6 border rounded-2xl text-left transition-all duration-500 backdrop-blur-sm ${
                      isOpen
                        ? "border-accent/50 bg-accent/10 neon-border-glow"
                        : "border-accent/10 bg-card/50 hover:border-accent/30 hover:bg-card/80"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h3 className={`font-display font-bold text-lg ${isOpen ? "text-accent" : "text-white"}`}>
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-40 mt-4" : "max-h-0"}`}
                    >
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-accent/10 py-16 px-6 bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <Link2 className="w-7 h-7 text-black" />
                </div>
                <div className="font-display font-bold text-3xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
                  HackTheChain 4.0
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-6">
                The biggest hackathon in Kota City, presented by IIIT Kota in association with Codebase. Join us for an
                incredible journey of innovation and creativity!
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition-all"
                >
                  <Twitter className="w-5 h-5 text-accent" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition-all"
                >
                  <Instagram className="w-5 h-5 text-accent" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition-all"
                >
                  <Linkedin className="w-5 h-5 text-accent" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition-all"
                >
                  <Github className="w-5 h-5 text-accent" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-accent transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#domains" className="text-muted-foreground hover:text-accent transition-colors">
                    Tracks
                  </Link>
                </li>
                <li>
                  <Link href="#timeline" className="text-muted-foreground hover:text-accent transition-colors">
                    Timeline
                  </Link>
                </li>
                <li>
                  <Link href="#prizes" className="text-muted-foreground hover:text-accent transition-colors">
                    Prizes
                  </Link>
                </li>
                <li>
                  <Link href="#rules" className="text-muted-foreground hover:text-accent transition-colors">
                    Rules
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-muted-foreground hover:text-accent transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-accent" />
                  <span>hackthechain@iiitk.ac.in</span>
                </li>
                <li className="text-muted-foreground">
                  IIIT Kota Campus
                  <br />
                  Kota, Rajasthan
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 HackTheChain 4.0 — Presented by CodeBase IIIT Kota</p>
            <p>
              Made with <span className="text-accent">♥</span> by the HackTheChain Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
