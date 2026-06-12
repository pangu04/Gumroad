import Link from 'next/link';

interface Creator {
  id: string;
  name: string;
  handle: string;
  bio: string;
  followers: string;
  avatar: string;
  products: number;
  category: string;
  totalSales?: string;
}

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link
      href={`/creator/${creator.id}`}
      className="group block bg-white border-2 border-black rounded-2xl p-5 hover:shadow-[6px_6px_0_0_#000] transition-shadow duration-150"
    >
      <div className="flex items-start gap-4">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-14 h-14 rounded-full border-2 border-black object-cover flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/100/100?random=${creator.id}`;
          }}
        />
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-black text-base leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {creator.name}
          </h3>
          <p
            className="text-sm text-gray-500 mb-1"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {creator.handle}
          </p>
          <p
            className="text-sm text-gray-700 leading-snug line-clamp-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {creator.bio}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span
          className="bg-[#FF90E8] text-black text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {creator.category}
        </span>
        <span
          className="text-xs text-gray-500"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {creator.followers} followers
        </span>
        <span
          className="text-xs text-gray-500"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {creator.products} products
        </span>
      </div>
    </Link>
  );
}
