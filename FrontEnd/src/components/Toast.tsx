import type { ReactNode } from "react";

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  onClose: () => void;
  action?: ReactNode;
}

export function Toast({
  id,
  title,
  description,
  variant = "default",
  onClose,
  action,
}: ToastProps) {
  return (
    <div
      key={id}
      className={`flex w-full items-center p-4 mb-4 text-sm rounded-lg border ${
        variant === "destructive"
          ? "border-destructive/50 bg-destructive/10 text-destructive"
          : "border-primary/50 bg-primary/10 text-primary"
      }`}
      role="alert"
    >
      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center">
        {variant === "destructive" ? (
          <span className="h-4 w-4">⚠️</span>
        ) : (
          <span className="h-4 w-4">ℹ️</span>
        )}
      </div>
      <div className="flex-1 ml-3 space-y-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-xs">{description}</p>}
      </div>
      <div className="flex mt-2 items-center gap-2">
        {action && (
          <button
            onClick={onClose}
            className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-hover hover:bg-primary/20"
          >
            {action}
          </button>
        )}
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-primary/20 text-xs"
        >
          <span className="sr-only">Dismiss</span>
          <span className="h-4 w-4">✕</span>
        </button>
      </div>
    </div>
  );
}
