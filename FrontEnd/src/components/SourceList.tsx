import { useState } from "react";
import { ExternalLink, Globe } from "lucide-react";
import type { Source } from "@/types/conversation";

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getFavicon(url: string): string {
  try {
    const host = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=16`;
  } catch {
    return "";
  }
}

interface SourceItemProps {
  source: Source;
}

function SourceItem({ source }: SourceItemProps) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-200 transition-colors"
    >
      {imgError ? (
        <Globe className="w-4 h-4 text-slate-400 shrink-0" />
      ) : (
        <img
          src={getFavicon(source.url)}
          alt=""
          className="w-4 h-4 object-cover rounded-sm shrink-0"
          onError={() => setImgError(true)}
        />
      )}
      <span className="truncate">{getHostname(source.url)}</span>
    </a>
  );
}

interface SourceListProps {
  sources: Source[];
}

export function SourceList({ sources }: SourceListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <ExternalLink className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-medium text-slate-900">Sources</h3>
      </div>
      <div className="flex flex-col gap-1">
        {sources.map((source, index) => (
          <SourceItem key={index} source={source} />
        ))}
      </div>
    </div>
  );
}
