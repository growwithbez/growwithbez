import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Navbar links (no Services)
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Free Resource', to: '/free-resource' },
];

const HERO_SLIDES = [
  {
    headline: 'GrowWithBez',
    tagline: 'From Brand Vision to Digital Reality',
    subtext:
      'I blend social media strategy, brand storytelling, and AI-powered marketing to help founders, creators, and startups grow with purpose and clarity.',
    ctas: [
      { label: 'Get My Free Content Clarity Kit', href: '#kit', style: 'primary' },
    ],
  },
  {
    headline: 'GrowWithBez',
    tagline: 'From Brand Vision to Digital Reality',
    subtext:
      'Scale with clarity. Skip the chaos. Strategy and systems for tech-first brands and ambitious creators.',
    ctas: [
      { label: 'Start With My Free Toolkit', href: '#kit', style: 'primary' },
    ],
  },
];

// Improved AUTHKIT-style grid background with stars and spotlight
function AuthKitHeroBg() {
  // Mimic AuthKit: 100 subtle dots (fine stars), random but seeded, with blue/white/gray hues and soft opacity
  const DOTS_COUNT = 100;
  const STAR_SEED = 2025;
  function prng(seed:number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  const dots = Array.from({ length: DOTS_COUNT }).map((_, i) => {
    // Spread in viewbox (0,0) to (1440, 550) for visibility
    const x = Math.floor(prng(STAR_SEED + i * 19) * 1440);
    const y = Math.floor(prng(STAR_SEED + i * 37) * 520) + 32;
    // Alternate blue/white tones
    const hues = [
      'rgba(175,195,237,0.13)',   // pastel blue
      'rgba(164,191,218,0.23)',
      'rgba(173,202,255,0.18)',
      'rgba(255,255,255,0.09)',
      'rgba(185,209,255,0.11)',
    ];
    const color = hues[i % hues.length];
    const r = prng(STAR_SEED + i * 59) < 0.7 ? 0.72 : prng(STAR_SEED + i * 7) < 0.3 ? 1.6 : 1.15;
    return { x, y, r, color };
  });
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 1440 1024" fill="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{opacity:0.44}}>
        <defs>
          {/* Radial spotlight in the center top, under headline */}
          <radialGradient id="spot" cx="50%" cy="18%" r="70%">
            <stop offset="10%" stopColor="#C7DAF8" stopOpacity="0.17"/>
            <stop offset="60%" stopColor="#060716" stopOpacity="0.0"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="1440" height="1024" fill="url(#spot)"/>
        {/* Dots/stars first, so grid overlays it */}
        <g>
          {dots.map((dot, i) => (
            <circle key={`dot${i}`} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.color} />
          ))}
        </g>
        {/* Grid lines on top of starfield, behind content */}
        <g stroke="#AAB7CF" opacity="0.08">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`v${i}`} x1={i*90} y1="0" x2={i*90} y2="1024" />
          ))}
          {Array.from({ length: 12 }).map((_, j) => (
            <line key={`h${j}`} x1="0" y1={j*80} x2="1440" y2={j*80} />
          ))}
        </g>
      </svg>
      {/* Overlay very soft dark blue */}
      <div className="absolute inset-0 bg-[#060716] mix-blend-normal" style={{opacity:0.96}}/>
    </div>
  );
}

