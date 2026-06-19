'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';
import { ProductCard } from '@/components/product/ProductCard';
import { CreatorCard } from '@/components/creator/CreatorCard';
import { creators, categories } from '@/data';
import { useI18n } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';
import { getBackendUrl } from '@/lib/api';

export default function Discover() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const { t } = useI18n();
  const { user } = useAuth();

  useEffect(() => {
    console.log('Fetching products from API...');
    const backendUrl = getBackendUrl();
    fetch(`${backendUrl}/api/products`)
      .then(res => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then(data => {
        console.log('Raw data from API:', data);
        const mapped = data.map((p: any) => ({
          ...p,
          creator: p.creator?.name || 'Unknown',
          creatorId: p.creatorId || '1',
          category: p.category?.name || 'Uncategorized',
          image: p.thumbnail || 'https://picsum.photos/400/300',
          sales: p.salesCount || 0,
        }));
        console.log('Mapped products:', mapped);
        setApiProducts(mapped);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const filtered = apiProducts.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredCreators = Array.from(new Set(apiProducts.map(p => p.creatorId))).slice(0, 3).map(id => {
    const products = apiProducts.filter(p => p.creatorId === id);
    const creatorProduct = products[0];
    return {
      id: id,
      name: creatorProduct.creator,
      handle: '@' + creatorProduct.creator.toLowerCase().replace(/\s+/g, ''),
      bio: `Creator of ${products.length} products.`,
      followers: Math.floor(Math.random() * 1000 + 100).toString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
      products: products.length,
      category: creatorProduct.category
    };
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FF90E8] border-b-2 border-black px-8 py-20 text-center">
        <p
          className="text-black font-semibold text-sm uppercase tracking-widest mb-4"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          {t.discover.heroSubtitle}
        </p>
        <h1
          className="font-bold text-black mb-6"
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          {t.discover.heroTitle1}
          <br />
          {t.discover.heroTitle2}
        </h1>
        <p
          className="text-black/70 text-lg mb-10 max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          {t.discover.heroDescription}
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            placeholder={t.discover.searchPlaceholder} 
            buttonText={t.discover.search}
            onSearch={(q) => setSearchQuery(q)}
            size="lg" 
          />
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
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            {t.discover.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-shrink-0 px-5 py-2 rounded-full border-2 border-black font-bold text-sm transition-colors ${
                activeCategory === cat.name ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8">


        {/* Trending Products */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-bold text-black text-3xl"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.02em' }}
            >
              {activeCategory === 'All' ? t.discover.trendingProducts : activeCategory}
            </h2>
            <span
              className="text-gray-500 text-sm"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              {filtered.length} {t.discover.products}
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
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.02em' }}
            >
              {t.discover.featuredCreators}
            </h2>
            <span
              className="text-sm font-semibold text-black border-b-2 border-black pb-0.5 hover:border-[#FF90E8] hover:text-[#FF90E8] transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              {t.discover.viewAll}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {featuredCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 border-t-2 border-black">
          <div className="bg-black rounded-3xl p-12 text-center">
            <h2
              className="font-bold text-white text-4xl mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.02em' }}
            >
              {t.discover.readyToSell}
            </h2>
            <p
              className="text-white/60 text-lg mb-8 max-w-md mx-auto"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              {t.discover.readyToSellDesc}
            </p>
            <Link
              href={user ? '/admin' : '/auth/register'}
              className="inline-block bg-[#FF90E8] text-black font-bold px-8 py-4 rounded-full text-lg border-2 border-[#FF90E8] hover:bg-white hover:border-white transition-colors"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              {user ? t.discover.goToDashboard : t.discover.startSellingToday}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
