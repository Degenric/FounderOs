import { createContext, useContext, useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import {
  STAKEHOLDERS,
  CORE_FEATURES,
  MEDIA_ITEMS,
  IRL_ITEMS,
} from "../data/ecosystem.js";

const DEFAULT_BLOCKS = [
  { id: "media", title: "Media Arm",   accentColor: "#f87171", x: 340, y: 158, w: 108, h: 338, vertical: true },
  { id: "os",    title: "Founders OS", accentColor: "#8b9aff", x: 455, y: 158, w: 205, h: 172, vertical: false },
  { id: "irl",   title: "Accelerator", accentColor: "#fbbf24", x: 455, y: 338, w: 205, h: 158, vertical: false },
];

export const DEFAULT_CONTENT = {
  STAKEHOLDERS,
  CORE_FEATURES,
  MEDIA_ITEMS,
  IRL_ITEMS,
  BLOCKS: DEFAULT_BLOCKS,
};

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const savedRef = useRef(DEFAULT_CONTENT);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("data")
          .eq("id", "main")
          .maybeSingle();

        if (error || !data) {
          // First ever load — seed the row with defaults
          await supabase.from("content").insert({ id: "main", data: DEFAULT_CONTENT });
          return;
        }

        // Merge: Supabase wins for data fields, geometry always from DEFAULT_BLOCKS
        const loaded = {
          ...DEFAULT_CONTENT,
          ...data.data,
          BLOCKS: DEFAULT_BLOCKS.map((def) => ({
            ...def,
            title: data.data.BLOCKS?.find((b) => b.id === def.id)?.title ?? def.title,
          })),
        };
        setContent(loaded);
        savedRef.current = loaded;
      } catch (err) {
        console.error("[ContentContext] Failed to load from Supabase:", err);
        // Fall back to defaults silently — app remains functional
      }
    }
    load();
  }, []);

  function resetContent() {
    setContent(savedRef.current);
  }

  function updateSavedSnapshot(newContent) {
    savedRef.current = newContent;
    setContent(newContent);
  }

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent, updateSavedSnapshot }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
