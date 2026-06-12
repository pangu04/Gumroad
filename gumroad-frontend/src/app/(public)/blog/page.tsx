'use client';

import { useState } from 'react';
import { BlogCard } from '@/components/blog/BlogCard';
import { blogPosts } from '@/data';

const allCategories = ['All', 'Creator Stories', 'Product Updates', 'Business Tips', 'Industry', 'Company'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b-2 border-black px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[#FF90E8] font-bold text-sm uppercase tracking-widest mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            The Gumroad Blog
          </p>
          <h1
            className="font-bold text-black mb-4"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Stories, tips, and insights
            <br />
            for independent creators.
          </h1>
          <p
            className="text-gray-500 text-lg max-w-xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            How creators are building businesses, what we're shipping, and what we've learned.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b-2 border-black px-8 py-4 bg-white sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full border-2 border-black font-bold text-sm transition-colors ${
                activeCategory === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Featured article */}
        {featured && (
          <div className="mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Featured
            </p>
            <BlogCard post={featured} featured />
          </div>
        )}

        {/* Article grid */}
        {rest.length > 0 && (
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-t-2 border-black pt-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              More stories
            </p>
            <div className="grid grid-cols-3 gap-6">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p
              className="text-gray-400 text-xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              No posts in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
