"use client";

import { SEARCH } from "@/content/copy";
import { track } from "@/lib/track";
import { Icon } from "./Icon";

export function SearchBar() {
  return (
    <form
      method="get"
      action="/search"
      className="searchbar"
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget);
        track("search_submit", {
          sport: String(data.get("sport") ?? ""),
          area: String(data.get("area") ?? ""),
          date: String(data.get("date") ?? ""),
          time: String(data.get("time") ?? ""),
        });
      }}
    >
      <Field id="f-sport" label={SEARCH.fields.sport.label}>
        <select id="f-sport" name="sport" defaultValue={SEARCH.fields.sport.options[0]}>
          {SEARCH.fields.sport.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field id="f-area" label={SEARCH.fields.area.label}>
        <input
          id="f-area"
          name="area"
          type="text"
          autoComplete="off"
          placeholder={SEARCH.fields.area.placeholder}
        />
      </Field>

      <Field id="f-date" label={SEARCH.fields.date.label}>
        <input
          id="f-date"
          name="date"
          type="text"
          autoComplete="off"
          defaultValue={SEARCH.fields.date.placeholder}
        />
      </Field>

      <Field id="f-time" label={SEARCH.fields.time.label}>
        <select id="f-time" name="time" defaultValue={SEARCH.fields.time.options[0]}>
          {SEARCH.fields.time.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <div className="searchbar-submit">
        <button type="submit" className="btn btn-primary-light" style={{ width: "100%" }}>
          <Icon name="search" size={18} />
          {SEARCH.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="searchbar-field">
      <label className="colhead" htmlFor={id} style={{ color: "var(--ink-3)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
