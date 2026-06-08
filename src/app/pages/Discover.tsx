import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { CreatorCard } from '../components/CreatorCard';
import { products, creators, categories } from '../data';

export function Discover() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FF90E8] border-b-2 border-black px-8 py-20 text-center">
        <p
          className="text-black font-semibold text-sm uppercase tracking-widest mb-4"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          The marketplace for digital creators
        </p>
        <h1
          className="font-bold text-black mb-6"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          Discover creative work
          <br />
          from independent creators.
        </h1>
        <p
          className="text-black/70 text-lg mb-10 max-w-xl mx-auto"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Millions of products from creators worldwide. Books, music, design assets, courses, and more.
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar placeholder="Search products, creators, categories..." size="lg" />
        </div>
      </section>

      {/* Categories */}
      <section className="border-b-2 border-black px-8 py-6 bg-white">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory('All')}
            className={`flex-shrink-0 px-5 py-2 rounded-full border-2 border-black font-bold text-sm transition-colors ${
              activeCategory === 'All' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
            }`}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-shrink-0 px-5 py-2 rounded-full border-2 border-black font-bold text-sm transition-colors ${
                activeCategory === cat.name ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8">
        {/* Category Cards */}
        <section className="py-16">
          <h2
            className="font-bold text-black text-3xl mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Browse by category
          </h2>
          <div className="grid grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className="border-2 border-black rounded-2xl p-5 text-left hover:shadow-[4px_4px_0_0_#000] transition-shadow duration-150 group"
                style={{ backgroundColor: cat.color }}
              >
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h3
                  className="font-bold text-black text-base"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {cat.name}
                </h3>
                <p
                  className="text-black/60 text-xs mt-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {cat.count.toLocaleString()} products
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-8 border-t-2 border-black">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-bold text-black text-3xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              {activeCategory === 'All' ? 'Trending products' : activeCategory}
            </h2>
            <span
              className="text-gray-500 text-sm"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {filtered.length} products
            </span>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Featured Creators */}
        <section className="py-16 border-t-2 border-black">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-bold text-black text-3xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Featured creators
            </h2>
            <span
              className="text-sm font-semibold text-black border-b-2 border-black pb-0.5 hover:border-[#FF90E8] hover:text-[#FF90E8] transition-colors cursor-pointer"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              View all →
            </span>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 border-t-2 border-black">
          <div className="bg-black rounded-3xl p-12 text-center">
            <h2
              className="font-bold text-white text-4xl mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Ready to start selling?
            </h2>
            <p
              className="text-white/60 text-lg mb-8 max-w-md mx-auto"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Join 100,000+ creators earning a living from their work.
            </p>
            <a
              href="/start-selling"
              className="inline-block bg-[#FF90E8] text-black font-bold px-8 py-4 rounded-full text-lg border-2 border-[#FF90E8] hover:bg-white hover:border-white transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Start selling today →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
