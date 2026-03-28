import React, { useState, useEffect } from 'react';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { 
      icon: "🔍", 
      title: "Smart Scraping", 
      description: "Custom-built scrapers that monitor subreddits and forums to capture the real campus vibe in real-time.",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "hover:border-blue-500/50"
    },
    { 
      icon: "🤖", 
      title: "NLP Powered", 
      description: "Advanced Natural Language Processing categorizes sentiment across academics, hostel life, campus culture, and more.",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "hover:border-orange-500/50"
    },
    { 
      icon: "📊", 
      title: "Data Integrity", 
      description: "Sophisticated filtering removes noise and bot activity, ensuring sentiment scores reflect genuine student voices.",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "hover:border-purple-500/50"
    }
  ];

  const techStack = [
    { name: "React 18", category: "frontend", icon: "⚛️", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" },
    { name: "Vite", category: "frontend", icon: "⚡", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
    { name: "TailwindCSS", category: "frontend", icon: "🎨", color: "bg-teal-500/10 text-teal-400 border-teal-500/30" },
    { name: "Python", category: "backend", icon: "🐍", color: "bg-green-500/10 text-green-400 border-green-500/30" },
    { name: "FastAPI", category: "backend", icon: "🚀", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
    { name: "SQLite", category: "database", icon: "🗄️", color: "bg-slate-500/10 text-slate-400 border-slate-500/30" },
    { name: "Transformers", category: "ml", icon: "🧠", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" },
    { name: "PRAW", category: "tools", icon: "🔧", color: "bg-rose-500/10 text-rose-400 border-rose-500/30" }
  ];

  const milestones = [
    { year: "2024 Q1", title: "Project Launch", description: "Initial concept and architecture design" },
    { year: "2024 Q2", title: "Data Pipeline", description: "Built scraping infrastructure and NLP models" },
    { year: "2024 Q3", title: "Dashboard MVP", description: "Launched interactive dashboard with real-time insights" },
    { year: "2024 Q4", title: "Public Beta", description: "Open beta with 10+ IIT campuses" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F13] via-[#0B0F13] to-[#0A0E12] text-white font-sans">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center relative z-10">
          <div className="animate-on-scroll" id="hero">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full px-5 py-2 mb-8 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-orange-400 text-sm font-semibold tracking-wide">Capstone Project 2024</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              The Story Behind
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-gradient-x">
                UniPulse AI
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed backdrop-blur-sm">
              Transforming thousands of student conversations into actionable insights using 
              state-of-the-art sentiment analysis and machine learning.
            </p>

            {/* Floating Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                <span className="text-2xl">📊</span>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-xs text-gray-400">Conversations</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="text-2xl font-bold">Real-time</div>
                  <div className="text-xs text-gray-400">Updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards with 3D Hover Effect */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-on-scroll group relative"
              id={`card-${index}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`relative bg-gradient-to-br from-[#151B23] to-[#0F1318] border border-gray-800 rounded-2xl p-8 backdrop-blur-sm overflow-hidden ${stat.borderColor} transition-all duration-500 group-hover:border-opacity-100`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {stat.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {stat.description}
                  </p>
                  
                  {/* Animated Border Bottom */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-transparent group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack with Glassmorphism */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="animate-on-scroll" id="tech-stack">
          <div className="relative bg-gradient-to-br from-[#151B23]/80 to-[#0F1318]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 lg:p-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 mb-4">
                  <span className="text-sm font-semibold text-orange-400">⚡ Modern Stack</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Tech Stack</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Built with modern tools and frameworks to deliver real-time insights with enterprise-grade reliability.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className={`group relative px-5 py-2.5 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default ${tech.color}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tech.icon}</span>
                      <span className="font-medium">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Section */}
              <div className="border-t border-gray-800 pt-12">
                <h3 className="text-2xl font-semibold text-center mb-8">Development Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      {index < milestones.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/30 to-transparent" />
                      )}
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 flex items-center justify-center text-xl font-bold text-orange-400">
                          {index + 1}
                        </div>
                        <div className="text-sm font-semibold text-orange-400 mb-2">{milestone.year}</div>
                        <div className="font-semibold mb-1">{milestone.title}</div>
                        <div className="text-xs text-gray-500">{milestone.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="animate-on-scroll" id="mission">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-[#151B23] to-[#0F1318] border border-gray-800 rounded-3xl p-8 lg:p-10 hover:border-orange-500/30 transition-all duration-500 group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎓</div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                UniPulse AI was built as a Capstone Project to address the critical lack of transparent, 
                qualitative data regarding the IIT student experience. By leveraging automation and 
                machine learning, we provide a dashboard that helps prospective students make informed 
                decisions while keeping alumni connected to the current reality of their institutions.
              </p>
              <div className="flex items-center gap-2 text-orange-400 group-hover:gap-3 transition-all duration-300">
                <span className="text-sm font-medium">Learn more</span>
                <span className="text-lg">→</span>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#151B23] to-[#0F1318] border border-gray-800 rounded-3xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Transparency</h4>
                <p className="text-gray-400 text-sm">Making student experiences visible and quantifiable for everyone</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#151B23] to-[#0F1318] border border-gray-800 rounded-3xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Authenticity</h4>
                <p className="text-gray-400 text-sm">Prioritizing genuine student voices over metrics and noise</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#151B23] to-[#0F1318] border border-gray-800 rounded-3xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Innovation</h4>
                <p className="text-gray-400 text-sm">Pushing boundaries in educational data analysis and visualization</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#151B23] to-[#0F1318] border border-gray-800 rounded-3xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all duration-300">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Community First</h4>
                <p className="text-gray-400 text-sm">Building tools that serve and empower the student community</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent rounded-3xl p-8 lg:p-12 text-center border border-orange-500/20">
          <h3 className="text-3xl font-bold mb-4">Ready to Explore?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join us in transforming how we understand student experiences through data-driven insights.
          </p>
          <button className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-semibold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105">
            <span className="relative z-10">View Dashboard →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default About;