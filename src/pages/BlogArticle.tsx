import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch("https://keys-starter.com/wp-json/wp/v2/posts?slug=" + slug)
      .then(r => r.json())
      .then((data: any[]) => {
        if (data.length > 0) setArticle(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] pt-12 flex items-center justify-center">
        <div className="animate-pulse text-sm text-[#86868b]">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] pt-12">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1d1d1f] mb-4">Article not found</h1>
          <Link to="/blog" className="text-[#0078d4] text-sm hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/blog" className="text-[#0078d4] text-xs font-medium hover:underline mb-6 inline-block">&larr; Back to Blog</Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-4"
            dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
        <div className="text-xs text-[#86868b] mb-8">
          {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>
        <div className="prose prose-sm sm:prose-base max-w-none text-[#1d1d1f]"
             dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
      </article>
    </div>
  );
}
