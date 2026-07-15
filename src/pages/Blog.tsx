import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  link: string;
  _embedded?: { "wp:term"?: Array<Array<{ name: string }>> };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://keys-starter.com/wp-json/wp/v2/posts?_embed&per_page=20")
      .then(r => r.json())
      .then((data: Post[]) => { setPosts(data); setLoading(false); })
     .catch(() => setLoading(false));
 }, []);
  useEffect(() => { document.title = "Blog | KeyStarter"; }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] pt-12 flex items-center justify-center">
        <div className="animate-pulse text-sm text-[#86868b]">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-2">Blog</h1>
        <p className="text-sm text-[#86868b] mb-10">Guides, comparisons, and tips for Microsoft software licensing.</p>
        {posts.length === 0 ? (
          <p className="text-sm text-[#86868b]">No articles yet.</p>
        ) : (
          <div className="space-y-5">
            {posts.map(post => (
              <a key={post.id} href={post.link}
                 className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 sm:p-8 group">
                <h2 className="text-lg sm:text-xl font-semibold text-[#1d1d1f] group-hover:text-[#0078d4] transition-colors mb-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="text-sm text-[#86868b] leading-relaxed line-clamp-3"
                     dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="flex items-center gap-3 mt-4 text-xs text-[#86868b]">
                  <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span className="text-[#0078d4] font-medium">Read more &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
