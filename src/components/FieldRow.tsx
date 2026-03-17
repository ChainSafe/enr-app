import {useCallback, useState} from "react";

type Props = {
  label: string;
  value: string | number;
  index?: number;
};

export default function FieldRow({label, value, index = 0}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  return (
    <div
      className="field-row group flex items-start gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-surface-hover transition-colors"
      style={{animationDelay: `${index * 30}ms`}}
    >
      <span className="shrink-0 text-xs font-medium text-text-muted uppercase tracking-wider pt-0.5 w-28 sm:w-36 text-right">
        {label}
      </span>
      <span className="flex-1 min-w-0 font-mono text-sm text-text-primary break-all leading-relaxed">{value}</span>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-accent pt-0.5"
        title="Copy to clipboard"
      >
        {copied ? (
          <svg
            className="w-4 h-4 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
