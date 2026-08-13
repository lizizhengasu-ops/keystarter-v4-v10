import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stripTags } from "../utils/html";
import { BLOG_ARTICLES } from "../data/blog-articles";

type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url?: string }> };
};

const DAILY_RE = /windows-microsoft-ai-news/i;

const STATIC_POSTS: Post[] = Object.entries(BLOG_ARTICLES).map(([slug, a], i) => ({
  id: i + 1,
  title: { rendered: a.title },
  excerpt: { rendered: a.description },
  slug,
  date: a.datePublished,
}));

function coverOf(p: Post): string | undefined {
  return p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
}

export default function BlogPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>(STATIC_POSTS);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://keys-starter.com/wp-json/wp/v2/posts?_embed&per_page=50")
      .then((r) => r.json())
      .then((d: Post[]) => {
        const bySlug = new Map(STATIC_POSTS.map((p) => [p.slug, p]));
        d.forEach((p) => {
          if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
        });
        setPosts(Array.from(bySlug.values()));
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      (p.title.rendered + " " + stripTags(p.excerpt.rendered)).toLowerCase().includes(q)
    );
  }, [posts, query]);

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7c3aed] via-[#5b21b6] to-[#0078d4] text-white px-8 py-10 mb-8 shadow-xl">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-24 bottom-0 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center gap-3 mb-4">
            <img src="/keystarter-logo.svg" alt="KeyStarter logo" className="w-8 h-8" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
              KeyStarter Blog
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {t("blog.title")}
          </h1>
          <p className="text-white/85 max-w-2xl text-base md:text-lg leading-relaxed mb-1">
            {t("blog.desc")}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-300" />
            {posts.length} {t("blog.articles", "articles")}
          </div>
        </div>

        {/* Search */}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("blog.search", "Search by title or keyword...")}
          className="w-full rounded-2xl border border-[#e8e8ed] bg-white px-5 py-3 text-sm shadow-sm placeholder:text-[#a0a0a8] focus:border-[#7c3aed] focus:outline-none focus:ring-2 focus:ring-[#ede9fe] mb-8"
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#86868b]">{t("blog.empty")}</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((p) => {
              const cover = coverOf(p);
              const isDaily = DAILY_RE.test(p.slug);
              const title = stripTags(p.title.rendered);
              return (
                <Link
                  key={p.id}
                  to={"/blog/" + p.slug}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#e8e8ed] shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#c4b5fd] transition-all duration-200"
                >
                  <div className="aspect-video overflow-hidden bg-[#f0f0f2]">
                    {cover ? (
                      <img
                        src={cover}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#c0c0c8] text-xs font-semibold">
                        KeyStarter
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={
                          "text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full " +
                          (isDaily
                            ? "bg-[#7c3aed] text-white"
                            : "bg-[#f1edfb] text-[#7c3aed]")
                        }
                      >
                        {isDaily ? "Windows AI News" : "Windows Guide"}
                      </span>
                      <span className="text-xs text-[#86868b]">
                        {new Date(p.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 text-[#1d1d1f] group-hover:text-[#6d28d9] transition-colors line-clamp-2">
                      {title}
                    </h2>
                    <p className="text-sm text-[#86868b] mb-4 line-clamp-3">
                      {stripTags(p.excerpt.rendered).substring(0, 140)}
                    </p>
                    <span className="text-sm text-[#7c3aed] font-semibold group-hover:underline">
                      {t("blog.read_more")} &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
