import { useParams, Link } from 'react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { creators, products } from '../data';
import { ProductCard } from '../components/ProductCard';

export function CreatorProfile() {
  const { id } = useParams();
  const creator = creators.find((c) => c.id === id);
  const creatorProducts = creator
    ? products.filter((p) => p.creatorId === creator.id)
    : [];
  const otherProducts = products.filter((p) => !creatorProducts.find((cp) => cp.id === p.id)).slice(0, 4);

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold text-4xl text-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Creator not found
          </h2>
          <Link to="/" className="text-[#FF90E8] font-bold underline">← Back to Discover</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover */}
      <div className="relative border-b-2 border-black">
        <img
          src={creator.cover}
          alt={`${creator.name} cover`}
          className="w-full h-56 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.background = '#FF90E8';
            (e.target as HTMLImageElement).src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Back */}
        <div className="py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black border-2 border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <ArrowLeft size={14} />
            Back to Discover
          </Link>
        </div>

        {/* Profile header */}
        <div className="flex items-end gap-6 -mt-8 mb-8 pb-8 border-b-2 border-black">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-24 h-24 rounded-full border-4 border-black object-cover flex-shrink-0 bg-white"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/100/100?random=${creator.id}`;
            }}
          />
          <div className="flex-1 pb-2">
            <h1
              className="font-bold text-black text-3xl mb-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              {creator.name}
            </h1>
            <p
              className="text-gray-500 text-sm mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {creator.handle}
            </p>
            <p
              className="text-gray-700 max-w-xl leading-relaxed"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {creator.bio}
            </p>
          </div>
          <div className="flex items-center gap-3 pb-2">
            <div className="text-right mr-4">
              <div className="flex gap-6">
                {[
                  { value: creator.followers, label: 'Followers' },
                  { value: String(creator.products), label: 'Products' },
                  { value: creator.totalSales || '', label: 'Earned' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p
                      className="font-bold text-black text-xl"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-gray-400 text-xs"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="bg-[#FF90E8] text-black font-bold px-6 py-2.5 rounded-full border-2 border-black hover:bg-black hover:text-white hover:border-black transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Follow
            </button>
            <button
              className="border-2 border-black text-black font-bold px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-3 mb-10">
          <span
            className="bg-[#FF90E8] text-black text-sm font-bold px-4 py-1.5 rounded-full border-2 border-black"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {creator.category}
          </span>
          <span
            className="text-gray-400 text-sm"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {creatorProducts.length > 0 ? `${creatorProducts.length} products available` : 'All products'}
          </span>
        </div>

        {/* Products */}
        <section className="mb-16">
          <h2
            className="font-bold text-black text-2xl mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Products by {creator.name}
          </h2>
          {creatorProducts.length > 0 ? (
            <div className="grid grid-cols-4 gap-5">
              {creatorProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="border-2 border-black rounded-2xl p-10 text-center">
              <p
                className="text-gray-400 text-lg mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                More products coming soon.
              </p>
              <div className="grid grid-cols-4 gap-5">
                {otherProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* About section */}
        <section className="border-t-2 border-black py-12 mb-12">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3
                className="font-bold text-black text-xl mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                About {creator.name}
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {creator.bio} With {creator.followers} followers and {creator.products} products on Gumroad, they're one of our most successful creators in the {creator.category} space.
              </p>
            </div>
            <div className="bg-[#FFF7EE] border-2 border-black rounded-2xl p-6">
              <h3
                className="font-bold text-black text-sm uppercase tracking-wider mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Creator stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Total followers', value: creator.followers },
                  { label: 'Products sold', value: creator.products },
                  { label: 'Total revenue', value: creator.totalSales || 'N/A' },
                  { label: 'Category', value: creator.category },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span
                      className="text-gray-500 text-sm"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="font-bold text-black text-sm"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
