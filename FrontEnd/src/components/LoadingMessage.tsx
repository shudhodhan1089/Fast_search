interface LoadingMessageProps {
  text?: string;
}

export function LoadingMessage({
  text = "Searching the web...",
}: LoadingMessageProps) {
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
      <span className="text-sm text-slate-500">{text}</span>
    </div>
  );
}
