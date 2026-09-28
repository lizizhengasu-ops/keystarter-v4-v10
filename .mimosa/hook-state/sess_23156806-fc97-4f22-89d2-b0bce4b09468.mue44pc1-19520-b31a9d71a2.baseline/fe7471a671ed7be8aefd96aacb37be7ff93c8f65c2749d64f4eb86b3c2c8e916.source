import DOMPurify from "dompurify";

// WP REST returns title.rendered / excerpt.rendered with HTML entities
// (e.g. "&#038;"); stripTags output is used as React text nodes, so decode them.
function decodeEntities(text: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
}

export function stripTags(html: string): string {
  return decodeEntities(
    String(html || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
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
