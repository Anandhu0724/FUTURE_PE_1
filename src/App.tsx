/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  LayoutTemplate, 
  MapPin, 
  Mail, 
  MessageSquare, 
  Instagram, 
  Edit3, 
  Clipboard, 
  Check, 
  Trash2, 
  ArrowRight, 
  Save, 
  Layers, 
  Sparkles, 
  FileText, 
  Clock, 
  Laptop, 
  Wifi, 
  VolumeX, 
  Armchair,
  BookOpen,
  Printer,
  Shield,
  Heart,
  Scissors,
  Activity,
  Sun,
  Moon,
  Search,
  X,
  Zap
} from 'lucide-react';
import { 
  ClientProfile, 
  CopyFramework, 
  CopyAssetType, 
  CopyGenerationResponse, 
  WorkspaceDraft, 
  FRAMEWORK_DETAILS, 
  ASSET_TYPES 
} from './types';

const INITIAL_PROFILE: ClientProfile = {
  businessName: 'Apex Sports Med & Rehab',
  industry: 'Premium Sports Physiotherapy & Advanced Musculoskeletal Clinic',
  location: 'Temple Road, Thodupuzha, Idukki, Kerala',
  targetAudience: 'Local athletes, plantation owners managing chronic physical strain, and individuals recovering from orthopedic surgeries.',
  differentiators: [
    '1-on-1 private treatment rooms (no curtain dividers)',
    'US-FDA approved robotic laser therapy',
    'Practitioner-led sessions (no unsupervised trainee hand-offs)'
  ],
  toneOfVoice: 'Authoritative, deeply empathetic, clinical yet accessible, action-oriented'
};

const ARCHETYPE_PRESETS = [
  {
    id: 'cafe',
    name: 'Specialty Cafe',
    badge: 'Specialty Cafe & Co-working',
    profile: {
      businessName: 'The Espresso Room',
      industry: 'Specialty Cafe & Co-working Hub',
      location: '4th Block, Koramangala, Bangalore',
      targetAudience: 'Freelancers, tech remote workers, and specialty coffee lovers.',
      differentiators: [
        'House-roasted single-origin Indian coffees',
        'Ergonomic seating designed for 8+ hour stretches',
        '500 Mbps redundant fiber-optic Wi-Fi network',
        'Dedicated quiet zone floor'
      ],
      toneOfVoice: 'Friendly, community-driven, productive, yet relaxed'
    },
    initialGeneration: {
      primaryHeadline: 'House-roasted single origins and power-backed Wi-Fi to keep your focus unbroken.',
      subheadline: 'Built for Koramangala\'s freelancers and tech remote workers who need quiet zones and ergonomic seating to ship clean code.',
      bodyText: 'Problem: Most coffee shops mock your productivity with unstable Wi-Fi, deafening noise, and chairs that strain your back.\n\nAgitation: Fighting for the single power outlet while nursing an overpriced, bitter latte is no way to do deep work.\n\nSolution: The Espresso Room provides Bengaluru\'s builders with ergonomic seating, a dedicated silent floor, and premium house-roasted Indian single-origins designed for sustained mental flow.',
      callToAction: 'Reserve a high-speed desk',
      explanation: "State exact physical value propositions instead of abstract metaphors. Contrast unstable local coffee setups ('agitation') with dedicated engineering environments to increase booking conversion."
    },
    defaultAudienceFocus: 'Freelance developers & startup teams',
    defaultContextNotes: 'Emphasize the zero-lag Wi-Fi and house-roasted single origin beans.',
    secondaryCta: 'View today\'s roast selection'
  },
  {
    id: 'clinic',
    name: 'Certified Clinic',
    badge: 'State-Certified Care Clinic',
    profile: {
      businessName: 'Apex Family Dental Clinic',
      industry: 'Certified Advanced Medical Clinic',
      location: '5th Block, Koramangala, Bangalore',
      targetAudience: 'Local families, anxious patients, and local working professionals.',
      differentiators: [
        'ISO-certified sterile equipment and pain-free treatment guarantees',
        'Direct consultation with registered, board-recognized chief doctors',
        'Completely transparent care schedules with zero hidden or unlisted fees',
        'On-site state-of-the-art 3D digital diagnosis scanning'
      ],
      toneOfVoice: 'Professional, compassionate, empathetic, yet authoritative'
    },
    initialGeneration: {
      primaryHeadline: 'ISO-certified board dental experts and fully-sterilized setups you can trust.',
      subheadline: 'Providing Koramangala families with compassionate, registered expert specialists and painless treatments.',
      bodyText: 'Problem: Finding an honest dentist often involves suffering through clinical coldness, unexpected fees, and fear of safety standards.\n\nAgitation: Delaying simple treatments because of anxiety over painful procedures or dubious cleanliness only leads to severe infections and costly surgeries later.\n\nSolution: Apex Family Dental resolves that anxiety with transparent, pain-free treatment pipelines, strictly audited ISO sterile chambers, and gentle board-certified doctors who prioritize your safety above all.',
      callToAction: 'Book safety consultation',
      explanation: "Shifts tone to 'Professional & Empathetic' to break down clinic aversion. Focuses purely on authority, pain-free safety, and certified care protocols to build immediate trust."
    },
    defaultAudienceFocus: 'Anxious patients & local families',
    defaultContextNotes: 'Highlight raw pain-free treatment assurance and ISO sterile chamber validation.',
    secondaryCta: 'View certified safety ratings'
  },
  {
    id: 'salon',
    name: 'Beauty Salon',
    badge: 'Premium Beauty & Aesthetics',
    profile: {
      businessName: 'Studio Velvet Aesthetics',
      industry: 'Premium Hair & Skincare Salon',
      location: '3rd Block, Koramangala, Bangalore',
      targetAudience: 'Style-conscious young professionals and modern beauty lovers.',
      differentiators: [
        'Global-certified elite senior stylists and skin therapists',
        'Custom organic-certified botanical hydration therapies',
        'Dedicated modern styling chairs with complimentary espresso',
        'Advanced ultrasonic scalp and non-invasive glow techniques'
      ],
      toneOfVoice: 'Trendy, energetic, invigorating, style-focused'
    },
    initialGeneration: {
      primaryHeadline: 'Signature botanical treatments and elite styling to claim your confidence.',
      subheadline: 'Crafted for Bengaluru\'s trailblazers who want bespoke style transformations that turn heads.',
      bodyText: 'Problem: Most chain salons treat you like an assembly-line ticket, offering sloppy, rushed cuts that leave you looking generic.\n\nAgitation: Spending hours of your weekend only to walk out with damaged hair and a dated style is a frustrating waste of energy.\n\nSolution: Studio Velvet shifts your self-care into high-gear with premium global-certified art stylists, deep botanical-infused therapies that protect wellness, and custom signature styles tailored entirely to your face shape.',
      callToAction: 'Reserve transformation call',
      explanation: "Shifts tone to 'Trendy & Invigorating' to excite active beauty seekers. Centers on premium transformation, deep botanical hydration, and certified elite stylist expertise."
    },
    defaultAudienceFocus: 'Elite lifestyle young professionals',
    defaultContextNotes: 'Highlight custom-tailored style consultation and invigorating botanical organic serums.',
    secondaryCta: 'Browse designer style lookbook'
  },
  {
    id: 'sportsmed',
    name: 'Sports Med',
    badge: 'Premium Sports Physiotherapy',
    profile: {
      businessName: 'Apex Sports Med & Rehab',
      industry: 'Premium Sports Physiotherapy & Advanced Musculoskeletal Clinic',
      location: 'Temple Road, Thodupuzha, Idukki, Kerala',
      targetAudience: 'Local athletes, plantation owners managing chronic physical strain, and individuals recovering from orthopedic surgeries.',
      differentiators: [
        '1-on-1 private treatment rooms (no curtain dividers)',
        'US-FDA approved robotic laser therapy',
        'Practitioner-led sessions (no unsupervised trainee hand-offs)'
      ],
      toneOfVoice: 'Authoritative, deeply empathetic, clinical yet accessible, action-oriented'
    },
    initialGeneration: {
      primaryHeadline: 'Restore complete biomechanical function. No trainees, no curtain dividers—just direct expert musculoskeletal recovery.',
      subheadline: 'US-FDA approved robotic laser therapy and practitioner-led sports physiotherapy in Thodupuzha, engineered for direct joint restoration.',
      bodyText: 'Problem: Standard physiotherapy feels like an assembly line—unsupervised trainees handing you hot-packs behind shared curtain dividers while charging premium rates.\n\nAgitation: Delaying proper sports med rehab or chronic back strain recovery makes structural damage permanent, forcing you to travel all the way to Kochi for major surgeries.\n\nSolution: Apex Sports Med & Rehab equips Idukki\'s athletes and hardworking plantation owners with dedicated private rooms, FDA-certified physical laser tech, and chief practitioner-led sessions mapped closely to your body’s direct structural restoration.',
      callToAction: 'Schedule practitioner consultation',
      explanation: "Utilizes Neuro-Linguistic Framing (NLF) to design clear functional restoration. Employs clinical authority and physical proof points (FDA approved robotic laser therapy, 1-on-1 private treatment rooms) to completely eliminate clinical anxiety."
    },
    defaultAudienceFocus: 'Local athletes & plantation owners',
    defaultContextNotes: 'Emphasize absolute functional restoration, elimination of trainee hand-offs, and 1-on-1 private rooms.',
    secondaryCta: 'Request recovery assessment'
  }
];

