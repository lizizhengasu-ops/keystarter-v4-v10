import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Post = { id: number; title: { rendered: string }; excerpt: { rendered: string }; slug: string; date: string };

export default function BlogPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://keys-starter.com/wp-json/wp/v2/posts?_embed&per_page=20")
      .then(r => r.json()).then((d: Post[]) => { setPosts(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  if (loading) return <div className="bg-[#f5f5f7] text-[#1d1d1f] px-6 py-12"><div className="max-w-4xl mx-auto text-center py-20 text-[#86868b]">{t("blog.loading")}</div></div>;
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("blog.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("blog.desc")}</p>
        {posts.length === 0 ? (
          <div className="text-center py-20 text-[#86868b]">{t("blog.empty")}</div>
        ) : (
          <div className="space-y-6">
            {posts.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
                <div className="text-[10px] text-[#86868b] mb-2">{new Date(p.date).toLocaleDateString()}</div>
                <h2 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: p.title.rendered}} />
                <div className="text-sm text-[#86868b] mb-4" dangerouslySetInnerHTML={{__html: p.excerpt.rendered.substring(0,200)}} />
                <Link to={"/blog/"+p.slug} className="text-sm text-[#7c3aed] font-semibold hover:underline">{t("blog.read_more")} &rarr;</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
