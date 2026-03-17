import {ENR} from "@chainsafe/enr";
import {useCallback, useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import ENRDerivedFields from "./ENRDerivedFields";
import ENRFields from "./ENRFields";

export default function ENRViewer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [enrString, setEnrString] = useState(searchParams.get("q") ?? "");
  const [decoded, setDecoded] = useState<ENR | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const decode = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) {
        setDecoded(undefined);
        return;
      }
      try {
        const result = ENR.decodeTxt(trimmed);
        setSearchParams({q: trimmed}, {replace: true});
        setDecoded(result);
      } catch (e) {
        toast.error((e as Error).message);
        setDecoded(undefined);
      }
    },
    [setSearchParams]
  );

  // Auto-decode from URL on mount only
  const initialEnrRef = useRef(enrString);
  useEffect(() => {
    if (initialEnrRef.current) {
      decode(initialEnrRef.current);
    }
  }, [decode]);

  // Debounced auto-decode on input change
  const handleChange = useCallback(
    (value: string) => {
      setEnrString(value);
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => decode(value), 400);
    },
    [decode]
  );

  const handleFileUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          const cleaned = e.target.result.replace(/^["'\s]*|["'\s]*$/g, "");
          setEnrString(cleaned);
          decode(cleaned);
        }
      };
      reader.onerror = () => toast.error("Failed to read file");
    },
    [decode]
  );

  const handlePaste = useCallback(() => {
    // After paste event, the textarea value updates — decode immediately
    setTimeout(() => {
      if (textareaRef.current) {
        const value = textareaRef.current.value;
        setEnrString(value);
        decode(value);
      }
    }, 0);
  }, [decode]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="enr-input" className="text-sm font-medium text-text-secondary">
            ENR String
          </label>
          <label className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            />
            or upload a file
          </label>
        </div>
        <textarea
          ref={textareaRef}
          id="enr-input"
          value={enrString}
          onChange={(e) => handleChange(e.target.value)}
          onPaste={handlePaste}
          placeholder="enr:-..."
          rows={4}
          spellCheck={false}
          className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted resize-y transition-[border-color,box-shadow] focus:border-accent-dim"
        />
        <p className="mt-2 text-xs text-text-muted">Paste an ENR string to auto-decode, or type and wait.</p>
      </section>

      {/* Output Section */}
      {decoded && (
        <div className="space-y-6 animate-in">
          <section className="bg-surface-raised border border-border rounded-xl p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">Record Fields</h2>
            <ENRFields enr={decoded} />
          </section>

          <section className="bg-surface-raised border border-border rounded-xl p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">Derived Fields</h2>
            <ENRDerivedFields enr={decoded} />
          </section>
        </div>
      )}
    </div>
  );
}