function Home() {
  const [slide, setSlide] = useState(0);
  const s = HERO_SLIDES[slide];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-x-hidden bg-[#060716] pb-0">
      <AuthKitHeroBg />
      {/* Remove all padding top/bottom from header */}
      <header className="z-10 flex flex-col items-center w-full pt-2 md:pt-6 relative min-h-[65vh] justify-center">
        {/* Top-center logo */}
        <div className="mb-5 flex flex-col items-center">
          <span className="opacity-80">
            <svg width="30" height="30" fill="none" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="18" fill="#20263d"/>
              <rect x="10" y="11" width="17" height="9" rx="4.5" fill="#232E53"/>
              <circle cx="20" cy="19" r="3" fill="#7A90D7"/>
            </svg>
          </span>
        </div>
        <div className="flex items-center mb-2 gap-2 justify-center">
          <span className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-[#384269] to-transparent" />
          <span className="text-[15px] md:text-base text-[#b0bedd] opacity-90 font-semibold">
            {s.tagline}
          </span>
          <span className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-[#384269] to-transparent" />
        </div>
        <h1
          className="text-[56px] md:text-[86px] font-extrabold leading-snug text-center drop-shadow-[0_4px_30px_rgba(122,144,215,0.28)] select-text mb-1"
          style={{
            background: 'linear-gradient(180deg, #C7DAF8 40%, #aabede 80%, #434b60 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 12px 48px #6f8dba33',
            letterSpacing: '-0.04em',
          }}
        >
          GrowWithBez
        </h1>
        <p className="mt-5 mb-8 text-[20px] md:text-2xl font-medium max-w-2xl text-[#aabede] text-center drop-shadow-sm">
          {s.subtext}
        </p>
        <div className="flex gap-5 mt-1 mb-4 justify-center flex-wrap">
          {s.ctas.map(({ label, href, style }) => (
            <a key={label} href={href}
              className={`px-7 py-3 rounded-full font-semibold border-2 transition-all duration-200 shadow-lg focus:ring-2 focus:ring-offset-2 ${
                style==='primary'
                  ? 'bg-[#20294b] border-[#c7daf8] text-[#c7daf8] hover:bg-[#c7daf833]'
                  : 'bg-[#101722]/90 border-[#384269] text-[#aabede] hover:bg-[#232b43]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex gap-3 mb-3 mt-0">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={`heros${i}`}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`w-3 h-3 rounded-full border-2 border-[#343e5e] transition-all ${i===slide ? 'bg-[#aabede]' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </header>
    </div>
  );
}

// ABOUT PAGE
function About() {
  return (
    <main className="min-h-screen w-full bg-[#060716] flex flex-col items-center px-6 py-10 text-[#E0E7FF] justify-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-20 justify-center">
        <img
          src="/growwithbez.jpg"
          alt="Portrait of Bezawit Woldemichael, digital strategist and founder of Grow With Bez"
          className="w-52 h-52 rounded-full object-cover border-4 border-[#516bf3] mb-4 md:mb-0 shadow"
          style={{objectPosition:'center'}}
        />
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#B7CDFF] leading-tight">
            Hi, I’m Bez — Digital Strategist with a Developer’s Mindset
          </h1>
          <p className="text-lg leading-relaxed text-[#C7D2FE] mb-4">
            I’m Bezawit Woldemichael, a technical creative with roots in software engineering — now building at the intersection of tech marketing and social media strategy. At Grow With Bez, I help founders and B2B creators craft digital brands with clarity, consistency, and content that converts. My approach fuses systems, storytelling, and strategy — no fluff, just focus.
          </p>
          <div className="mt-5 flex gap-4">
            <a
              href="#playbook"
              className="px-6 py-2 rounded-full font-semibold bg-[#516bf3] hover:bg-[#3e4b73] text-white transition"
            >
              Read My Growth Playbook
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

// BLOG
function Blog() {
  return (
    <main className="min-h-[90vh] w-full bg-[#060716] flex flex-col items-center px-6 py-16 text-[#E0E7FF]">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-[#B7CDFF]">Insights & Stories</h1>
      <div className="max-w-3xl w-full grid gap-8">
        {[
          {
            title: 'How I’d Grow a Dev Tool Brand with 1 Hour a Day on Social',
            excerpt: 'Step-by-step process for busy founders & DevRels to get meaningful results on social with minimal overwhelm.',
          },
          {
            title: 'My AI Stack for Content Strategy (2025 Version)',
            excerpt: 'An inside look at the AI tools I actually use for content, planning, and automation as a tech marketer.',
          },
          {
            title: 'Personal Branding Tips for Engineers Entering DevRel',
            excerpt: 'How to make the leap from coding to storytelling without losing your edge.',
          },
        ].map((p, idx) => (
          <div key={idx} className="rounded-xl border border-[#31395a] bg-[#11152a]/75 p-7 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-[#B7CDFF]">{p.title}</h2>
            <p className="text-[#A2A9C8] mb-2">{p.excerpt}</p>
            <a href="#" className="text-[#516bf3] hover:underline">Read more →</a>
          </div>
        ))}
      </div>
    </main>
  );
}

// CONTACT
function Contact() {
  return (
    <main className="min-h-[90vh] w-full bg-[#060716] flex flex-col items-center px-6 py-16 text-[#E0E7FF]">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-[#B7CDFF]">Contact</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.target as HTMLFormElement);
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: form.get('name'),
              email: form.get('email'),
              message: form.get('message'),
            }),
          });

          if (res.ok) alert('Message sent!');
          else alert('Error. Please try again.');
        }}
        className="w-full max-w-lg bg-[#101527]/70 p-8 rounded-2xl border border-[#21294d] shadow-lg flex flex-col gap-5"
      >
        <input
          name="name"
          type="text"
          required
          placeholder="Your Name"
          className="rounded-md px-4 py-3 bg-[#181e30] border border-[#2f3752] text-[#B7CDFF] focus:ring-2 focus:ring-[#516bf3]"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your Email"
          className="rounded-md px-4 py-3 bg-[#181e30] border border-[#2f3752] text-[#B7CDFF] focus:ring-2 focus:ring-[#516bf3]"
        />
        <textarea
          name="message"
          required
          placeholder="Your Message"
          rows={4}
          className="rounded-md px-4 py-3 bg-[#181e30] border border-[#2f3752] text-[#B7CDFF] focus:ring-2 focus:ring-[#516bf3]"
        />
        <button
          type="submit"
          className="py-3 px-7 rounded-full bg-gradient-to-r from-[#516bf3] to-[#7A90D7] text-white font-semibold shadow hover:from-[#7A90D7] hover:to-[#516bf3] transition"
        >
          Send
        </button>
      </form>


      <div className="flex gap-5 mt-8">
        <a href="https://linkedin.com" className="hover:text-[#516bf3]" target="_blank" rel="noopener noreferrer"><svg width="24" height="24" fill="currentColor"><path d="M18.994 2.006C20.65 2.006 22 3.355 22 5.012V18.99C22 20.646 20.65 21.996 18.994 21.996H5.012c-1.656 0-3.006-1.35-3.006-3.006V5.012C2.006 3.355 3.355 2.006 5.012 2.006H18.994zM8.338 19.172v-7.099H5.993v7.099h2.345zm-1.173-8.077c-.756 0-1.372-.615-1.372-1.372a1.377 1.377 0 012.743 0c0 .757-.616 1.372-1.371 1.372zm12.005 8.077v-3.902c0-2.083-1.12-3.052-2.615-3.052-1.204 0-1.745.662-2.046 1.128v-0.968h-2.343c.03.638 0 7.099 0 7.099H15.12v-3.963c0-.212.016-.423.077-.576.167-.423.547-.86 1.187-.86.838 0 1.174.653 1.174 1.61v3.789h2.343z"/></svg></a>
        <a href="https://twitter.com" className="hover:text-[#516bf3]" target="_blank" rel="noopener noreferrer"><svg width="24" height="24" fill="currentColor"><path d="M22 5.924c-.793.353-1.645.592-2.54.7a4.476 4.476 0 001.963-2.475 8.96 8.96 0 01-2.825 1.081 4.49 4.49 0 00-7.65 4.093A12.747 12.747 0 013.086 4.88a4.478 4.478 0 001.39 5.984c-.713-.021-1.385-.219-1.972-.545v.055a4.493 4.493 0 003.604 4.41c-.578.157-1.19.187-1.786.07a4.496 4.496 0 004.194 3.125 8.993 8.993 0 01-6.625 1.854A12.7 12.7 0 008.29 21.5c8.292 0 12.838-6.87 12.838-12.838 0-.198-.004-.398-.013-.594A9.06 9.06 0 0022 5.924z"/></svg></a>
      </div>
    </main>
  );
}

// FREE RESOURCE LEAD MAGNET
function FreeResource() {
  return (
    <main className="min-h-[80vh] w-full bg-[#060716] flex flex-col items-center px-6 py-20 text-center text-[#E0E7FF]">
      <div className="max-w-2xl w-full bg-[#13192a]/90 rounded-2xl p-10 border border-[#31395a] shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#B7CDFF]">📥 Free Tech Creator Content Kit</h1>
        <p className="mb-6 text-[#B8BEDB] text-lg">Includes a content calendar, 10 social post templates, and my AI tools list for tech marketers and founders.</p>
        <form className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input type="email" placeholder="Your Email" className="rounded-md px-4 py-2 bg-[#181e30] border border-[#2f3752] text-[#B7CDFF] focus:ring-2 focus:ring-[#516bf3] md:w-80" required />
          <button type="submit" className="py-2 px-8 rounded-full bg-gradient-to-r from-[#516bf3] to-[#7A90D7] text-white font-semibold shadow hover:from-[#7A90D7] hover:to-[#516bf3] transition">Send It to Me</button>
        </form>
      </div>
    </main>
  );
}

// NAVIGATION
function Nav() {
  return (
    <nav className="bg-[#060716]/80 text-[#B7CDFF] px-5 py-3 backdrop-blur-sm border-b border-[#22253d] fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#8CACF7]">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="18" fill="#21294d"/><path d="M14 27C14 25.8954 14.8954 25 16 25H24C25.1046 25 26 25.8954 26 27" stroke="#B7CDFF" strokeWidth="1.8"/><circle cx="20" cy="19" r="3" fill="#7A90D7"/><rect x="11" y="11" width="12" height="9" rx="4.5" fill="#232E53"/></svg>
          GrowWithBez
        </Link>
        <ul className="flex space-x-5 text-lg">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="hover:text-[#7A90D7] transition-colors duration-300 font-medium"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// FOOTER
function Footer() {
  return (
    <footer className="bg-[#0F1226] text-[#A5B4FC] py-6 border-t border-[#191e34] w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">© 2025 GrowWithBez. Crafted by Bez. Where brand meets growth.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <Nav />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/free-resource" element={<FreeResource />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
