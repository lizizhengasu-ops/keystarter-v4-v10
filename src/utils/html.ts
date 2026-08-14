import DOMPurify from "dompurify";

export function stripTags(html: string): string {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(String(html || ""), {
    ALLOWED_TAGS: [
      "h2", "h3", "h4", "h5", "h6", "p", "div", "ul", "ol", "li", "table", "thead", "tbody", "tr", "th", "td",
      "a", "img", "strong", "em", "br", "blockquote", "code", "pre", "span",
      "details", "summary", "figure", "figcaption",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel", "colspan", "rowspan", "style", "id", "class", "open"],
  });
}
