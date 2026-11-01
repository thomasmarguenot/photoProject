import { useCallback, useEffect, useRef, useState } from 'react';

const RESET_DELAY_MS = 2000;

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard denied (permissions, insecure context): no feedback, the
      // caller's regular link stays usable.
      return;
    }
    setCopiedText(text);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => setCopiedText(null),
      RESET_DELAY_MS
    );
  }, []);

  return { copiedText, copy };
}
