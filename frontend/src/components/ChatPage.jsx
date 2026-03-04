import { useEffect, useMemo, useRef, useState } from "react";
import "./ChatPage.css";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Hi — I’m here to listen. What’s on your mind today?",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isSending,
    [input, isSending]
  );

  async function sendMessage() {
    setError("");
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Request failed (${resp.status})`);
      }

      const data = await resp.json();
      const assistantText =
        data?.reply?.content ?? "Sorry — I didn’t get a response.";

      const aiMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantText,
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setError("Could not send message. Make sure backend is running (port 5000).");
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry — I’m having trouble responding right now. Please try again.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="chatPage">
      <header className="chatHeader">
        <div className="chatTitle">AI Listening Companion</div>
        <div className="chatSub">Reflective support edition</div>
      </header>

      <main className="chatBox">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`msgRow ${m.role === "user" ? "right" : "left"}`}
          >
            <div className={`bubble ${m.role === "user" ? "user" : "ai"}`}>
              <div className="role">{m.role === "user" ? "You" : "Companion"}</div>
              <div className="text">{m.content}</div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="msgRow left">
            <div className="bubble ai">
              <div className="typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </main>

      {error && <div className="error">{error}</div>}

      <footer className="composer">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type what you’re feeling… (Enter to send, Shift+Enter for new line)"
          rows={2}
          disabled={isSending}
        />
        <button onClick={sendMessage} disabled={!canSend}>
          Send
        </button>
      </footer>
    </div>
  );
}