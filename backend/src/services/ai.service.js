const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/generate";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5:7b";

const ACTION_PROMPTS = {
  improve: `You are a language coach. Improve the following text for clarity and grammar. Return only the improved version, no explanation.`,
  translate: `You are a translator. Translate the following text into {targetLanguage}. Return only the translation.`,
  explain: `You are a language teacher. Explain the following phrase simply for a language learner. Include meaning, usage, and one example sentence.`,
  natural: `You are a native speaker coach. Rewrite the following to sound more natural and conversational in {targetLanguage}. Return only the rewritten text.`,
  grammar: `You are a grammar expert. Correct grammar in the following text. Return the corrected version and briefly list what changed (max 3 bullet points).`,
  tone: `You are a communication coach. Rewrite the following with a more polite, friendly tone. Return only the improved text.`,
  suggest: `You are a conversation partner. Suggest 3 short reply options the learner could send next. Format as a numbered list.`,
  practice: `You are a language tutor. Create one short practice exercise for learning {targetLanguage}. Include a prompt and a hint. Keep it under 80 words.`,
  conversation: `You are a language tutor. Provide 3 engaging conversation starter questions for practicing {targetLanguage}. Number them.`,
};

function buildContext(user) {
  const native = user?.nativeLanguage || "English";
  const learning = user?.learningLanguage || "Spanish";
  return { nativeLanguage: native, learningLanguage: learning };
}

export async function generateWithOllama({ prompt, system }) {
  const fullPrompt = system ? `${system}\n\n${prompt}` : prompt;

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: fullPrompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return (data.response || "").trim();
}

export async function runAiAction(action, text, user, extra = {}) {
  const { learningLanguage, nativeLanguage } = buildContext(user);
  const targetLanguage = extra.targetLanguage || learningLanguage;

  let instruction = ACTION_PROMPTS[action];
  if (!instruction) {
    throw new Error(`Unknown AI action: ${action}`);
  }

  instruction = instruction.replace(/\{targetLanguage\}/g, targetLanguage);

  const system = `You help language learners. The user's native language is ${nativeLanguage} and they are learning ${learningLanguage}. Be concise and practical.`;

  const prompt = `${instruction}\n\nText:\n"""${text}"""`;

  return generateWithOllama({ prompt, system });
}

export async function coachChat(messages, user) {
  const { learningLanguage, nativeLanguage } = buildContext(user);
  const history = messages
    .slice(-8)
    .map((m) => `${m.role === "user" ? "Learner" : "Coach"}: ${m.content}`)
    .join("\n");

  const system = `You are Fluently AI Coach — a warm, expert language tutor. The learner's native language is ${nativeLanguage} and they are learning ${learningLanguage}. Help with grammar, translations, explanations, tone, and conversation practice. Keep responses focused and under 150 words unless asked for more.`;

  const prompt = `${history}\n\nCoach:`;

  return generateWithOllama({ prompt, system });
}

export async function generatePracticePrompt(user) {
  const { learningLanguage } = buildContext(user);
  return runAiAction("practice", "Create today's exercise.", user, {
    targetLanguage: learningLanguage,
  });
}

export async function generateConversationStarters(user) {
  const { learningLanguage } = buildContext(user);
  return runAiAction("conversation", "Give me starters.", user, {
    targetLanguage: learningLanguage,
  });
}
