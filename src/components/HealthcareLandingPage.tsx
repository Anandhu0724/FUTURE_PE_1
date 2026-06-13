import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Activity, 
  Heart, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Calendar,
  Waves
} from 'lucide-react';
import { ClientProfile } from '../types';

interface HealthcareLandingPageProps {
  headline: string;
  subheadline: string;
  body: string;
  cta: string;
  secondaryCta: string;
  clientProfile: ClientProfile;
  framework: string;
  explanation?: string;
}

export default function HealthcareLandingPage({
  headline,
  subheadline,
  body,
  cta,
  secondaryCta,
  clientProfile,
  framework,
  explanation
}: HealthcareLandingPageProps) {
  // interactive state for clinical calculator
  const [selectedJoint, setSelectedJoint] = useState<'knee' | 'back' | 'shoulder'>('knee');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'chronic'>('moderate');
  const [wavelength, setWavelength] = useState<'650nm' | '810nm' | '980nm'>('810nm');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingName, setBookingName] = useState('');
  
  // Accordion state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // FAQ contents
  const FAQ_ITEMS = [
    {
      question: "How long does each private practitioner-led treatment session take?",
      answer: "Every clinical rehabilitation appointment lasts approximately 45 to 60 minutes. You will receive direct 1-on-1 hands-on care from a certified senior musculoskeletal therapist, completely private and free of unsupervised trainee hand-offs."
    },
    {
      question: "Is US-FDA approved Robotic Laser Therapy safe for older adults and acute strain?",
      answer: "Yes, our certified robotic laser uses US-FDA cleared photobiomodulation therapy. It is entirely non-invasive, painless, and triggers rapid cellular energy restoration inside inflamed joints or plantation workload strain areas."
    },
    {
      question: "Do I need a formal hospital referral before booking an assessment?",
      answer: "No referral is needed. You can schedule initial assessments directly. Our senior physical therapists will execute complete biological diagnostic testing, joint mapping, and structure an honest care schedule."
    },
    {
      question: "What is your pricing policy? Are there physical therapy surcharges?",
      answer: "We guarantee 100% price transparency. You will receive a written care pathway outlining exact costs prior to starting, with absolute elimination of unlisted clinical administrative fees."
    }
  ];

  // Helper to calculate clinical recommendations
  const getRecommendation = () => {
    let sessions = 4;
    let recoveryWeeks = 2;
    let title = "US-FDA approved laser therapy + specialized structural stretching";
    
    if (selectedJoint === 'back') {
      sessions = severity === 'mild' ? 4 : severity === 'moderate' ? 8 : 12;
      recoveryWeeks = severity === 'mild' ? 3 : severity === 'moderate' ? 6 : 10;
      title = "US-FDA laser deep energy + spinal column biomechanic alignment";
    } else if (selectedJoint === 'knee') {
      sessions = severity === 'mild' ? 3 : severity === 'moderate' ? 6 : 10;
      recoveryWeeks = severity === 'mild' ? 2 : severity === 'moderate' ? 4 : 8;
      title = "FDA robotic cell restoration + focused soft tissue mobilizing";
    } else {
      sessions = severity === 'mild' ? 5 : severity === 'moderate' ? 7 : 11;
      recoveryWeeks = severity === 'mild' ? 3 : severity === 'moderate' ? 5 : 9;
      title = "US-FDA robotic laser pulse + rotational scapular restoration";
    }

    return { sessions, recoveryWeeks, title };
  };

  const rec = getRecommendation();

  // Helper to parse complex copy body by keywords for enhanced layout structure
  const renderParsedBody = (rawBody: string) => {
    if (!rawBody) return <p className="text-[#334E4B] text-sm leading-relaxed whitespace-pre-wrap">{rawBody}</p>;

    // Let's identify framework segments such as "Problem:", "Agitate:", "Solve:", "Before:", "After:", "Bridge:"
    const lines = rawBody.split('\n');
    const parsedElements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        parsedElements.push(<div key={`spacer-${idx}`} className="h-2" />);
        return;
      }

      // Check for PAS
      if (trimmed.startsWith('Problem:') || trimmed.toLowerCase().startsWith('problem:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('problem:') + 8).trim();
        parsedElements.push(
          <div key={idx} className="bg-red-50 border-l-4 border-red-500 rounded-r-[12px] p-3 mb-2.5">
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest block mb-0.5">Core Local Problem</span>
            <p className="text-xs text-red-950 font-medium">{text}</p>
          </div>
        );
      } else if (trimmed.startsWith('Agitate:') || trimmed.toLowerCase().startsWith('agitate:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('agitate:') + 8).trim();
        parsedElements.push(
          <div key={idx} className="bg-amber-50 border-l-4 border-amber-500 rounded-r-[12px] p-3 mb-2.5">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-0.5">Critical Risk & Tension</span>
            <p className="text-xs text-amber-950 font-medium">{text}</p>
          </div>
        );
      } else if (trimmed.startsWith('Solve:') || trimmed.toLowerCase().startsWith('solve:') || trimmed.startsWith('Solution:') || trimmed.toLowerCase().startsWith('solution:')) {
        const keywordLength = trimmed.toLowerCase().startsWith('solution:') ? 9 : 6;
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('solve') + keywordLength).trim();
        parsedElements.push(
          <div key={idx} className="bg-emerald-50 border-l-4 border-[#14B8A6] rounded-r-[12px] p-4 mb-2.5">
            <span className="text-[10px] font-bold text-[#0A2E2B] uppercase tracking-widest block mb-0.5">Clinical Resolution Pathway</span>
            <p className="text-xs text-emerald-950 font-semibold">{text}</p>
          </div>
        );
      } 
      // Check for BAB
      else if (trimmed.startsWith('Before:') || trimmed.toLowerCase().startsWith('before:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('before:') + 7).trim();
        parsedElements.push(
          <div key={idx} className="bg-slate-100 border-l-4 border-slate-400 rounded-r-[12px] p-3 mb-2.5">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest block mb-0.5">Before (Unoptimized Strain)</span>
            <p className="text-xs text-slate-900">{text}</p>
          </div>
        );
      } else if (trimmed.startsWith('After:') || trimmed.toLowerCase().startsWith('after:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('after:') + 6).trim();
        parsedElements.push(
          <div key={idx} className="bg-teal-50/50 border-l-4 border-[#14B8A6] rounded-r-[12px] p-3 mb-2.5">
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block mb-0.5">After (Restored Health)</span>
            <p className="text-xs text-teal-950 font-medium">{text}</p>
          </div>
        );
      } else if (trimmed.startsWith('Bridge:') || trimmed.toLowerCase().startsWith('bridge:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('bridge:') + 7).trim();
        parsedElements.push(
          <div key={idx} className="bg-emerald-100/50 border-l-4 border-[#14B8A6] rounded-r-[12px] p-4 mb-2.5">
            <span className="text-[10px] font-bold text-[#0A2E2B] uppercase tracking-widest block mb-0.5">Apex Clinical Bridge</span>
            <p className="text-xs text-emerald-950 font-semibold">{text}</p>
          </div>
        );
      }
      // Check for FAB
      else if (trimmed.startsWith('Feature:') || trimmed.toLowerCase().startsWith('feature:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('feature:') + 8).trim();
        parsedElements.push(
          <div key={idx} className="mb-1 text-xs text-[#0A2E2B] font-semibold flex items-start gap-2">
            <span className="p-0.5 bg-[#14B8A6]/20 rounded text-[#14B8A6] mt-0.5 text-[9px] font-mono">Fact</span>
            <span>{text}</span>
          </div>
        );
      } else if (trimmed.startsWith('Advantage:') || trimmed.toLowerCase().startsWith('advantage:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('advantage:') + 10).trim();
        parsedElements.push(
          <div key={idx} className="mb-1 text-xs text-[#0A2E2B] pl-4 font-medium italic flex items-start gap-2">
            <span className="text-[#14B8A6] mt-0.5">↳</span>
            <span>{text}</span>
          </div>
        );
      } else if (trimmed.startsWith('Benefit:') || trimmed.toLowerCase().startsWith('benefit:')) {
        const text = trimmed.substring(trimmed.toLowerCase().indexOf('benefit:') + 8).trim();
        parsedElements.push(
          <div key={idx} className="mb-4 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-lg p-3 text-xs text-[#0A2E2B] font-bold">
            <span className="text-[9px] text-[#14B8A6] uppercase tracking-widest block mb-0.5">Direct Health Impact</span>
            {text}
          </div>
        );
      }
      // Standard line
      else {
        parsedElements.push(
          <p key={idx} className="text-[#334E4B] text-xs leading-relaxed mb-2 font-medium">
            {trimmed}
          </p>
        );
      }
    });

    return parsedElements;
  };

  return (
    <div id="healthcare-landing-preview" className="bg-[#FBFDFA] text-[#0A2E2B] font-sans rounded-3xl overflow-hidden shadow-xl border border-[#E8F3F1] min-h-screen flex flex-col text-left">
      
      {/* Clinic Mini Header */}
      <nav className="bg-white border-b border-[#E8F3F1] py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[12px] bg-[#0A2E2B] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-[#0A2E2B]/10">
            <Activity className="w-4 h-4 text-[#14B8A6]" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-[#0A2E2B] uppercase">APEX CLINIC</span>
            <span className="block text-[8px] tracking-wider uppercase text-slate-500 font-semibold">Sports Med & Advanced Rehab</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <a href="#services" className="hover:text-[#14B8A6] transition-colors">Services</a>
          <a href="#restoration" className="hover:text-[#14B8A6] transition-colors">Calculations</a>
          <a href="#faq" className="hover:text-[#14B8A6] transition-colors">Clinician FAQ</a>
        </div>

        <a 
          href="tel:+918049123670"
          className="px-4 py-2 bg-[#14B8A6] hover:bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded-[12px] flex items-center gap-1.5 shadow-md shadow-[#14B8A6]/20 transition-all cursor-pointer"
        >
          <Phone className="w-3 h-3" />
          <span className="hidden xs:inline">Book Assessment</span>
        </a>
      </nav>

      {/* Copywriter Framework Label Bar */}
      <div className="bg-[#0A2E2B] px-6 py-2 flex justify-between items-center text-[10px] font-mono text-white/70">
        <span className="flex items-center gap-1.5 text-white/90">
          <span className="w-2 h-2 bg-[#14B8A6] rounded-full inline-block animate-pulse"></span>
          <span>LIVE AESTHETIC RE-RENDERING ACTIVE</span>
        </span>
        <span className="text-[#14B8A6] font-bold uppercase">
          Framework: {framework || 'PAS'} Model Applied
        </span>
      </div>

      {/* ASYMMETRIC HERO SPLIT SECTION */}
      <section className="px-6 md:px-12 py-12 lg:py-16 bg-gradient-to-b from-white to-[#F2FAF7]/40 border-b border-[#E8F3F1]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left: Copy Editor Binding */}
          <div className="col-span-1 lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F8F5] border border-[#14B8A6]/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#14B8A6]">
              <Shield className="w-3 h-3 fill-[#14B8A6]/10" />
              <span>CERTIFIED CLINICAL RESTORATION PATHWAY</span>
            </div>

            {/* Custom user-bound headline */}
            <h1 className="text-[#0A2E2B] font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              {headline || 'Restore complete musculoskeletal function without surgery.'}
            </h1>

            {/* Custom user-bound subheadline */}
            <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed max-w-xl">
              {subheadline || 'Providing direct chief practitioner-led physiotherapy and certified US-FDA approved robotic laser restoration.'}
            </p>

            {/* Custom parsed body copy utilizing rich framework layouts */}
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8F3F1] rounded-2xl p-5 shadow-sm space-y-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                Editorial Conversion Copy Block
              </span>
              {renderParsedBody(body)}
            </div>

            {/* Structured CTAs with exact 12px border radius */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={() => {
                  setIsBooked(true);
                  setSelectedJoint('knee');
                }}
                className="px-6 py-4 bg-[#14B8A6] hover:bg-[#0d9488] text-white font-extrabold text-xs uppercase tracking-widest rounded-[12px] shadow-lg shadow-[#14B8A6]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{cta || 'Schedule Medical Consultation'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a 
                href="#services"
                className="px-6 py-4 bg-transparent border-2 border-[#0A2E2B]/20 hover:border-[#0A2E2B] text-[#0A2E2B] font-bold text-xs uppercase tracking-widest rounded-[12px] hover:bg-[#0A2E2B]/5 transition-all text-center flex items-center justify-center cursor-pointer"
              >
                <span>{secondaryCta || 'View Clinical Differentiators'}</span>
              </a>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2 font-mono">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#14B8A6]" /> Private clinic panels
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#14B8A6]" /> FDA cleared technology
              </span>
            </div>
          </div>          {/* Hero Right: Asymmetric Interactive Calculator Widget */}
          <div className="col-span-1 lg:col-span-5" id="interactive-diagnostics-pod">
            <div className="bg-gradient-to-br from-[#061D1B] to-[#0A332F] text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-[#14B8A6]/45">
              
              {/* Scanline overlay for cybernetic medical touch */}
              <div className="absolute inset-x-0 top-0 h-full w-full bg-[linear-gradient(rgba(20,184,166,0.08)_1px,transparent_1px)] bg-[size:100%_12px] opacity-20 pointer-events-none"></div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#14B8A6]/10 to-transparent opacity-0 animate-scanline pointer-events-none"></div>
              
              {/* Background gradient orbs */}
              <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute left-[-20px] bottom-[-20px] w-32 h-32 bg-[#14B8A6]/8 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-4">
                
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[9px] text-[#14B8A6] font-bold uppercase tracking-widest font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                      Interactive Holographic Scanner
                    </span>
                    <h3 className="text-sm font-extrabold tracking-tight mt-0.5 text-slate-100">FDA Robotic Joint Diagnostic</h3>
                  </div>
                  <Waves className="w-4 h-4 text-[#14B8A6] animate-pulse" />
                </div>

                <div className="space-y-3.5">
                  
                  {/* Step 1: Joint selector */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-widest text-[#14B8A6] mb-1.5 font-mono">
                      1. Select Pain Epicenter:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['knee', 'back', 'shoulder'] as const).map((joint) => (
                        <button
                          key={joint}
                          onClick={() => setSelectedJoint(joint)}
                          className={`py-1.5 px-1 text-center rounded-[10px] text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                            selectedJoint === joint
                              ? 'bg-[#14B8A6] text-white border-[#14B8A6] shadow-md shadow-[#14B8A6]/20'
                              : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {joint}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Severity Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-[#14B8A6] mb-1.5 font-mono">
                        2. Strain Severity:
                      </label>
                      <div className="flex gap-1 bg-white/5 p-0.5 rounded-[10px] border border-white/5">
                        {(['mild', 'moderate', 'chronic'] as const).map((sev) => (
                          <button
                            key={sev}
                            onClick={() => setSeverity(sev)}
                            className={`flex-1 py-1 text-center rounded-lg text-[9px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                              severity === sev
                                ? 'bg-white text-[#0A2E2B] font-extrabold shadow-sm'
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            {sev}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-[#14B8A6] mb-1.5 font-mono">
                        3. Laser Class:
                      </label>
                      <div className="flex gap-1 bg-white/5 p-0.5 rounded-[10px] border border-white/5">
                        {(['650nm', '810nm', '980nm'] as const).map((w) => (
                          <button
                            key={w}
                            onClick={() => setWavelength(w)}
                            className={`flex-1 py-1 text-center rounded-lg text-[9px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                              wavelength === w
                                ? w === '650nm'
                                  ? 'bg-red-500 text-white font-extrabold'
                                  : w === '810nm'
                                    ? 'bg-[#14B8A6] text-white font-extrabold'
                                    : 'bg-violet-600 text-white font-extrabold'
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            {w.replace('nm', '')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ANATOMICAL PROJECTION MODULE */}
                  <div className="bg-[#031514] border border-[#14B8A6]/20 rounded-2xl p-3 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
                    {/* Grid texture backplate */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:12px_12px]"></div>
                    
                    {/* Custom SVG Anatomical mapping */}
                    <div className="relative w-full h-[110px] flex items-center justify-center">
                      <svg className="w-36 h-28 text-white/20 select-none pb-2" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Biomechanical outline background */}
                        <path d="M50 10 C 45 25, 45 40, 50 65 M50 22 C40 28, 25 30, 20 40 M50 22 C60 28, 75 30, 80 40 M50 65 L38 80 M50 65 L62 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" className="opacity-20" />
                        
                        {/* Dynamic Bone & Joint Mapping depending on state */}
                        {selectedJoint === 'back' && (
                          <g>
                            {/* Vertebral Column stack */}
                            <path d="M50 12 L50 62" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" className="opacity-40 animate-pulse" />
                            {[15, 22, 30, 38, 46, 54].map((y, stepIdx) => (
                              <rect key={stepIdx} x="46" y={y} width="8" height="3" rx="1" fill={severity === 'chronic' ? '#EF4444' : '#14B8A6'} className={y > 35 ? 'animate-pulse' : ''} />
                            ))}
                            {/* Target Pointer */}
                            <circle cx="50" cy="48" r="6" fill="none" stroke={wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6'} strokeWidth="1.5" className="animate-ping" />
                            <circle cx="50" cy="48" r="3.5" fill={wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6'} />
                          </g>
                        )}

                        {selectedJoint === 'knee' && (
                          <g>
                            {/* Knee joint bone intersection */}
                            <path d="M50 15 L50 38" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                            <path d="M50 46 L50 72" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                            <ellipse cx="50" cy="42" rx="5" ry="4" fill="none" strokeClassName="opacity-40" stroke="#14B8A6" strokeWidth="1.5" />
                            {/* Patella Highlight */}
                            <circle cx="50" cy="42" r="7" fill="none" stroke={wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6'} strokeWidth="1.5" className="animate-ping" />
                            <circle cx="50" cy="42" r="4" fill={wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6'} />
                            {/* Meniscus structures */}
                            <path d="M44 44 C46 45, 54 45, 56 44" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
                          </g>
                        )}

                        {selectedJoint === 'shoulder' && (
                          <g>
                            {/* Shoulder articular joint rotators */}
                            <circle cx="30" cy="28" r="5" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-25" />
                            <path d="M50 20 L32 26" stroke="currentColor" strokeWidth="2.5" className="opacity-30" />
                            <path d="M30 29 L24 48" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                            {/* Active spot Rotator Cuff */}
                            <circle cx="30" cy="28" r="6" fill="none" stroke={wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6'} strokeWidth="1.5" className="animate-ping" />
                            <circle cx="30" cy="28" r="3.5" fill={wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6'} />
                            {/* Clavicle ligament structure */}
                            <path d="M50 18 C40 18, 33 22, 30 28" stroke={severity === 'chronic' ? '#EF4444' : '#14B8A6'} strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                          </g>
                        )}

                        {/* Animated Laser Ray Beam hitting targeting coordinate */}
                        <g>
                          <line
                            x1={selectedJoint === 'shoulder' ? "30" : "50"}
                            y1="0"
                            x2={selectedJoint === 'shoulder' ? "30" : "50"}
                            y2={selectedJoint === 'back' ? "48" : selectedJoint === 'knee' ? "42" : "28"}
                            stroke={wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6'}
                            strokeWidth="2.5"
                            className="animate-pulse"
                            strokeLinecap="round"
                          />
                          <line
                            x1={selectedJoint === 'shoulder' ? "30" : "50"}
                            y1="0"
                            x2={selectedJoint === 'shoulder' ? "30" : "50"}
                            y2={selectedJoint === 'back' ? "48" : selectedJoint === 'knee' ? "42" : "28"}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>

                      {/* Floating biomechanical digital labels */}
                      <div className="absolute top-2 left-2 text-[8px] font-mono opacity-50 flex flex-col">
                        <span>X-REF COD: {selectedJoint.toUpperCase()}-B2</span>
                        <span className="text-[#14B8A6]">WAVE: {wavelength}</span>
                      </div>
                      <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50 text-right">
                        <span>SYS: UNBROKEN</span>
                        <span className={severity === 'chronic' ? 'text-red-400' : 'text-[#14B8A6]'}>STRES: {severity.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Laser stats bar */}
                    <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center font-mono">
                      <div className="bg-white/5 rounded-lg p-1">
                        <span className="text-[7.5px] text-white/40 block">ABSORB RANGE</span>
                        <span className="text-[10px] font-bold text-[#14B8A6]">
                          {wavelength === '650nm' ? '92.4%' : wavelength === '810nm' ? '98.9%' : '96.2%'}
                        </span>
                      </div>
                      <div className="bg-white/5 rounded-lg p-1">
                        <span className="text-[7.5px] text-white/40 block">ATP BOOST</span>
                        <span className="text-[10px] font-bold text-emerald-400">
                          {severity === 'mild' ? '+150%' : severity === 'moderate' ? '+220%' : '+340%'}
                        </span>
                      </div>
                      <div className="bg-white/5 rounded-lg p-1">
                        <span className="text-[7.5px] text-white/40 block">REPAIR CELL</span>
                        <span className="text-[10px] font-bold text-[#14B8A6]">FDA Approved</span>
                      </div>
                    </div>
                  </div>

                  {/* Diagnostic Calculation results */}
                  <div className="bg-[#031514] border border-[#14B8A6]/20 rounded-2xl p-3.5 space-y-2">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <span className="text-[8px] font-mono text-white/50 uppercase">Recommended Recovery Route</span>
                      <span className="text-[8px] font-mono text-[#14B8A6] font-bold uppercase tracking-wider">Apex Bio Plan</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] font-mono text-white/40 block uppercase">PRESCRIBED SESSIONS</span>
                        <span className="text-sm font-extrabold text-[#14B8A6]">{rec.sessions} Private Visits</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-white/40 block uppercase">ESTIMATED RESTORATION</span>
                        <span className="text-sm font-extrabold text-[#14B8A6]">{rec.recoveryWeeks} Full Weeks</span>
                      </div>
                    </div>

                    <div className="pt-1 text-[9.5px] text-white/90 leading-relaxed font-semibold italic border-t border-white/5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: wavelength === '650nm' ? '#EF4444' : wavelength === '810nm' ? '#14B8A6' : '#8B5CF6' }}></span>
                      <span>Target: {rec.title}</span>
                    </div>
                  </div>
                </div>

                {isBooked ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#E8F8F5] p-3 rounded-2xl border border-[#14B8A6] text-center mt-2"
                  >
                    <p className="text-xs font-bold text-[#0A2E2B]">
                      ✓ High-Availability Spot Reserved!
                    </p>
                    <p className="text-[9.5px] text-[#14B8A6] mt-0.5 font-semibold">
                      Our coordinator will call you to lock Dr. Kurian’s schedule.
                    </p>
                    <button 
                      onClick={() => setIsBooked(false)}
                      className="mt-2 text-[9px] uppercase tracking-wider text-slate-500 hover:text-[#0A2E2B] font-bold"
                    >
                      Reset Booking
                    </button>
                  </motion.div>
                ) : (
                  <div className="pt-1.5">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Your phone number for callback..." 
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-[12px] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#14B8A6] placeholder-slate-400 font-mono"
                      />
                      <button
                        onClick={() => {
                          if (bookingName.trim()) {
                            setIsBooked(true);
                          } else {
                            alert('Please enter your phone number to reserve your recovery slot.');
                          }
                        }}
                        className="px-4 py-2 bg-[#14B8A6] hover:bg-[#0d9488] text-white font-extrabold text-xs uppercase tracking-widest rounded-[12px] transition-all cursor-pointer shrink-0"
                      >
                        Reserve
                      </button>
                    </div>
                    <span className="block text-[8px] text-white/40 font-mono mt-1 w-full text-center">
                      Only 4 consultation assessment slots remain active for today.
                    </span>
                  </div>
                )}
                
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3-CARD SERVICES GRID */}
      <section id="services" className="px-6 md:px-12 py-16 bg-[#FBFDFA]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold tracking-widest text-[#14B8A6] uppercase bg-[#E8F8F5] px-3 py-1 rounded-full inline-block">
              1-on-1 Clinical Capabilities
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2E2B] tracking-tight">
              Biomechanical Services and Joint Pathways
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed">
              Every practitioner-led treatment is custom scheduled inside private clinic chambers equipped with advanced clinical machinery.
            </p>
          </div>

          {/* Grid Layout of 3 Cards with Crisp Hover Animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <motion.div 
              whileHover={{ y: -5, borderColor: '#14B8A6', boxShadow: '0 10px 30px -10px rgba(20,184,166,0.15)' }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#E8F3F1] rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#E8F8F5] flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-200">
                  <Zap className="w-5 h-5 text-inherit" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm text-[#0A2E2B]">US-FDA Robotic Laser Therapy</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    USA engineered, cold-light laser restoration targets cellular biological repair points, instantly soothing acute swelling without clinical surgery.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider">
                <span>Laser cell revival</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              whileHover={{ y: -5, borderColor: '#14B8A6', boxShadow: '0 10px 30px -10px rgba(20,184,166,0.15)' }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#E8F3F1] rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#E8F8F5] flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-200">
                  <Heart className="w-5 h-5 text-inherit" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm text-[#0A2E2B]">1-on-1 Chief Physical Therapy</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    Hands-on active myofascial release & structural rehab directly led by registered expert practitioners inside high-class closed panels.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider">
                <span>Practitioner Only</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              whileHover={{ y: -5, borderColor: '#14B8A6', boxShadow: '0 10px 30px -10px rgba(20,184,166,0.15)' }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#E8F3F1] rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#E8F8F5] flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-200">
                  <Activity className="w-5 h-5 text-inherit" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm text-[#0A2E2B]">Sports Biomechanical Profiling</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    Functional orthopedic joint testing, movement telemetry, and customized joint pathways to resolve plantation strain and direct restoration.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider">
                <span>Orthopedic assessment</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FAQS: ACCORDION CONTAINER */}
      <section id="faq" className="px-6 md:px-12 py-16 bg-[#F2FAF7]/40 border-t border-[#E8F3F1] flex-grow">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold tracking-widest text-[#14B8A6] uppercase font-mono bg-[#E8F8F5] px-3 py-1 rounded-full inline-block">
              Humble and Honest Guidance
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2E2B] tracking-tight">
              Clinician Assessment FAQ
            </h2>
            <p className="text-slate-500 text-xs font-semibold">
              Transparent biological explanations constructed for direct patient safety.
            </p>
          </div>

          {/* Accessible Accordion container */}
          <div className="divide-y divide-[#E8F3F1] border border-[#E8F3F1] rounded-2xl overflow-hidden bg-white shadow-sm">
            {FAQ_ITEMS.map((item, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div key={idx} className="transition-colors duration-150">
                  
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    aria-expanded={isExpanded}
                    className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-[#FBFDFA]/60 focus:outline-none transition-colors duration-150 group cursor-pointer"
                  >
                    <span className={`text-xs md:text-sm font-extrabold transition-colors duration-200 ${
                      isExpanded ? 'text-[#14B8A6]' : 'text-[#0A2E2B] group-hover:text-[#14B8A6]'
                    }`}>
                      {item.question}
                    </span>
                    <span className={`p-1 bg-[#F1FAF8] rounded-lg text-[#14B8A6] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {/* Accordion Content Panels */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-[#FBFDFA] font-medium bg-[#FBFDFA]/40">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

          {/* Safe authority message */}
          <div className="text-center text-xs text-slate-400 pt-2 flex items-center justify-center gap-1.5 font-semibold">
            <Shield className="w-4 h-4 text-[#14B8A6]" />
            <span>State registered chief practitioners strictly respect standard clinical safety guidelines.</span>
          </div>

        </div>
      </section>

      {/* Healthcare Aesthetic Footer */}
      <footer className="bg-[#0A2E2B] text-white/75 py-8 px-6 md:px-12 border-t border-white/5 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[8px] bg-white/10 flex items-center justify-center text-white text-xs font-bold">
              <Activity className="w-3.5 h-3.5 text-[#14B8A6]" />
            </div>
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#14B8A6]">Apex Sports Med & Advanced Rehabilitation</span>
          </div>

          <p className="text-[10px] text-white/50 text-center md:text-left font-mono">
            Temple Road, Thodupuzha, Idukki, Kerala • ISO 14001 Sanitation Class-1 Certified
          </p>
        </div>
      </footer>

    </div>
  );
}
