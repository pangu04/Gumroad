import { useParams, Link } from 'react-router';
import { ArrowLeft, Star, Download, Shield, Clock } from 'lucide-react';
import { products, creators } from '../data';
import { ProductCard } from '../components/ProductCard';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const creator = product ? creators.find((c) => c.id === product.creatorId) : null;
  const related = products.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold text-4xl text-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Product not found
          </h2>
          <Link to="/" className="text-[#FF90E8] font-bold underline">← Back to Discover</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black border-2 border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors mb-10"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <ArrowLeft size={14} />
          Back to Discover
        </Link>

        <div className="grid grid-cols-3 gap-10">
          {/* Main content */}
          <div className="col-span-2">
            {/* Product image */}
            <div className="border-2 border-black rounded-2xl overflow-hidden mb-8">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/800/400?random=${product.id}`;
                }}
              />
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-6">
              <span
                className="bg-[#FF90E8] text-black text-xs font-bold px-3 py-1 rounded-full"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {product.category}
              </span>
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="border-2 border-black text-black text-xs font-bold px-3 py-1 rounded-full"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="font-bold text-black mb-4"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '2.5rem',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {product.title}
            </h1>

            {/* Rating & sales */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-black">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
                <span
                  className="font-bold text-black text-sm ml-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-300">·</span>
              <span
                className="text-sm text-gray-500"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {product.sales.toLocaleString()} sales
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2
                className="font-bold text-black text-xl mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                About this product
              </h2>
              <p
                className="text-gray-600 text-base leading-relaxed mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {product.description}
              </p>
              <p
                className="text-gray-600 text-base leading-relaxed"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {product.longDescription}
              </p>
            </div>

            {/* What's included */}
            <div className="border-2 border-black rounded-2xl p-6 mb-8">
              <h3
                className="font-bold text-black text-lg mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                What's included
              </h3>
              <ul className="space-y-3">
                {[
                  'Instant digital download',
                  'Lifetime access & free updates',
                  'Commercial license included',
                  '30-day money-back guarantee',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FF90E8] flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xs font-bold">✓</span>
                    </span>
                    <span
                      className="text-gray-700 text-sm"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Creator */}
            {creator && (
              <div className="border-2 border-black rounded-2xl p-6">
                <h3
                  className="font-bold text-black text-lg mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  About the creator
                </h3>
                <Link
                  to={`/creator/${creator.id}`}
                  className="flex items-start gap-4 group"
                >
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-14 h-14 rounded-full border-2 border-black object-cover flex-shrink-0"
                  />
                  <div>
                    <p
                      className="font-bold text-black group-hover:text-[#FF90E8] transition-colors"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {creator.name}
                    </p>
                    <p
                      className="text-gray-500 text-sm mb-2"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {creator.handle} · {creator.followers} followers
                    </p>
                    <p
                      className="text-gray-600 text-sm leading-relaxed"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {creator.bio}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-24">
              <div className="border-2 border-black rounded-2xl p-6 mb-4">
                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="font-bold text-black"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '2.5rem',
                      lineHeight: 1,
                    }}
                  >
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span
                      className="text-gray-400 text-xl line-through"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span
                      className="bg-[#FF90E8] text-black text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                <button
                  className="w-full bg-[#FF90E8] text-black font-bold py-4 rounded-full border-2 border-black hover:bg-black hover:text-white hover:border-black transition-colors mb-3 text-lg"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Buy now
                </button>
                <p
                  className="text-center text-xs text-gray-400"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Secure checkout powered by Stripe
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    { icon: Download, text: 'Instant digital download' },
                    { icon: Shield, text: '30-day money-back guarantee' },
                    { icon: Clock, text: 'Lifetime access' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon size={14} className="text-gray-400 flex-shrink-0" />
                      <span
                        className="text-xs text-gray-500"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="border-2 border-black rounded-2xl p-5">
                <p
                  className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Share
                </p>
                <div className="flex gap-2">
                  {['Twitter', 'Copy link', 'Email'].map((s) => (
                    <button
                      key={s}
                      className="flex-1 border-2 border-black rounded-lg py-2 text-xs font-bold text-black hover:bg-[#FF90E8] transition-colors"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-16 pt-12 border-t-2 border-black">
          <h3
            className="font-bold text-black text-2xl mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            More like this
          </h3>
          <div className="grid grid-cols-4 gap-5">
            {(related.length > 0 ? related : fallbackRelated).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
