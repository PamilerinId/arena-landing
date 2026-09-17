"use client";

import { useEffect, useRef, useState } from "react";
import { SEARCH } from "@/content/copy";
import { Icon } from "./Icon";
import { SearchBar } from "./SearchBar";

/**
 * The search pill. It straddles the seam between the hero and the board, then
 * sticks to the top of the viewport for the rest of the page. On a phone it
 * rides collapsed as a single line and opens on tap, so it never covers the
 * section it is floating over.
 */
export function SearchDock() {
  const sentinel = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Collapse again once it is back on the seam, so the phone never scrolls up
  // to a half-open form.
  useEffect(() => {
    if (!stuck) setOpen(false);
  }, [stuck]);

  // Opened, it covers what is behind it, so a tap outside or Escape closes it.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!dock.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} className="search-sentinel" aria-hidden="true" />
      <div
        ref={dock}
        className="search-dock"
        data-stuck={stuck ? "" : undefined}
        data-open={open ? "" : undefined}
      >
        <button
          type="button"
          className="search-collapsed"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name="search" size={17} />
          <span>{SEARCH.collapsed}</span>
        </button>
        <SearchBar />
      </div>
    </>
  );
}
