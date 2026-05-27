import DOMPurify from "dompurify";

const CONFIG = {
  ALLOWED_TAGS: [
    "p", "br", "strong", "em", "b", "i", "u", "s",
    "ul", "ol", "li",
    "h2", "h3", "h4",
    "a", "span", "div",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class"],
  FORBID_ATTR: ["style"],
};

export function sanitizeHtml(dirty) {
  if (typeof dirty !== "string") return "";
  return DOMPurify.sanitize(dirty, CONFIG);
}