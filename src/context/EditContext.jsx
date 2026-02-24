import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContent } from "./ContentContext";

const EditContext = createContext(null);

export function EditProvider({ children }) {
  const { content, resetContent, updateSavedSnapshot } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle'|'saving'|'saved'|'error'

  async function login(password) {
    const email = import.meta.env.VITE_EDIT_EMAIL;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) setIsEditing(true);
    return { error };
  }

  async function logout() {
    resetContent();
    setIsEditing(false);
    setSaveStatus("idle");
    await supabase.auth.signOut();
  }

  async function save() {
    setSaveStatus("saving");
    const { error } = await supabase
      .from("content")
      .upsert({ id: "main", data: content });
    if (error) {
      setSaveStatus("error");
      return { error };
    }
    updateSavedSnapshot(content);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
    return { error: null };
  }

  return (
    <EditContext.Provider value={{ isEditing, login, logout, save, saveStatus }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  return useContext(EditContext);
}
