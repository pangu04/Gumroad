'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useI18n } from '@/i18n';
import { getBackendUrl } from '@/lib/api';

export default function CreatorProfile() {
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  const backendUrl = getBackendUrl();

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products/creator/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          if (data.length > 0) {
            setCreator(data[0].creator);
          }
        }
      } catch (err) {
        console.error('Failed to fetch creator data', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCreatorData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#FF90E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Creator Header */}
      <section className="bg-[#FF90E8] border-b-2 border-black py-16 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-24 h-24 mx-auto border-2 border-black rounded-full overflow-hidden mb-6 bg-white shadow-[4px_4px_0_0_#000]">
            <img
              src={creator?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`}
              alt={creator?.name || 'Creator'}
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="font-bold text-black text-4xl mb-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.03em' }}
          >
            {creator?.name || 'Creator'}
          </h1>
          {creator?.creatorProfile?.handle && (
            <p className="text-black/70 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              @{creator.creatorProfile.handle}
            </p>
          )}
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black border-2 border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <ArrowLeft size={14} />
          {t.product.backBtn}
        </Link>
      </div>

      {/* Creator Products */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <h2
          className="font-bold text-black text-2xl mb-8"
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
        >
          {t.creator.products} ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-20 border-2 border-black border-dashed rounded-3xl">
            <p className="text-gray-500 font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.creator.notFound}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={{
                id: p.id,
                title: p.title,
                slug: p.slug,
                price: p.price,
                originalPrice: p.originalPrice,
                image: p.thumbnail,
                category: p.category?.name,
                rating: 5,
                sales: p.salesCount,
                creatorId: p.creator?.id,
                creatorName: p.creator?.name,
                creatorAvatar: p.creator?.avatar
              } as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
