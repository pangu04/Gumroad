import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  creator: string;
  creatorId: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  sales: number;
  image: string;
  tags?: string[];
  slug?: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="group relative block bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[6px_6px_0_0_#000] transition-shadow duration-150"
    >
      <Link href={`/product/${product.slug || product.id}`} className="absolute inset-0 z-0" aria-label={`View ${product.title}`} />
      
      <div className="relative overflow-hidden z-10 pointer-events-none">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/400/300?random=${product.id}`;
          }}
        />
        <span
          className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {product.category}
        </span>
      </div>
      <div className="p-4 relative z-10 pointer-events-none">
        <h3
          className="font-bold text-black text-base leading-tight mb-1 group-hover:text-black pointer-events-auto"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <Link href={`/product/${product.slug || product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>
        <div className="pointer-events-auto inline-block">
          <Link
            href={`/creator/${product.creatorId}`}
            className="text-sm text-gray-500 hover:text-black transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            by {product.creator}
          </Link>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="font-bold text-black text-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span
                className="text-gray-400 text-sm line-through"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span
              className="text-sm font-semibold text-black"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {product.rating}
            </span>
            <span
              className="text-sm text-gray-400"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              ({product.sales?.toLocaleString() || 0})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
