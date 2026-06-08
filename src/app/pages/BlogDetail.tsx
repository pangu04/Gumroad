import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data';
import { BlogCard } from '../components/BlogCard';

export function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const related = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2
            className="font-bold text-4xl text-black mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Post not found
          </h2>
          <Link to="/blog" className="text-[#FF90E8] font-bold underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black border-2 border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors mb-10"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>

        {/* Category + meta */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="bg-[#FF90E8] text-black text-xs font-bold px-3 py-1 rounded-full"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {post.category}
          </span>
          <span
            className="text-sm text-gray-400"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-bold text-black mb-6"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-10 pb-10 border-b-2 border-black">
          <img
            src={`https://picsum.photos/seed/${post.author}/100/100`}
            alt={post.author}
            className="w-10 h-10 rounded-full border-2 border-black object-cover"
          />
          <div>
            <p
              className="font-bold text-black text-sm"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {post.author}
            </p>
            <p
              className="text-gray-400 text-xs"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {post.date}
            </p>
          </div>
        </div>

        {/* Hero image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-2xl border-2 border-black mb-10 object-cover h-72"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/800/450?random=${post.id}`;
          }}
        />

        {/* Content */}
        <div className="prose max-w-none">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h3
                  key={i}
                  className="font-bold text-black text-xl mt-8 mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {paragraph.replace(/\*\*/g, '')}
                </h3>
              );
            }
            if (paragraph.includes('**')) {
              const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p
                  key={i}
                  className="text-gray-700 text-lg leading-relaxed mb-5"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {parts.map((part, j) =>
                    part.startsWith('**') ? (
                      <strong key={j} className="font-bold text-black">
                        {part.replace(/\*\*/g, '')}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            }
            return (
              <p
                key={i}
                className="text-gray-700 text-lg leading-relaxed mb-5"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="flex gap-2 mt-12 pt-8 border-t-2 border-black">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-black px-3 py-1 rounded-full text-sm font-semibold text-black"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t-2 border-black">
            <h3
              className="font-bold text-black text-2xl mb-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              More from the blog
            </h3>
            <div className="grid grid-cols-3 gap-5">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
