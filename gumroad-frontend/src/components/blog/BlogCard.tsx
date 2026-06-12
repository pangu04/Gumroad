import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  tags?: string[];
}

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.id}`}
        className="group block bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[6px_6px_0_0_#000] transition-shadow duration-150"
      >
        <div className="grid grid-cols-2">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/800/450?random=${post.id}`;
            }}
          />
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
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
            <h2
              className="font-bold text-black text-2xl leading-tight mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {post.title}
            </h2>
            <p
              className="text-gray-600 text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 border border-black overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${post.author}/100/100`}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="text-sm font-semibold text-black"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {post.author}
              </span>
              <span className="text-gray-300">·</span>
              <span
                className="text-sm text-gray-400"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {post.date}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[6px_6px_0_0_#000] transition-shadow duration-150"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://picsum.photos/800/450?random=${post.id}`;
        }}
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="bg-[#FF90E8] text-black text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {post.category}
          </span>
          <span
            className="text-xs text-gray-400"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {post.readTime}
          </span>
        </div>
        <h3
          className="font-bold text-black text-base leading-tight mb-2"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {post.title}
        </h3>
        <p
          className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold text-black"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {post.author}
          </span>
          <span className="text-gray-300">·</span>
          <span
            className="text-xs text-gray-400"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {post.date}
          </span>
        </div>
      </div>
    </Link>
  );
}
