/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ClientProfile {
  businessName: string;
  industry: string;
  location: string;
  targetAudience: string;
  differentiators: string[];
  toneOfVoice: string;
}

export type CopyFramework = 'PAS' | 'AIDA' | 'BAB' | 'FAB' | 'USP';

export type CopyAssetType = 
  | 'landing-hero' 
  | 'instagram' 
  | 'google-business' 
  | 'email-newsletter' 
  | 'whatsapp-sms' 
  | 'menu-item'
  | 'closing-cta';

export interface CopyGenerationRequest {
  clientProfile: ClientProfile;
  framework: CopyFramework;
  assetType: CopyAssetType;
  audienceFocus: string;
  contextNotes: string;
  wordCountLimit: number;
}

export interface CopyGenerationResponse {
  primaryHeadline?: string;
  subheadline?: string;
  bodyText: string;
  callToAction?: string;
  explanation?: string;
}

export interface WorkspaceDraft {
  id: string;
  title: string;
  timestamp: string;
  clientProfile: ClientProfile;
  request: Omit<CopyGenerationRequest, 'clientProfile'>;
  response: CopyGenerationResponse;
}

export const FRAMEWORK_DETAILS: Record<CopyFramework, { name: string; description: string; steps: string[] }> = {
  PAS: {
    name: 'PAS (Problem-Agitate-Solve)',
    description: 'Hook readers by identifying their immediate paint point, dig into why it frustrates them, and resolve it cleanly with your offer.',
    steps: ['Problem: State the core frustration.', 'Agitate: Build emotional and logical tension around that frustration.', 'Solve: Present the practical solution.']
  },
  AIDA: {
    name: 'AIDA (Attention-Interest-Desire-Action)',
    description: 'Take prospects through a persuasive funnel: arrest attention, build functional interest, make them crave the result, and trigger a clear action.',
    steps: ['Attention: Break pattern with a strong hook.', 'Interest: Share facts, stats, or concrete benefits.', 'Desire: Paint the picture of a better scenario.', 'Action: Clear, single instruction on what to do next.']
  },
  BAB: {
    name: 'BAB (Before-After-Bridge)',
    description: 'Contrast their current messy world with a perfect, streamlined outcome. The bridge is your business.',
    steps: ['Before: Their current, unoptimized situation.', 'After: The frictionless, desirable future.', 'Bridge: How we safely and instantly take them there.']
  },
  FAB: {
    name: 'FAB (Feature-Advantage-Benefit)',
    description: 'Translate features into actual real-life advantages and emotional, practical benefits for the customer.',
    steps: ['Feature: Technical fact/detail of what we offer.', 'Advantage: What that feature does better than rivals.', 'Benefit: Why the customer should actually care (time/money saved, comfort/health gained).']
  },
  USP: {
    name: 'Benefit-Driven USP',
    description: 'Direct, clear statement of your unique selling proposition. Completely fluff-free, presenting raw features and direct impact headers.',
    steps: ['Headline: Bold statement of specific value.', 'Bullet Benefits: Concrete proof points without filler.', 'Urgency CTA: Friendly, low-rub path to try.']
  }
};

export const ASSET_TYPES: Record<CopyAssetType, { name: string; icon: string; defaultLimit: number }> = {
  'landing-hero': { name: 'Landing Page Hero Section', icon: 'LayoutTemplate', defaultLimit: 120 },
  'instagram': { name: 'Instagram Hook & Post', icon: 'Instagram', defaultLimit: 150 },
  'google-business': { name: 'Google Business Profile Update', icon: 'MapPin', defaultLimit: 200 },
  'email-newsletter': { name: 'Email Newsletter / Campaign', icon: 'Mail', defaultLimit: 250 },
  'whatsapp-sms': { name: 'WhatsApp / SMS Alert', icon: 'MessageSquare', defaultLimit: 60 },
  'menu-item': { name: 'Specialty Menu Item Copy', icon: 'Coffee', defaultLimit: 100 },
  'closing-cta': { name: 'Footer / Closing CTA', icon: 'BookOpen', defaultLimit: 130 }
};