const INITIAL_GENERATION: CopyGenerationResponse = {
  primaryHeadline: 'Restore complete biomechanical function. No trainees, no curtain dividers—just direct expert musculoskeletal recovery.',
  subheadline: 'US-FDA approved robotic laser therapy and practitioner-led sports physiotherapy in Thodupuzha, engineered for direct joint restoration.',
  bodyText: 'Problem: Standard physiotherapy feels like an assembly line—unsupervised trainees handing you hot-packs behind shared curtain dividers while charging premium rates.\n\nAgitation: Delaying proper sports med rehab or chronic back strain recovery makes structural damage permanent, forcing you to travel all the way to Kochi for major surgeries.\n\nSolution: Apex Sports Med & Rehab equips Idukki\'s athletes and hardworking plantation owners with dedicated private rooms, FDA-certified physical laser tech, and chief practitioner-led sessions mapped closely to your body’s direct structural restoration.',
  callToAction: 'Schedule practitioner consultation',
  explanation: "Utilizes Neuro-Linguistic Framing (NLF) to design clear functional restoration. Employs clinical authority and physical proof points (FDA approved robotic laser therapy, 1-on-1 private treatment rooms) to completely eliminate clinical anxiety."
};

const SAMPLE_DRAFTS: WorkspaceDraft[] = [
  {
    id: 'sample-1',
    title: 'Flow-State Instagram Announcement',
    timestamp: 'Just now',
    clientProfile: INITIAL_PROFILE,
    request: {
      framework: 'BAB',
      assetType: 'instagram',
      audienceFocus: 'Late-night coders',
      contextNotes: 'Promote our late hours (open till 11 PM) and fresh single-origin espresso.',
      wordCountLimit: 120
    },
    response: {
      primaryHeadline: 'From a blank screen to a finished launch.',
      subheadline: 'Stop fighting caffeine jitters on poor connections.',
      bodyText: 'Before: Squinting in poorly lit cafes with unstable Wi-Fi while nursing lukewarm coffee.\n\nAfter: Shipping cleaner code, sitting in full ergonomic comfort, fueled by house-roasted Monsoon Malabar single-origins.\n\nBridge: The Espresso Room at Koramangala. Built by builders, for builders. High-speed power-backed network, quiet zones, and specialty beans roasted in-house.',
      callToAction: 'Find us in 4th Block',
      explanation: 'Utilizes high visual contrast and direct task outcomes to capture tech remote workers scrolling through their social feeds.'
    }
  },
  {
    id: 'sample-2',
    title: 'Newsletter Coffee Lovers Edition',
    timestamp: '1 hour ago',
    clientProfile: INITIAL_PROFILE,
    request: {
      framework: 'FAB',
      assetType: 'email-newsletter',
      audienceFocus: 'Coffee nerds & testers',
      contextNotes: 'Highlight the single-origin process and precise roasting temperature logs.',
      wordCountLimit: 200
    },
    response: {
      primaryHeadline: 'Roasted in Koramangala. Poured for focus.',
      subheadline: 'Transparent single-origins optimized for high-cognitive output.',
      bodyText: 'Feature: Small-batch house roasting of premium single-origin Indian coffees.\n\nAdvantage: Freshness is locked in at the optimum roast profile, maximizing pure aromatics and eliminating bitter residues.\n\nBenefit: Zero acidity burn or crash-inducing jitters. Just sustained, high-focus productivity for your technical work sprints.',
      callToAction: 'Order beans online',
      explanation: 'Focuses on biochemical advantages (no jitters or crashes) which appeals heavily to remote professionals looking to optimize mental stamina.'
    }
  },
  {
    id: 'sample-3',
    title: 'High-Converting Footer / Closing CTA',
    timestamp: '2 hours ago',
    clientProfile: INITIAL_PROFILE,
    request: {
      framework: 'USP',
      assetType: 'closing-cta',
      audienceFocus: 'Koramangala tech founders & freelancers',
      contextNotes: 'Closing section with proximity urgency, rating, and SEO-friendly address log.',
      wordCountLimit: 135
    },
    response: {
      primaryHeadline: 'Find Your Flow State—2 Minutes from Koramangala 4th Block Park',
      subheadline: 'Rating: ⭐⭐⭐⭐⭐ 4.9/5 stars from 450+ Bangalore tech builders.',
      bodyText: '🚨 Proximity Hook: Located right near the 4th Block playground. Only 12 peak-hour hot-desks with dual-backup active fibers remain open for booking today.\n\n📍 Local SEO Details:\n- Address: 14, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034\n- Operating Hours: Monday – Sunday: 8:00 AM – 11:00 PM\n- Desk Booking Hotline: +91 80 4912 3670 | contact@espressoroom.in',
      callToAction: 'Book Your Focus Desk Now',
      explanation: 'Utilizes physical proximity hooks paired with exact Bangalore location details to establish high local search query response and direct conversion.'
    }
  }
];

