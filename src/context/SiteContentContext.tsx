"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ADMIN_API_URL } from "@/lib/config";

interface SiteContentContextValue {
  getContent: (key: string, fallback: string) => string;
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${ADMIN_API_URL}/content`, { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Content unavailable"))))
      .then((body: { data?: Record<string, string> }) => setContent(body.data || {}))
      .catch(() => undefined);
  }, []);

  const getContent = useCallback((key: string, fallback: string) => content[key]?.trim() || fallback, [content]);
  const value = useMemo(() => ({ getContent }), [getContent]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return context;
}
