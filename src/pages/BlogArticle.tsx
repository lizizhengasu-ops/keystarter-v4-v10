import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stripTags, sanitizeHtml } from "../utils/html";

export default function BlogArticlePage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) return;
    fetch("https://keys-starter.com/wp-json/wp/v2/posts?slug="+slug)
      .then(r => r.json()).then((d:any[]) => { if (d.length>0) setArticle(d[0]); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);
  if (loading) return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="shimmer h-8 w-3/4 mb-4 rounded" />
        <div className="shimmer h-4 w-1/3 mb-8 rounded" />
        <div className="aspect-video shimmer rounded-xl mb-8" />
        <div className="shimmer h-4 w-full mb-2 rounded" />
        <div className="shimmer h-4 w-full mb-2 rounded" />
        <div className="shimmer h-4 w-2/3 rounded" />
      </div>
    </div>
  );
  if (!article) return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] px-6 py-12">
      <div className="max-w-3xl mx-auto text-center py-20"><div className="text-lg text-[#86868b] mb-4">{t("blog.not_found")}</div>
      <Link to="/blog" className="text-sm text-[#7c3aed] hover:underline">{t("blog.back")}</Link></div>
    </div>
  );
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-sm text-[#7c3aed] hover:underline mb-6 inline-block">&larr; {t("blog.back")}</Link>
        <h1 className="text-3xl font-bold mb-4">{stripTags(article.title.rendered)}</h1>
        <div className="text-sm text-[#1d1d1f] leading-relaxed" dangerouslySetInnerHTML={{__html: sanitizeHtml(article.content.rendered)}} />
      </div>
    </div>
  );
}