export default function App() {
  // Application State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState<boolean>(false);
  const [activeArchetype, setActiveArchetype] = useState<string>('sportsmed');
  const [profile, setProfile] = useState<ClientProfile>(INITIAL_PROFILE);
  const [framework, setFramework] = useState<CopyFramework>('PAS');
  const [assetType, setAssetType] = useState<CopyAssetType>('landing-hero');
  const [audienceFocus, setAudienceFocus] = useState<string>('Local athletes & plantation owners');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);
  const [contextNotes, setContextNotes] = useState<string>('Emphasize absolute functional restoration, elimination of trainee hand-offs, and 1-on-1 private rooms.');
  const [wordCountLimit, setWordCountLimit] = useState<number>(ASSET_TYPES['landing-hero'].defaultLimit);

  const handleSwitchArchetype = (archetypeId: string) => {
    const found = ARCHETYPE_PRESETS.find(item => item.id === archetypeId);
    if (found) {
      setActiveArchetype(archetypeId);
      setProfile(found.profile);
      setAudienceFocus(found.defaultAudienceFocus);
      setContextNotes(found.defaultContextNotes);
      setSecondaryCtaEdit(found.secondaryCta);
      
      // Auto-populate the initial output for this preset as the viewable draft
      setGenerationResult(found.initialGeneration);
      setHeadlineEdit(found.initialGeneration.primaryHeadline || '');
      setSubheadlineEdit(found.initialGeneration.subheadline || '');
      setBodyEdit(found.initialGeneration.bodyText);
      setCtaEdit(found.initialGeneration.callToAction || '');
      setExplanationEdit(found.initialGeneration.explanation || 'Pragmatic, benefits-first setup.');
      
      setCopyFeedback(`Switched archetype to ${found.name}!`);
      setTimeout(() => setCopyFeedback(null), 2500);
    }
  };
  
  // Generation & Editor State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationResult, setGenerationResult] = useState<CopyGenerationResponse>(INITIAL_GENERATION);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Local edit states (controlled values to allow manual adjustment of copy)
  const [headlineEdit, setHeadlineEdit] = useState<string>(INITIAL_GENERATION.primaryHeadline || '');
  const [subheadlineEdit, setSubheadlineEdit] = useState<string>(INITIAL_GENERATION.subheadline || '');
  const [bodyEdit, setBodyEdit] = useState<string>(INITIAL_GENERATION.bodyText);
  const [ctaEdit, setCtaEdit] = useState<string>(INITIAL_GENERATION.callToAction || '');
  const [secondaryCtaEdit, setSecondaryCtaEdit] = useState<string>('View today\'s roast selection');
  const [explanationEdit, setExplanationEdit] = useState<string>(INITIAL_GENERATION.explanation || '');

  // Saved workspace list
  const [drafts, setDrafts] = useState<WorkspaceDraft[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [draftNotification, setDraftNotification] = useState<string | null>(null);

  // Load Saved drafts from storage or fallback to samples
  useEffect(() => {
    const saved = localStorage.getItem('espresso_copy_drafts');
    if (saved) {
      try {
        setDrafts(JSON.parse(saved));
      } catch (e) {
        setDrafts(SAMPLE_DRAFTS);
      }
    } else {
      setDrafts(SAMPLE_DRAFTS);
      localStorage.setItem('espresso_copy_drafts', JSON.stringify(SAMPLE_DRAFTS));
    }
  }, []);

  // Update target limit on asset type change
  useEffect(() => {
    setWordCountLimit(ASSET_TYPES[assetType].defaultLimit);
  }, [assetType]);

  // Handle saving to local storage
  const saveDraftsToStorage = (newList: WorkspaceDraft[]) => {
    setDrafts(newList);
    localStorage.setItem('espresso_copy_drafts', JSON.stringify(newList));
  };

  // Run proxy generation callback
  const handleGenerateCopy = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/copy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientProfile: profile,
          framework,
          assetType,
          audienceFocus,
          contextNotes,
          wordCountLimit
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const copyData: CopyGenerationResponse = await response.json();
      
      setGenerationResult(copyData);
      setHeadlineEdit(copyData.primaryHeadline || '');
      setSubheadlineEdit(copyData.subheadline || '');
      setBodyEdit(copyData.bodyText);
      setCtaEdit(copyData.callToAction || '');
      setExplanationEdit(copyData.explanation || 'Constructed with fluff-free frameworks.');
      
      // Auto success feedback
      setCopyFeedback('Generated new pristine copy!');
      setTimeout(() => setCopyFeedback(null), 3500);

    } catch (err: any) {
      console.error(err);
      const msg = err.message || '';
      if (
        msg.includes('503') || 
        msg.toLowerCase().includes('capacity') || 
        msg.toLowerCase().includes('high demand') || 
        msg.toLowerCase().includes('unavailable') ||
        msg.toLowerCase().includes('rate limit') ||
        msg.toLowerCase().includes('failed to fetch')
      ) {
        setErrorMessage(
          'Gemini is currently experiencing global high volume (Temporary Error 503). The application automatically tried multiple high-availability models with backoffs, but they are briefly saturated. Please wait a few seconds and try clicking "Generate Conversion Copy" again to route successfully!'
        );
      } else {
        setErrorMessage(msg || 'Could not connect to the copywriter generator. Please ensure your API Key is valid and stored in Settings > Secrets.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearEditor = () => {
    setHeadlineEdit('');
    setSubheadlineEdit('');
    setBodyEdit('');
    setCtaEdit('');
    setSecondaryCtaEdit('');
    setExplanationEdit('');
    setDraftNotification('Editor workspace cleared completely!');
    setTimeout(() => setDraftNotification(null), 2500);
  };

  // Add the current state to drafts
  const handleSaveToDrafts = () => {
    const draftTitle = `${ASSET_TYPES[assetType].name} (${framework})`;
    const rawTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newDraft: WorkspaceDraft = {
      id: `draft-${Date.now()}`,
      title: draftTitle,
      timestamp: rawTimestamp,
      clientProfile: profile,
      request: {
        framework,
        assetType,
        audienceFocus,
        contextNotes,
        wordCountLimit
      },
      response: {
        primaryHeadline: headlineEdit,
        subheadline: subheadlineEdit,
        bodyText: bodyEdit,
        callToAction: ctaEdit,
        explanation: explanationEdit
      }
    };

    const updated = [newDraft, ...drafts];
    saveDraftsToStorage(updated);
    
    setDraftNotification('Draft secured in local workspace!');
    setTimeout(() => setDraftNotification(null), 3000);
  };

  // Load a historic draft into active viewport
  const handleLoadDraft = (draft: WorkspaceDraft) => {
    setFramework(draft.request.framework);
    setAssetType(draft.request.assetType);
    setAudienceFocus(draft.request.audienceFocus);
    setContextNotes(draft.request.contextNotes);
    setWordCountLimit(draft.request.wordCountLimit);
    
    setGenerationResult(draft.response);
    setHeadlineEdit(draft.response.primaryHeadline || '');
    setSubheadlineEdit(draft.response.subheadline || '');
    setBodyEdit(draft.response.bodyText);
    setCtaEdit(draft.response.callToAction || '');
    setExplanationEdit(draft.response.explanation || '');

    setDraftNotification(`Loaded draft: ${draft.title}`);
    setTimeout(() => setDraftNotification(null), 2500);
  };

  // Delete draft from history
  const handleDeleteDraft = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent loading it first
    const filtered = drafts.filter(d => d.id !== id);
    saveDraftsToStorage(filtered);
    
    setDraftNotification('Draft deleted from archive.');
    setTimeout(() => setDraftNotification(null), 2000);
  };

  // Helper helper to write campaign copy instantly to clipboard
  const handleCopyToClipboard = (text: string, typeLabel: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopyFeedback(`Copied ${typeLabel} to clipboard!`);
    } catch (err) {
      // Fallback
      setCopyFeedback(`Select text to copy manually`);
    }
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  // Helper to get total word count of active editor
  const getEditorWordCount = () => {
    const combined = `${headlineEdit} ${subheadlineEdit} ${bodyEdit} ${ctaEdit}`;
    return combined.split(/\s+/).filter(w => w.length > 0).length;
  };

  // Export current draft copy to client-ready high-contrast PDF layout
  const handleExportPDF = (title?: string) => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!doc) return;

    const printTitle = title || `${ASSET_TYPES[assetType].name} (${framework})`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${printTitle}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono&display=swap');
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              color: #1a1a1a;
              background-color: #ffffff;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }

            @media print {
              body {
                padding: 10px 0;
              }
              .no-print {
                display: none !important;
              }
            }

            .header {
              border-bottom: 3px solid #C18C5D;
              padding-bottom: 20px;
              margin-bottom: 28px;
            }

            .logo-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            }

            .logo-text {
              font-family: 'Inter', sans-serif;
              font-weight: 800;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #1a1a1a;
            }

            .stamp {
              background: #F5F5F0;
              border: 1px solid #C18C5D;
              color: #C18C5D;
              font-size: 9px;
              font-weight: 700;
              padding: 3px 9px;
              border-radius: 100px;
              text-transform: uppercase;
              letter-spacing: 0.08em;
            }

            .title {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              line-height: 1.2;
              color: #111111;
              margin: 4px 0 6px 0;
            }

            .subtitle {
              font-size: 13px;
              color: #555555;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-weight: 600;
            }

            .meta-grid {
              display: grid;
              grid-template-cols: 1fr;
              background-color: #FAF9F6;
              border: 1px solid #e5e5e5;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 24px;
            }

            .meta-table {
              width: 100%;
              border-collapse: collapse;
            }

            .meta-table td {
              vertical-align: top;
              padding: 4px 8px;
            }

            .meta-label {
              font-size: 9px;
              font-weight: 700;
              text-transform: uppercase;
              color: #888888;
              display: block;
              margin-bottom: 2px;
              letter-spacing: 0.05em;
            }

            .meta-value {
              font-size: 12px;
              font-weight: 600;
              color: #222222;
            }

            .section-label {
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              color: #C18C5D;
              margin-top: 24px;
              margin-bottom: 10px;
              border-left: 3px solid #C18C5D;
              padding-left: 8px;
            }

            .headline-box {
              background-color: #FAF9F6;
              border-left: 3px solid #C18C5D;
              padding: 20px;
              border-radius: 0 8px 8px 0;
              margin-bottom: 20px;
            }

            .headline-box h3 {
              font-family: 'Playfair Display', serif;
              font-size: 20px;
              color: #1a1a1a;
              margin: 0 0 10px 0;
              line-height: 1.3;
            }

            .headline-box p {
              font-size: 13px;
              color: #555555;
              margin: 0;
              font-style: italic;
            }

            .body-copy-box {
              white-space: pre-line;
              font-size: 13.5px;
              line-height: 1.65;
              color: #2e2e2e;
              background: #ffffff;
              border: 1px solid #eeeeee;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            }

            .cta-container {
              display: grid;
              grid-template-cols: 1fr 1fr;
              gap: 16px;
              margin-bottom: 20px;
            }

            .cta-box {
              background-color: #FAF9F6;
              border: 1px dashed #C18C5D;
              padding: 12px;
              border-radius: 8px;
              text-align: center;
            }

            .cta-box .type-label {
              font-size: 8px;
              font-weight: 700;
              text-transform: uppercase;
              color: #888888;
              margin-bottom: 4px;
            }

            .cta-box .cta-text {
              font-size: 12.5px;
              font-weight: 700;
              color: #111111;
            }

            .critique-box {
              background-color: #f7fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 16px;
              margin-top: 24px;
            }

            .critique-box h4 {
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              color: #2d3748;
              margin: 0 0 6px 0;
              letter-spacing: 0.05em;
            }

            .critique-box p {
              font-size: 12.5px;
              color: #4a5568;
              margin: 0;
              font-style: italic;
              line-height: 1.5;
            }

            .footer-notes {
              margin-top: 40px;
              border-top: 1px solid #eeeeee;
              padding-top: 12px;
              font-size: 9px;
              color: #999999;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-bar">
              <span class="logo-text">The Espresso Room Copy Hub</span>
              <span class="stamp">Ready to Deploy</span>
            </div>
            <h1 class="title">Conversion Copywriting Brief</h1>
            <p class="subtitle">${ASSET_TYPES[assetType].name} Layout</p>
          </div>

          <div class="meta-grid">
            <table class="meta-table">
              <tr>
                <td style="width: 50%;">
                  <span class="meta-label">Client / Brand</span>
                  <span class="meta-value">${profile.businessName}</span>
                </td>
                <td style="width: 50%;">
                  <span class="meta-label">Location Target</span>
                  <span class="meta-value">${profile.location}</span>
                </td>
              </tr>
              <tr>
                <td style="width: 50%; padding-top: 10px;">
                  <span class="meta-label">Applied Framework</span>
                  <span class="meta-value">${FRAMEWORK_DETAILS[framework].name}</span>
                </td>
                <td style="width: 50%; padding-top: 10px;">
                  <span class="meta-label">Audience Focus</span>
                  <span class="meta-value">${audienceFocus}</span>
                </td>
              </tr>
            </table>
          </div>

          <div>
            <div class="section-label">Aesthetic Display Headings</div>
            <div class="headline-box">
              <h3>${headlineEdit || '—'}</h3>
              <p>${subheadlineEdit || '—'}</p>
            </div>
          </div>

          <div>
            <div class="section-label">Persuasive Campaign Body Copy</div>
            <div class="body-copy-box">${bodyEdit}</div>
          </div>

          <div class="cta-container">
            <div class="cta-box">
              <div class="type-label">Primary Conversion CTA</div>
              <div class="cta-text">👉 ${ctaEdit || '—'}</div>
            </div>
            <div class="cta-box">
              <div class="type-label">Secondary CTA</div>
              <div class="cta-text font-medium">🔗 ${secondaryCtaEdit || '—'}</div>
            </div>
          </div>

          <div class="critique-box">
            <h4>Elite Copywriting Critique & Conversion Context</h4>
            <p>"${explanationEdit || 'Engineered directly around physical benefit proof points keeping bounce rates minimal.'}"</p>
          </div>

          <div class="footer-notes">
            <span>© ${new Date().getFullYear()} The Espresso Room Bangalore. Shared via Copywriting Console.</span>
            <span>Uncompromised, fluff-free conversion writing.</span>
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(function() {
                try {
                  window.print();
                } catch (e) {
                  console.error(e);
                }
              }, 400);
            };
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();

    // Notify user of export
    setDraftNotification('PDF Print Brief triggered successfully!');
    setTimeout(() => setDraftNotification(null), 3000);

    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 8000);
  };

  // Direct print a stored archive draft instantly without overriding active edits
  const handleDirectPrintDraft = (draft: WorkspaceDraft, e: React.MouseEvent) => {
    e.stopPropagation();
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!doc) return;

    const printTitle = draft.title;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${printTitle}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono&display=swap');
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              color: #1a1a1a;
              background-color: #ffffff;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }

            @media print {
              body {
                padding: 10px 0;
              }
            }

            .header {
              border-bottom: 3px solid #C18C5D;
              padding-bottom: 20px;
              margin-bottom: 28px;
            }

            .logo-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            }

            .logo-text {
              font-family: 'Inter', sans-serif;
              font-weight: 800;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #1a1a1a;
            }

            .stamp {
              background: #F5F5F0;
              border: 1px solid #C18C5D;
              color: #C18C5D;
              font-size: 9px;
              font-weight: 700;
              padding: 3px 9px;
              border-radius: 100px;
              text-transform: uppercase;
              letter-spacing: 0.08em;
            }

            .title {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              line-height: 1.2;
              color: #111111;
              margin: 4px 0 6px 0;
            }

            .subtitle {
              font-size: 13px;
              color: #555555;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-weight: 600;
            }

            .meta-grid {
              display: grid;
              grid-template-cols: 1fr;
              background-color: #FAF9F6;
              border: 1px solid #e5e5e5;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 24px;
            }

            .meta-table {
              width: 100%;
              border-collapse: collapse;
            }

            .meta-table td {
              vertical-align: top;
              padding: 4px 8px;
            }

            .meta-label {
              font-size: 9px;
              font-weight: 700;
              text-transform: uppercase;
              color: #888888;
              display: block;
              margin-bottom: 2px;
              letter-spacing: 0.05em;
            }

            .meta-value {
              font-size: 12px;
              font-weight: 600;
              color: #222222;
            }

            .section-label {
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              color: #C18C5D;
              margin-top: 24px;
              margin-bottom: 10px;
              border-left: 3px solid #C18C5D;
              padding-left: 8px;
            }

            .headline-box {
              background-color: #FAF9F6;
              border-left: 3px solid #C18C5D;
              padding: 20px;
              border-radius: 0 8px 8px 0;
              margin-bottom: 20px;
            }

            .headline-box h3 {
              font-family: 'Playfair Display', serif;
              font-size: 20px;
              color: #1a1a1a;
              margin: 0 0 10px 0;
              line-height: 1.3;
            }

            .headline-box p {
              font-size: 13px;
              color: #555555;
              margin: 0;
              font-style: italic;
            }

            .body-copy-box {
              white-space: pre-line;
              font-size: 13.5px;
              line-height: 1.65;
              color: #2e2e2e;
              background: #ffffff;
              border: 1px solid #eeeeee;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            }

            .cta-container {
              display: grid;
              grid-template-cols: 1fr;
              margin-bottom: 20px;
            }

            .cta-box {
              background-color: #FAF9F6;
              border: 1px dashed #C18C5D;
              padding: 12px;
              border-radius: 8px;
              text-align: center;
            }

            .cta-box .type-label {
              font-size: 8px;
              font-weight: 700;
              text-transform: uppercase;
              color: #888888;
              margin-bottom: 4px;
            }

            .cta-box .cta-text {
              font-size: 12.5px;
              font-weight: 700;
              color: #111111;
            }

            .critique-box {
              background-color: #f7fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 16px;
              margin-top: 24px;
            }

            .critique-box h4 {
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              color: #2d3748;
              margin: 0 0 6px 0;
              letter-spacing: 0.05em;
            }

            .critique-box p {
              font-size: 12.5px;
              color: #4a5568;
              margin: 0;
              font-style: italic;
              line-height: 1.5;
            }

            .footer-notes {
              margin-top: 40px;
              border-top: 1px solid #eeeeee;
              padding-top: 12px;
              font-size: 9px;
              color: #999999;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-bar">
              <span class="logo-text">The Espresso Room Copy Hub</span>
              <span class="stamp">Ready to Deploy</span>
            </div>
            <h1 class="title">Conversion Copywriting Brief</h1>
            <p class="subtitle">${draft.title}</p>
          </div>

          <div class="meta-grid">
            <table class="meta-table">
              <tr>
                <td style="width: 50%;">
                  <span class="meta-label">Client / Brand</span>
                  <span class="meta-value">${draft.clientProfile.businessName}</span>
                </td>
                <td style="width: 50%;">
                  <span class="meta-label">Location Target</span>
                  <span class="meta-value">${draft.clientProfile.location}</span>
                </td>
              </tr>
              <tr>
                <td style="width: 50%; padding-top: 10px;">
                  <span class="meta-label">Applied Framework</span>
                  <span class="meta-value">${draft.request.framework}</span>
                </td>
                <td style="width: 50%; padding-top: 10px;">
                  <span class="meta-label">Audience Focus</span>
                  <span class="meta-value">${draft.request.audienceFocus}</span>
                </td>
              </tr>
            </table>
          </div>

          <div>
            <div class="section-label">Aesthetic Display Headings</div>
            <div class="headline-box">
              <h3>${draft.response.primaryHeadline || '—'}</h3>
              <p>${draft.response.subheadline || '—'}</p>
            </div>
          </div>

          <div>
            <div class="section-label">Persuasive Campaign Body Copy</div>
            <div class="body-copy-box">${draft.response.bodyText}</div>
          </div>

          <div class="cta-container">
            <div class="cta-box">
              <div class="type-label">Primary Conversion CTA</div>
              <div class="cta-text">👉 ${draft.response.callToAction || '—'}</div>
            </div>
          </div>

          <div class="critique-box">
            <h4>Elite Copywriting Critique & Conversion Context</h4>
            <p>"${draft.response.explanation || 'Engineered directly around physical benefit proof points keeping bounce rates minimal.'}"</p>
          </div>

          <div class="footer-notes">
            <span>© ${new Date().getFullYear()} The Espresso Room Bangalore. Shared via Copywriting Console.</span>
            <span>Uncompromised, fluff-free conversion writing.</span>
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(function() {
                try {
                  window.print();
                } catch (e) {
                  console.error(e);
                }
              }, 400);
            };
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();

    setDraftNotification(`Exporting ${draft.title} directly...`);
    setTimeout(() => setDraftNotification(null), 3000);

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 8000);
  };

  const filteredDrafts = drafts.filter(draft => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const titleMatch = draft.title?.toLowerCase().includes(query) || false;
    const clientMatch = draft.clientProfile?.businessName?.toLowerCase().includes(query) || false;
    return titleMatch || clientMatch;
  });

  return (
    <div id="app-root" className="min-h-screen bg-theme-bg text-theme-text font-sans p-4 md:p-8 flex flex-col antialiased transition-colors duration-200">
      
      {/* Breadcrumb Navigation Trail */}
      <nav className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-theme-muted mb-6">
        <span className="hover:text-theme-text transition-colors cursor-pointer">Home</span>
        <span className="text-theme-muted/50 select-none">/</span>
        <span className="text-[#C18C5D] font-bold">Copywriting Console</span>
        <span className="text-theme-muted/50 select-none">/</span>
        <span className="text-theme-text font-semibold">{profile.businessName}</span>
      </nav>

      {/* Global Search Bar */}
      <div className="w-full mb-8 max-w-xl">
        <div className="relative animate-fade-in">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
          <input
            id="global-draft-search"
            type="text"
            placeholder="Search saved drafts by title or client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-theme-panel hover:bg-theme-panel-hover border border-theme-border rounded-full pl-11 pr-10 py-2.5 text-xs text-theme-text placeholder-theme-muted/65 focus:outline-none focus:border-[#C18C5D] transition-all duration-200 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="mt-2 px-4 text-[10px] font-mono uppercase tracking-wider text-theme-muted flex items-center justify-between">
            <span>Found {filteredDrafts.length} matching {filteredDrafts.length === 1 ? 'draft' : 'drafts'}</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#C18C5D] hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Header Banner */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8" style={{ marginRight: '109px' }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 bg-[#C18C5D] rounded-xl flex items-center justify-center font-bold text-black text-xs shadow-lg shadow-[#C18C5D]/10 px-1 text-center font-mono uppercase"
            style={{ fontStyle: 'normal', fontWeight: 'bold', fontFamily: 'Times New Roman', width: '36px', height: '36px', fontSize: '8px' }}
          >
            {profile.businessName.split(' ').map(w => w[0]).join('') || 'AP'}
          </div>
          <div>
            <h1 
              className="text-xl md:text-2xl font-black tracking-tight uppercase flex items-center gap-2"
              style={{ width: '256.219px' }}
            >
              {profile.businessName} <span className="text-xs bg-[#C18C5D]/20 text-[#C18C5D] border border-[#C18C5D]/30 py-0.5 px-2.5 rounded-full lowercase tracking-normal" style={{ backgroundColor: '#452106', width: '85.5312px' }}>copywriting console</span>
            </h1>
            <p 
              className="text-xs text-theme-muted tracking-wide uppercase font-semibold"
              style={{ width: '251.219px' }}
            >
              {profile.industry} • Conversion Engine
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 self-stretch md:self-auto flex-wrap sm:flex-nowrap">
          {draftNotification && (
            <div className="px-4 py-2 bg-theme-card border border-theme-border rounded-full text-xs text-[#C18C5D] flex items-center gap-1.5 animate-pulse">
              <Check className="w-3 h-3" />
              <span>{draftNotification}</span>
            </div>
          )}

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-3.5 py-2.5 bg-theme-panel hover:bg-theme-panel-hover border border-theme-border rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 text-theme-text"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{ height: '33px', width: '86.4375px' }}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dark</span>
              </>
            )}
          </button>
          
          <button 
            onClick={() => handleExportPDF()}
            className="flex-1 md:flex-none px-4 py-2.5 bg-[#C18C5D]/10 hover:bg-[#C18C5D]/20 border border-[#C18C5D]/30 text-[#C18C5D] rounded-full font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
            style={{ width: '136.578px', fontSize: '10px' }}
          >
            <Printer className="w-3.5 h-3.5 text-[#C18C5D]" />
            <span>Export PDF Client Brief</span>
          </button>

          <button 
            onClick={() => handleCopyToClipboard(
              `Headline: ${headlineEdit}\nSubheadline: ${subheadlineEdit}\n\nBody:\n${bodyEdit}\n\nCTA: ${ctaEdit}`,
              'Complete asset bundle'
            )}
            className="flex-1 md:flex-none px-4 py-2.5 bg-theme-panel hover:bg-theme-panel-hover border border-theme-border rounded-full font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
            style={{ fontSize: '10px', width: '131.906px' }}
          >
            <Clipboard className="w-3.5 h-3.5 text-theme-text/60" />
            <span>Copy Full Package</span>
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow items-stretch">
        
        {/* PANEL 1: CLIENT BIOS & INFRASTRUCTURE (Span 4) */}
        <section id="bento-client-bio" className="lg:col-span-4 bg-theme-panel border border-theme-border rounded-3xl p-6 flex flex-col justify-between hover:border-theme-border-hover transition-all duration-300">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-[#C18C5D]/15 border border-[#C18C5D]/30 text-[#C18C5D] text-[10px] font-bold rounded-full uppercase tracking-widest">
                Client Profile
              </span>
              <span className="text-[10px] opacity-40 uppercase tracking-widest font-mono text-theme-muted">
                Locked & Memorized
              </span>
            </div>

            {/* Archetype Quick Selector */}
            <div className="mb-6 bg-theme-card p-2 rounded-2xl border border-theme-border space-y-1.5">
              <span className="block text-[9px] font-bold uppercase tracking-widest text-[#C18C5D] px-1">
                Select Client Archetype:
              </span>
              <div className="grid grid-cols-4 gap-1">
                {ARCHETYPE_PRESETS.map((preset) => {
                  const isSelected = activeArchetype === preset.id;
                  let IconComponent = Coffee;
                  if (preset.id === 'clinic') IconComponent = Shield;
                  if (preset.id === 'salon') IconComponent = Scissors;
                  if (preset.id === 'sportsmed') IconComponent = Activity;

                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSwitchArchetype(preset.id)}
                      className={`py-2 px-1 transition-all duration-200 rounded-xl text-[9px] font-bold uppercase tracking-wide flex flex-col items-center gap-1 border ${
                        isSelected
                          ? 'bg-[#C18C5D] text-black border-[#C18C5D] shadow-md'
                          : 'bg-theme-panel text-theme-muted border-theme-border hover:text-theme-text hover:bg-theme-panel-hover'
                      }`}
                      title={`Switch to ${preset.name}`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span 
                        className="truncate max-w-[50px]"
                        style={preset.id === 'clinic' ? { fontSize: '8px' } : undefined}
                      >
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <h2 className="text-3xl font-black uppercase text-[#F5F5F0] tracking-wide mb-2 leading-none">
              {profile.businessName}
            </h2>
            <p className="text-sm opacity-60 italic mb-6">
              {profile.industry}
            </p>
 
            <div className="space-y-5">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C18C5D]" /> Location
                </h3>
                <p className="text-sm font-medium">{profile.location}</p>
              </div>
 
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Core Audience Target
                </h3>
                <p className="text-sm">{profile.targetAudience}</p>
              </div>
 
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  Verifiable Infrastructure Benefits
                </h3>
                <ul className="space-y-2">
                  {profile.differentiators.map((diff, index) => (
                    <li key={index} className="text-xs flex items-start gap-2 text-white/80">
                      <span className="text-[#C18C5D] font-bold text-xs mt-0.5">•</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
 
              <div className="pt-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Branded Vector Tone
                </h3>
                <p className="text-xs font-semibold px-2.5 py-1.5 bg-[#252525] border border-white/5 rounded-lg text-[#C18C5D] inline-block">
                  {profile.toneOfVoice}
                </p>
              </div>
            </div>
          </div>
 
          <div className="mt-8 pt-4 border-t border-white/5 grid grid-cols-3 gap-2">
            {activeArchetype === 'cafe' && (
              <>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Wifi className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Uptime</div>
                  <div className="text-xs font-bold text-emerald-400">99.9%</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <VolumeX className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Quiet Zone</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">Floor 2</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Coffee className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Beans</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">Roasted</div>
                </div>
              </>
            )}
            {activeArchetype === 'clinic' && (
              <>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Shield className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Sanitation</div>
                  <div className="text-xs font-bold text-emerald-400">ISO Class 1</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Activity className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Setup</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">Pain-Free</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Heart className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Doctors</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">Certified</div>
                </div>
              </>
            )}
            {activeArchetype === 'salon' && (
              <>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Scissors className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Stylists</div>
                  <div className="text-xs font-bold text-emerald-400">Top 1% Elite</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Activity className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Aesthetics</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">Ultrasonic</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Heart className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Formula</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">Botanical</div>
                </div>
              </>
            )}
            {activeArchetype === 'sportsmed' && (
              <>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Shield className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Treatment</div>
                  <div className="text-xs font-bold text-emerald-400">1-on-1 Private</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Activity className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Robotic Laser</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">US-FDA Approved</div>
                </div>
                <div className="bg-[#212121] rounded-xl p-3 text-center">
                  <Heart className="w-4 h-4 text-[#C18C5D] mx-auto mb-1" />
                  <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Schedules</div>
                  <div className="text-xs font-bold text-[#F5F5F0]">Practitioner-Led</div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* PANEL 2: CONSOLE GENERATOR COMMANDS (Span 4) */}
        <section id="bento-controls" className="lg:col-span-4 bg-theme-panel border border-theme-border rounded-3xl p-6 flex flex-col justify-between hover:border-theme-border-hover transition-all duration-300">
          <div className="space-y-6 text-theme-text">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-bold uppercase tracking-widest text-theme-muted">
                Payload Inputs & Strategy
              </h2>
              <Sparkles className="w-4 h-4 text-[#C18C5D] animate-pulse" />
            </div>

            {/* Asset selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-2">
                Conversion Target / Asset Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(ASSET_TYPES) as CopyAssetType[]).map((type) => {
                  const info = ASSET_TYPES[type];
                  const isSelected = assetType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setAssetType(type)}
                      className={`text-left p-3 rounded-2xl border text-xs font-medium transition-all duration-150 flex flex-col justify-between gap-2 h-20 ${
                        isSelected 
                          ? 'bg-[#C18C5D] text-black border-[#C18C5D]' 
                          : 'bg-theme-card text-theme-text border-theme-border hover:border-theme-border-hover'
                      }`}
                    >
                      <span className="opacity-70 text-[9px] uppercase tracking-wider leading-none">
                        Asset Format
                      </span>
                      <span className="font-bold truncate leading-tight">
                        {info.name.replace(' Section', '').replace(' Update', '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Copywriter Frameworks selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-2">
                Persuasive Copy Framework
              </label>
              <div className="grid grid-cols-5 gap-1.5 bg-theme-input p-1 rounded-xl border border-theme-border">
                {(Object.keys(FRAMEWORK_DETAILS) as CopyFramework[]).map((fCode) => (
                  <button
                    key={fCode}
                    onClick={() => setFramework(fCode)}
                    className={`py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-150 ${
                      framework === fCode 
                        ? 'bg-theme-panel text-[#C18C5D] shadow-sm' 
                        : 'text-theme-muted hover:text-theme-text'
                    }`}
                    title={FRAMEWORK_DETAILS[fCode].name}
                  >
                    {fCode}
                  </button>
                ))}
              </div>
            </div>

            {/* Target segment focusing */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-1.5">
                Target Segment Focus / Subheading Context
              </label>
              <input
                type="text"
                value={audienceFocus}
                onChange={(e) => setAudienceFocus(e.target.value)}
                placeholder="e.g. Freelancers shipping before 10 AM, Coffee lovers"
                className="w-full bg-theme-input border border-theme-input-border rounded-xl px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-[#C18C5D] transition-colors"
              />
            </div>

            {/* Campaign context notes */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-1.5">
                Campaign Objective & Context Notes
              </label>
              <textarea
                value={contextNotes}
                onChange={(e) => setContextNotes(e.target.value)}
                placeholder="Give details about the specific promo, item, or call to action..."
                rows={3}
                className="w-full bg-theme-input border border-theme-input-border rounded-xl p-3 text-xs text-theme-text focus:outline-none focus:border-[#C18C5D] transition-colors resize-none"
              />
            </div>

            {/* Word limit selector */}
            <div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-1">
                <span>Maximum Target Word Count</span>
                <span className="text-[#C18C5D] font-mono">{wordCountLimit} words</span>
              </div>
              <input
                type="range"
                min={30}
                max={300}
                step={10}
                value={wordCountLimit}
                onChange={(e) => setWordCountLimit(Number(e.target.value))}
                className="w-full accent-[#C18C5D] bg-[#252525] h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-6">
            {errorMessage && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-2xl text-xs text-red-300 mb-3 flex items-start gap-2">
                <span className="font-bold flex-shrink-0">⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleGenerateCopy}
              disabled={isGenerating}
              className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                isGenerating 
                  ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                  : 'bg-[#C18C5D] hover:bg-[#b07e50] text-[#0F0F0F] shadow-lg shadow-[#C18C5D]/10'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Drafting Copy via Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Conversion Copy</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* PANEL 3 & 4 (Combined in Layout): DYNAMIC COPYWRITER PRISTINE GENERATOR & EDITOR (Span 8) */}
        <section id="bento-engine" className="lg:col-span-8 flex flex-col gap-6 text-theme-text">
          
          {/* Main Workspace Frame */}
          <div className="bg-theme-panel border border-theme-border rounded-3xl p-6 flex flex-col justify-between flex-grow hover:border-theme-border-hover transition-all duration-300">
            <div className="space-y-6">
              
              {/* Workspace Header Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-theme-text">
                    Pristine Copywriter Editor
                  </h2>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono opacity-60 text-theme-muted">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C18C5D]" />
                    <span>Framework: <strong className="text-theme-text">{framework}</strong></span>
                  </span>
                  
                  <span className="w-px h-3 bg-white/10"></span>
                  
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#C18C5D]" />
                    <span>
                      Words: <strong className={getEditorWordCount() > wordCountLimit ? 'text-amber-400' : 'text-emerald-400'}>
                        {getEditorWordCount()}
                      </strong> / {wordCountLimit}
                    </span>
                  </span>
                </div>
              </div>

              {/* LIVE TACTILE EDITOR INPUTS */}
              <div className="space-y-4">
                
                {/* Headline input (conditionally displayed if available in response) */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-theme-muted">
                      {assetType === 'closing-cta' ? 'Urgency- / Proximity-Based Hook' : 'Primary Headline (Pattern Disruptor)'}
                    </label>
                    <button 
                      onClick={() => handleCopyToClipboard(headlineEdit, assetType === 'closing-cta' ? 'Urgency Hook' : 'Headline')}
                      className="text-[10px] text-[#C18C5D] hover:underline flex items-center gap-1 font-semibold"
                    >
                      Copy
                    </button>
                  </div>
                  <input
                    type="text"
                    value={headlineEdit}
                    onChange={(e) => setHeadlineEdit(e.target.value)}
                    className="w-full bg-theme-input border border-theme-input-border rounded-xl px-4 py-3 text-sm font-bold text-theme-text focus:outline-none focus:border-[#C18C5D] bg-theme-bg"
                    placeholder={assetType === 'closing-cta' ? "e.g., Only 12 peak-hour desks remain today (2 mins from Koramangala park)..." : "Provide a pattern disruptor headline..."}
                  />
                </div>

                {/* Subheadline input (conditionally shown) */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-theme-muted">
                      {assetType === 'closing-cta' ? 'Trust-Building Micro-Copy (Social Proof)' : 'Subheadline (Immediate Functional Benefit)'}
                    </label>
                    <button 
                      onClick={() => handleCopyToClipboard(subheadlineEdit, assetType === 'closing-cta' ? 'Social Proof' : 'Subheadline')}
                      className="text-[10px] text-[#C18C5D] hover:underline flex items-center gap-1 font-semibold"
                    >
                      Copy
                    </button>
                  </div>
                  <input
                    type="text"
                    value={subheadlineEdit}
                    onChange={(e) => setSubheadlineEdit(e.target.value)}
                    className="w-full bg-theme-input border border-theme-input-border rounded-xl px-4 py-2.5 text-xs text-theme-text focus:outline-none focus:border-[#C18C5D] bg-theme-bg"
                    placeholder={assetType === 'closing-cta' ? "e.g., Rated 4.9/5 stars by 400+ Bangalore remote engineers." : "Provide subtext highlighting immediate value props..."}
                  />
                </div>

                {/* Core Framework Body Statement */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-theme-muted">
                      {assetType === 'closing-cta' ? 'Local SEO Details (Address, Hours, Contact)' : `Persuasive Body Copy (Structured by ${framework})`}
                    </label>
                    <button 
                      onClick={() => handleCopyToClipboard(bodyEdit, assetType === 'closing-cta' ? 'Local SEO Details' : 'Body Copy')}
                      className="text-[10px] text-[#C18C5D] hover:underline flex items-center gap-1 font-semibold"
                    >
                      Copy
                    </button>
                  </div>
                  <textarea
                    value={bodyEdit}
                    onChange={(e) => setBodyEdit(e.target.value)}
                    rows={6}
                    className="w-full bg-theme-input border border-theme-input-border rounded-xl p-4 text-xs leading-relaxed text-theme-text focus:outline-none focus:border-[#C18C5D] font-mono resize-y bg-theme-bg"
                    placeholder={assetType === 'closing-cta' ? "e.g., 14, 80 Feet Rd, Koramangala...\nOpen Mon-Sun: 8:00 AM - 11:00 PM\nHotline: +91 80 4912 3670" : "Persuasive body block..."}
                  />
                </div>

                {/* Low friction Action/CTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inputs Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-1.5">
                        Primary Conversion CTA Button
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={ctaEdit}
                          onChange={(e) => setCtaEdit(e.target.value)}
                          className="w-full bg-theme-input border border-theme-input-border rounded-xl px-4 py-2.5 text-xs text-theme-text focus:outline-none focus:border-[#C18C5D] font-semibold bg-theme-bg"
                          placeholder="Primary CTA Label"
                        />
                        <button 
                          onClick={() => handleCopyToClipboard(ctaEdit, 'Primary CTA')}
                          className="p-2.5 bg-theme-card border border-theme-border rounded-xl text-xs text-[#C18C5D] hover:text-theme-text"
                          title="Copy Primary CTA"
                        >
                          <Clipboard className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#C18C5D] mb-1.5">
                        Secondary (Low-friction Alternate) CTA
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={secondaryCtaEdit}
                          onChange={(e) => setSecondaryCtaEdit(e.target.value)}
                          className="w-full bg-theme-input border border-theme-input-border rounded-xl px-4 py-2.5 text-xs text-theme-text focus:outline-none focus:border-[#C18C5D] font-medium bg-theme-bg"
                          placeholder="Secondary CTA..."
                        />
                        <button 
                          onClick={() => handleCopyToClipboard(secondaryCtaEdit, 'Secondary CTA')}
                          className="p-2.5 bg-theme-card border border-theme-border rounded-xl text-xs text-[#C18C5D] hover:text-theme-text"
                          title="Copy Secondary CTA"
                        >
                          <Clipboard className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Preview Panel */}
                  <div className="flex flex-col justify-center bg-theme-card/30 rounded-2xl border border-theme-border p-4">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-3 text-center">
                      Interactive Button Stack Preview
                    </span>
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                      <button className="w-full sm:w-auto px-5 py-3 bg-[#C18C5D] text-black rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-[#b07e50] transition-all">
                        <span>{ctaEdit || 'Primary Action'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      
                      <button className="w-full sm:w-auto px-5 py-3 bg-theme-panel text-theme-text border border-theme-border rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center hover:bg-theme-panel-hover transition-all">
                        <span>{secondaryCtaEdit || 'Secondary offer'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Elite Copywriters critique / reasoning */}
                <div className="bg-theme-card border border-theme-border rounded-xl p-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C18C5D] mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Copywriter’s Direct Critique
                  </h3>
                  <p className="text-xs text-theme-text/80 italic leading-relaxed">
                    {explanationEdit}
                  </p>
                </div>

              </div>
            </div>

            {/* Trigger actions */}
            <div className="mt-8 pt-4 border-t border-theme-border flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-theme-muted">
                {copyFeedback ? (
                  <span className="text-emerald-400 font-semibold">{copyFeedback}</span>
                ) : (
                  <span>Tweak in-line to adjust for exact layout spacing.</span>
                )}
              </div>
              
              <button
                onClick={handleSaveToDrafts}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#C18C5D] hover:bg-[#b07e50] text-black text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#C18C5D]/10"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft To Workspace</span>
              </button>
            </div>
          </div>
          
          {/* Detailed step framework explanation */}
          <div className="bg-theme-panel border border-theme-border rounded-3xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-theme-muted mb-3 block">
              Active Blueprint Guide: {FRAMEWORK_DETAILS[framework].name}
            </h3>
            <p className="text-xs text-theme-text/80 mb-4 leading-relaxed">
              {FRAMEWORK_DETAILS[framework].description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {FRAMEWORK_DETAILS[framework].steps.map((step, idx) => {
                const parts = step.split(':');
                return (
                  <div key={idx} className="bg-theme-card p-3 rounded-2xl border border-theme-border">
                    <div className="text-theme-muted text-[9px] uppercase tracking-wider font-mono mb-1">
                      Step {idx + 1}
                    </div>
                    <div className="text-xs font-bold text-[#C18C5D] mb-1">{parts[0]}</div>
                    <div className="text-[11px] text-theme-text/90 leading-relaxed">{parts[1] || ''}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PANEL 5: SAVED HISTORY ARCHIVE & LOGS */}
          <div className="bg-theme-panel border border-theme-border rounded-3xl p-6 hover:border-theme-border-hover transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-theme-text">
                  Workspace Local Draft Archive
                </h3>
                <p className="text-xs text-[#C18C5D] mt-0.5">
                  Saved options, revisions, and custom client variants ({drafts.length} secured)
                </p>
              </div>
              <span className="text-[10px] text-theme-muted uppercase font-mono bg-theme-card px-2 py-1 rounded-md border border-theme-border">
                Secured in Browser
              </span>
            </div>

            {filteredDrafts.length === 0 ? (
              <div className="text-center py-8 bg-theme-card rounded-3xl border border-dashed border-theme-border">
                <p className="text-xs text-theme-muted">
                  {drafts.length === 0 
                    ? "No drafts in local archive. Save current copywriting bundle above!" 
                    : "No saved drafts match your search Query."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDrafts.map((draft) => (
                  <div 
                    key={draft.id}
                    onClick={() => handleLoadDraft(draft)}
                    className="p-4 bg-theme-card hover:bg-theme-panel-hover border border-theme-border hover:border-[#C18C5D]/30 rounded-2xl cursor-pointer transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-bold text-xs uppercase text-theme-text truncate group-hover:text-[#C18C5D] transition-colors">
                          {draft.title}
                        </span>
                        
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[9px] text-[#C18C5D] bg-[#C18C5D]/10 border border-[#C18C5D]/20 px-1.5 py-0.5 rounded uppercase font-bold font-mono">
                            {draft.request.framework}
                          </span>
                          <button
                            onClick={(e) => handleDirectPrintDraft(draft, e)}
                            className="p-1 text-theme-muted hover:text-[#C18C5D] hover:bg-theme-panel rounded transition-colors"
                            title="Export draft directly to PDF"
                          >
                            <Printer className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteDraft(draft.id, e)}
                            className="p-1 text-theme-muted/80 hover:text-red-400 hover:bg-theme-panel rounded transition-colors"
                            title="Delete draft"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-theme-muted mb-3 font-mono line-clamp-3 leading-relaxed">
                        {draft.response.primaryHeadline} — {draft.response.bodyText.replace(/Problem:|Agitate:|Solve:|Before:|After:|Bridge:|Feature:|Advantage:|Benefit:/g, '')}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-theme-border text-[9px] text-theme-muted font-mono">
                      <span>Audience: {draft.request.audienceFocus || 'General'}</span>
                      <span className="flex items-center gap-1 font-sans">
                        <Clock className="w-3 h-3 text-[#C18C5D]" /> {draft.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </section>

      </main>

      {/* Decorative footer */}
      <footer className="mt-12 pt-6 border-t border-theme-border flex justify-between items-center text-[10px] text-theme-muted tracking-wider">
        <span>{profile.businessName} Copywriting Console • {profile.location.split(',').slice(-2).join(', ').trim() || 'Kerala'}</span>
        <span>Version 1.0.0 (Tactile Bento Theme)</span>
      </footer>

      {/* Quick Action Floating Menu */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
        {isQuickMenuOpen && (
          <div className="flex flex-col gap-2 items-end bg-theme-panel/95 backdrop-blur-md border border-theme-border p-3 rounded-2xl shadow-2xl animate-fade-in divide-y divide-theme-border flex-wrap min-w-[200px]">
            <div className="px-2 py-1 text-[9px] font-bold tracking-widest text-[#C18C5D] uppercase font-mono mb-1 w-full text-right">
              Console Quick Actions
            </div>
            
            <button
              onClick={() => {
                handleSaveToDrafts();
                setIsQuickMenuOpen(false);
              }}
              className="w-full flex items-center justify-between text-left text-xs text-theme-text hover:text-[#C18C5D] py-2 px-2 rounded-xl hover:bg-theme-card/50 transition-all group cursor-pointer"
            >
              <span className="font-medium group-hover:translate-x-1 transition-transform">Save Current Draft</span>
              <Save className="w-3.5 h-3.5 text-[#C18C5D]" />
            </button>

            <button
              onClick={() => {
                handleClearEditor();
                setIsQuickMenuOpen(false);
              }}
              className="w-full flex items-center justify-between text-left text-xs text-theme-text hover:text-red-400 py-2 px-2 rounded-xl hover:bg-theme-card/50 transition-all group cursor-pointer pt-2"
            >
              <span className="font-medium group-hover:translate-x-1 transition-transform">Clear Editor Workspace</span>
              <Trash2 className="w-3.5 h-3.5 text-theme-muted group-hover:text-red-400 transition-colors" />
            </button>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsQuickMenuOpen(false);
              }}
              className="w-full flex items-center justify-between text-left text-xs text-theme-text hover:text-cyan-400 py-2 px-2 rounded-xl hover:bg-theme-card/50 transition-all group cursor-pointer pt-2"
            >
              <span className="font-medium group-hover:translate-x-1 transition-transform font-mono text-[10px]">Scroll To Top</span>
              <Activity className="w-3.5 h-3.5 text-theme-muted group-hover:text-cyan-400 transition-colors" />
            </button>
          </div>
        )}

        <button
          onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
          className={`p-3.5 bg-[#C18C5D] text-black hover:bg-[#b07e50] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C18C5D]/40 cursor-pointer ${
            isQuickMenuOpen ? 'rotate-90 scale-105' : ''
          }`}
          title="Quick Action Console Menu"
        >
          {isQuickMenuOpen ? <X className="w-5 h-5" /> : <Zap className="w-5 h-5 fill-black" />}
        </button>
      </div>

    </div>
  );
}
