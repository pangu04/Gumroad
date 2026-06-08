import { Link } from 'react-router';

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
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[6px_6px_0_0_#000] transition-shadow duration-150"
    >
      <div className="relative overflow-hidden">
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
      <div className="p-4">
        <h3
          className="font-bold text-black text-base leading-tight mb-1 group-hover:text-black"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {product.title}
        </h3>
        <Link
          to={`/creator/${product.creatorId}`}
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-gray-500 hover:text-black transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          by {product.creator}
        </Link>
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
              ({product.sales.toLocaleString()})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
