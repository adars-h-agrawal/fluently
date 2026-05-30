import { useState } from "react";
import { BrainIcon, SendIcon, SparklesIcon } from "lucide-react";
import toast from "react-hot-toast";
import { aiCoachChat } from "../lib/api.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";
import useAuthUser from "../hooks/useAuthUser.js";

const QUICK_PROMPTS = [
  "Correct this sentence: I goed to the store yesterday.",
  "How do I say 'nice to meet you' naturally?",
  "Explain the difference between ser and estar.",
  "Give me 3 conversation starters for a café.",
];

const AICoachPage = () => {
  const { authUser } = useAuthUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi ${authUser?.fullName?.split(" ")[0] || "there"}! I'm your Fluently AI Coach. Ask me about grammar, translations, tone, or conversation practice in ${authUser?.learningLanguage || "your target language"}.`,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || loading) return;

    const userMessages = [...messages, { role: "user", content }];
    setMessages(userMessages);
    setInput("");
    setLoading(true);

    try {
      const { reply } = await aiCoachChat(
        userMessages.map((m) => ({ role: m.role, content: m.content }))
      );
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      toast.error(getErrorMessage(error, "Coach unavailable. Start Ollama with qwen2.5:7b."));
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <header className="mb-4 shrink-0">
        <div className="flex items-center gap-2 text-primary mb-1">
          <BrainIcon className="size-5" />
          <span className="text-xs uppercase tracking-widest font-medium">AI Coach</span>
        </div>
        <h1 className="page-header">Your personal language tutor</h1>
        <p className="page-subtitle">Grammar, translation, explanations, and tone — powered locally by Ollama</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-4 shrink-0">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="ai-chip text-xs max-w-full truncate"
            onClick={() => sendMessage(prompt)}
            disabled={loading}
          >
            {prompt.slice(0, 42)}…
          </button>
        ))}
      </div>

      <div className="glass-panel-strong flex-1 rounded-2xl flex flex-col overflow-hidden ambient-glow min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : "glass-card bg-base-100/40"
                }`}
              >
                {msg.role === "assistant" && (
                  <SparklesIcon className="size-3.5 text-primary mb-1" />
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="glass-card px-4 py-3 rounded-2xl">
                <span className="loading loading-dots loading-sm text-primary" />
              </div>
            </div>
          )}
        </div>

        <form
          className="p-4 border-t border-white/8 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            className="input input-bordered flex-1 rounded-xl bg-base-100/30 border-white/10"
            placeholder="Ask your coach anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary rounded-xl" disabled={loading || !input.trim()}>
            <SendIcon className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AICoachPage;
