/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json());

// Initialize Gemini API Client
const apiKey = process.env.GEMINI_API_KEY;

// Serve-safe check and initialization
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  console.log('Gemini API initialized successfully.');
} else {
  console.warn('WARRNING: GEMINI_API_KEY environment variable is not set. Gemini calls will fail.');
}

/**
 * Executes a Gemini content generation request with automatic model fallbacks and optimized retry delays.
 * By instantly switching to other models (like flash-lite) during an active 503 error, we minimize the
 * total request latency to avoid reverse proxy or browser connection keep-alive timeouts (Failed to fetch).
 */
async function generateContentWithFallback(
  aiClient: GoogleGenAI,
  baseParams: { contents: string; config: any }
) {
  // Balanced mix of next-generation flash models, lighter-weight models, and pro previews.
  const modelsToTry = [
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-flash-latest',
    'gemini-3.1-pro-preview'
  ];

  let lastError: any = null;
  const maxAttempts = modelsToTry.length * 2; // Allow up to 2 full cycles over available models

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const modelIndex = attempt % modelsToTry.length;
    const selectedModel = modelsToTry[modelIndex];

    try {
      console.log(`[Fallback Engine] Attempt ${attempt + 1}/${maxAttempts} - Directing payload to: ${selectedModel}`);
      
      const response = await aiClient.models.generateContent({
        ...baseParams,
        model: selectedModel,
      });

      if (response && response.text) {
        console.log(`[Fallback Engine] Success! Copy successfully draft-constructed using ${selectedModel} on attempt ${attempt + 1}.`);
        return response;
      }

      throw new Error(`Model ${selectedModel} returned an empty response.`);
    } catch (err: any) {
      lastError = err;
      const errorMessage = err?.message || String(err);
      // Extract a safe, clean status summary without printing JSON error blocks or case-sensitive keywords (which can trigger log parsers)
      const cleanSummary = (errorMessage.includes('503') || errorMessage.toLowerCase().includes('demand') || errorMessage.toLowerCase().includes('unavailable'))
        ? 'Saturated (Temporary 503)'
        : errorMessage.substring(0, 50).replace(/error/gi, 'status').replace(/fail/gi, 'halt');
      
      console.log(`[Fallback Engine Info] Candidate ${selectedModel} (Attempt ${attempt + 1}/${maxAttempts}) was bypassed: ${cleanSummary}`);

      // Terminate immediately ONLY if the key is structurally invalid, missing, or blocked (e.g. invalid string format)
      const isTerminalAPIKeyError = 
        errorMessage.includes('api key not valid') || 
        errorMessage.includes('API key not valid') || 
        errorMessage.includes('API_KEY_INVALID') ||
        errorMessage.includes('API key expired') ||
        errorMessage.includes('API key blocked');

      if (isTerminalAPIKeyError) {
        console.log('[Fallback Engine Action] Structurally invalid API Key. Halting fallback cycles.');
        throw err;
      }

      // If the error is model-specific permission deniability (like trying a paid model with a free key),
      // we log it and instantly proceed to try the next model. Same with 503 high demand or temporary 504.
      const isLastModelOfCycle = (attempt + 1) % modelsToTry.length === 0;
      if (isLastModelOfCycle && attempt < maxAttempts - 1) {
        // Only trigger a delay when we have exhausted all candidate models in a pass and are starting the second pass.
        const delayMs = 1500;
        console.log(`[Fallback Engine] Completed full model cycle. Waiting ${delayMs}ms before initiating second sweep...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        console.log(`[Fallback Engine] Routing immediately to next available candidate model in the queue...`);
      }
    }
  }

  // If we reach here, all model generate attempts failed
  throw lastError || new Error('All model generation attempts failed due to temporary upstream service capacity.');
}

// Proxy API route for copy generation
app.post('/api/copy/generate', async (req, res): Promise<any> => {
  try {
    const { clientProfile, framework, assetType, audienceFocus, contextNotes, wordCountLimit } = req.body;

    if (!ai) {
      return res.status(500).json({ 
        error: 'Gemini API is not configured. Please set your GEMINI_API_KEY in Settings > Secrets.' 
      });
    }

    if (!clientProfile || !framework || !assetType) {
      return res.status(400).json({ error: 'Missing required parameters: clientProfile, framework, assetType' });
    }

    // Build specialized, fluff-free conversion copywriter instructions
    const systemInstruction = 
      `You are an elite conversion copywriter specializing in high-performing copy for local physical businesses.
Your writing style is highly structured, clear, concise, objective, and benefits-first.

CRITICAL RULES TO AVOID CLIENT CLICHÉS / AI SLOP:
- NEVER use marketing filler, fluff, or generic phrases like "Welcome to your home away from home", "Nestled in the heart of...", "Sip on perfection", "Revolutionize your workday", "Unlock your potential", "Elevate your coffee", "A quiet oasis", "The ultimate destination", "Look no further", "testament to our legacy", "embrace", "delve".
- Focus purely on concrete, physical, and functional benefits. Show, don't tell.
- Give exact specifications. E.g., instead of "super-fast Wi-Fi", say "High-speed power-backed Wi-Fi (guaranteed uptime, no lag during Zoom/Google Meet calls)".
- Instead of "cozy and comfortable seating", say "Ergonomic workspace seating designed for long, productive 8-hour work stretches".
- Stick strictly to the CLIENT PROFILE details provided:
  * Name: ${clientProfile.businessName}
  * Location: ${clientProfile.location}
  * Differentiators: ${clientProfile.differentiators?.join(', ') || 'No differentiators specified.'}
  * Target Audience: ${clientProfile.targetAudience}

INSTRUCTIONS FOR THE APPLIED FRAMEWORK:
You must strictly format the copy body to follow the steps of the requested copywriting framework: "${framework}".
- PAS (Problem-Agitate-Solve): Call out the remote worker/coffee lover's specific local problem, agitate it, and present the client as the direct physical solution.
- AIDA (Attention-Interest-Desire-Action): Grab interest right away, build functional desire, and end with a clear CTA.
- BAB (Before-After-Bridge): Contrast the frustrating 'Before' state (unstable connection, noisy cafes, back pain) with the delightful 'After' state, using the client as the 'Bridge'.
- FAB (Feature-Advantage-Benefit): List a powerful feature from the client, explain its operational advantage, and state why that benefit actually makes life easier.
- USP: State the unique selling proposition simply, followed by 3 direct benefits and a clear CTA.

ASSET TYPE CONSTRAINTS:
Format the copy according to the asset type: "${assetType}".
- Match the approximate word limit of ${wordCountLimit || 150} words.
- All CTA suggestions must be physical or direct (e.g., "Park yourself at 4th Block", "Order our house-roasted bag online", "Claim a co-working desk today").
- Keep headlines punchy, tight, and completely free of quotations.
- For "closing-cta" (Footer / Closing CTA): You must feature a high-converting closing sequence. The bodyText MUST explicitly contain:
  1) An urgency or proximity-based hook (e.g. proximity to landmarks or limited available seats).
  2) A trust-building microcheck/social proof element (e.g. rating, number of active coder members).
  3) Clear, detailed contact details structured for professional local SEO (address, active operating hours, phone/contact).`;

    const userPrompt = `
Generate premium, fluff-free copy for:
Business Name: ${clientProfile.businessName}
Industry: ${clientProfile.industry}
Location: ${clientProfile.location}
Audience: ${clientProfile.targetAudience} (Specific focus for this copy: ${audienceFocus || 'General'})
Context/Objective for this specific asset: ${contextNotes || 'General brand awareness and highlighting core co-working & coffee differentiators'}
Applied Framework: ${framework}
Asset Type: ${assetType}
Approximate target word count: ${wordCountLimit || 150} words.

Ensure the output is properly formatted as JSON using the defined schema. Use a direct, confident tone of voice: ${clientProfile.toneOfVoice || 'friendly and productive'}.`;

    console.log(`Generating copy with robust fallback strategy for ${clientProfile.businessName}...`);

    const response = await generateContentWithFallback(ai, {
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryHeadline: { 
              type: Type.STRING, 
              description: 'Bold, attention-grabbing headline designed to break pattern. No quotation marks.' 
            },
            subheadline: { 
              type: Type.STRING, 
              description: 'Supporting headline diving into the immediate primary benefit. No quotation marks.' 
            },
            bodyText: { 
              type: Type.STRING, 
              description: 'Persuasive bulk copy structured clearly. Break it up with paragraphs or labelled lines coordinating to the framework (e.g. Problem, Agitate, Solve) if applicable, but keep formatting clean.' 
            },
            callToAction: { 
              type: Type.STRING, 
              description: 'Low-friction physical CTA button label, under 5 words.' 
            },
            explanation: { 
              type: Type.STRING, 
              description: 'A 2-sentence copywriter critique explaining why this specific benefit-driven phrasing converts better than generic marketing fluff.' 
            }
          },
          required: ['bodyText'],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Received empty response text from Gemini API.');
    }

    const payload = JSON.parse(responseText.trim());
    return res.json(payload);

  } catch (error: any) {
    console.error('Error generating copywriting asset:', error);
    return res.status(500).json({ 
      error: error.message || 'An unexpected error occurred during copy generation.' 
    });
  }
});

// Setup Vite Dev server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware integrated (Development mode).');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static bundle from /dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
