"use client";
import { useEffect, useState } from "react";
import { initialReviews, type ReviewDecision, type ReviewRecord } from "@/data/doctor";

const KEY = "smart-rx-doctor-demo-v1";

export function useDoctorReviews() {
  const [reviews, setReviews] = useState<ReviewRecord[]>(initialReviews);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === initialReviews.length && parsed.every((x) => x && typeof x === "object" && typeof x.id === "string" && typeof x.status === "string")) {
          setReviews(parsed as ReviewRecord[]);
        }
      }
    } catch { /* Local storage unavailable; in-memory demo still works. */ }
    setLoaded(true);
  }, []);

  function decide(id: string, decision: ReviewDecision, note: string) {
    const updated = reviews.map((r) => r.id === id ? { ...r, status: decision, note: note.trim() } : r);
    setReviews(updated);
    try { window.localStorage.setItem(KEY, JSON.stringify(updated)); } catch { /* Demo-only fallback */ }
  }

  function reset() {
    setReviews(initialReviews);
    try { window.localStorage.removeItem(KEY); } catch { /* Demo-only fallback */ }
  }

  return { reviews, loaded, decide, reset };
}
