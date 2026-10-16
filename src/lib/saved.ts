import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const KEY = "oc-saved-opportunities";
const EVT = "oc-saved-change";

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSaved(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string, title: string) => {
    const cur = read();
    const isSaved = cur.includes(id);
    const next = isSaved ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVT));
    toast.success(isSaved ? `Removed "${title}" from saved` : `Saved "${title}"`);
  }, []);

  return { saved, toggle, isSaved: (id: string) => saved.includes(id) };
}
