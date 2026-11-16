// The content of the map's tooltips and popups, built as DOM (Leaflet takes an
// element): a small category label, a bold title, a grey line of where it is,
// the body, and a separate block at the bottom for what the analysis adds.
// Every text goes in as text, never as HTML.

export type Card = {
  kicker?: string;
  kickerColour?: string;
  title: string;
  meta?: string;
  lines?: string[];
  note?: { lines: string[]; tone: "good" | "bad" | "info" };
  action?: { label: string; onClick: () => void };
};

// Our own choice of tints, readable on Leaflet's white tooltip.
const TONES = {
  good: { bg: "#e8f5e9", fg: "#1b5e20" },
  bad: { bg: "#ffebee", fg: "#b71c1c" },
  info: { bg: "#e3f2fd", fg: "#0d47a1" },
};

function el(
  tag: string,
  style: Partial<CSSStyleDeclaration>,
  text?: string,
): HTMLElement {
  const e = document.createElement(tag);
  Object.assign(e.style, style);
  if (text !== undefined) {
    e.textContent = text;
  }
  return e;
}

export function card(c: Card): HTMLElement {
  const box = el("div", {
    minWidth: "180px",
    maxWidth: "260px",
    whiteSpace: "normal",
    font: "13px/1.4 inherit",
  });
  if (c.kicker) {
    box.append(
      el(
        "div",
        {
          fontSize: "10px",
          fontWeight: "700",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: c.kickerColour ?? "#757575",
        },
        c.kicker,
      ),
    );
  }
  box.append(el("div", { fontSize: "14px", fontWeight: "700" }, c.title));
  if (c.meta) {
    box.append(el("div", { fontSize: "12px", color: "#757575" }, c.meta));
  }
  if (c.lines?.length) {
    const body = el("div", { marginTop: "6px" });
    c.lines.forEach((line) => body.append(el("div", {}, line)));
    box.append(body);
  }
  if (c.note) {
    const tone = TONES[c.note.tone];
    const note = el("div", {
      marginTop: "8px",
      padding: "6px 8px",
      borderRadius: "4px",
      background: tone.bg,
      color: tone.fg,
    });
    c.note.lines.forEach((line, i) =>
      note.append(el("div", i === 0 ? { fontWeight: "700" } : {}, line)),
    );
    box.append(note);
  }
  if (c.action) {
    const button = el(
      "button",
      {
        marginTop: "8px",
        padding: "2px 10px",
        cursor: "pointer",
      },
      c.action.label,
    );
    button.onclick = c.action.onClick;
    box.append(button);
  }
  return box;
}
