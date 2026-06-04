import { useRef, useState, useEffect, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (query: string) => void;
  loading: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  loading,
  placeholder = "Ask anything...",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!value.trim() || loading) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t bg-white px-4 py-3"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="max-h-40 min-h-[44px] w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
        placeholder={placeholder}
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:bg-slate-800 transition-colors"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
