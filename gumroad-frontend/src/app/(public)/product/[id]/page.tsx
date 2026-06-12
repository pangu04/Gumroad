'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Star, Download } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useI18n } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  thumbnail: string;
  fileUrl?: string;
  tags: string[];
  salesCount: number;
  categoryId: string;
  status: string;
  category: { id: string; name: string; icon: string; color: string };
  creator: { id: string; name: string; avatar: string; creatorProfile?: { handle: string } };
}

export default function ProductDetail() {
  const { id: slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [related, setRelated] = useState<any[]>([]);
  const [purchased, setPurchased] = useState(false);
  const [purchasedFileUrl, setPurchasedFileUrl] = useState<string | null>(null);
  const { t, locale } = useI18n();
  const { user, token } = useAuth();

  const backendUrl = typeof window !== 'undefined'
    ? `http://${window.location.hostname}:3001`
    : 'http://localhost:3001';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);

          // Fetch related from same creator
          if (data.creator?.id) {
            const relRes = await fetch(`${backendUrl}/api/products/creator/${data.creator.id}`);
            if (relRes.ok) {
              const relData = await relRes.json();
              setRelated(relData.filter((p: any) => p.id !== data.id).slice(0, 4));
            }
          }

          // Check if user already purchased this product
          if (token) {
            try {
              const purchRes = await fetch(`${backendUrl}/api/orders/my-purchases`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (purchRes.ok) {
                const purchases = await purchRes.json();
                const found = purchases.find((p: any) => p.id === data.id);
                if (found) {
                  setPurchased(true);
                  setPurchasedFileUrl(found.fileUrl || null);
                }
              }
            } catch (e) {
              // Ignore purchase check errors
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch product', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug, token]);

  const handleCheckout = async () => {
    if (!product) return;
    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = '/auth/login';
      return;
    }
    setIsCheckingOut(true);
    try {
      // Create order via the orders API
      const orderRes = await fetch(`${backendUrl}/api/orders/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id }),
      });
      if (orderRes.ok) {
        window.location.href = `/success?product_id=${product.id}`;
      } else {
        const err = await orderRes.json();
        alert(err.message || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF90E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold text-4xl text-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {t.product.notFound}
          </h2>
          <Link href="/" className="text-[#FF90E8] font-bold underline">{t.product.backToDiscover}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black border-2 border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors mb-10"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <ArrowLeft size={14} />
          {t.product.backBtn}
        </Link>

        <div className="grid grid-cols-3 gap-10">
          {/* Main content */}
          <div className="col-span-2">
            {/* Product image */}
            <div className="border-2 border-black rounded-2xl overflow-hidden mb-8">
              <img
                src={product.thumbnail || `https://picsum.photos/800/400?random=${product.id}`}
                alt={product.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span
                className="bg-[#FF90E8] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {product.category?.icon} {product.category?.name}
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
                  <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="font-bold text-black text-sm ml-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  5.0
                </span>
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {product.salesCount?.toLocaleString()} {t.product.sales}
              </span>
            </div>

            {/* Description */}
            {(product.description || product.longDescription) && (
              <div className="mb-8">
                <h2 className="font-bold text-black text-xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {t.product.aboutProduct}
                </h2>
                {product.description && (
                  <p className="text-gray-600 text-base leading-relaxed mb-4 whitespace-pre-wrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {product.description}
                  </p>
                )}
                {product.longDescription && (
                  <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {product.longDescription}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-8">
              {/* Pricing Card */}
              <div className="border-2 border-black rounded-3xl p-6 mb-6 shadow-[8px_8px_0_0_#000] bg-white">
                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-2">
                    <span
                      className="font-bold text-4xl text-black"
                      style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.03em' }}
                    >
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 font-semibold line-through mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-green-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {t.product.lifetimeAccess}
                  </p>
                </div>

                {purchased ? (
                  <>
                    <div className="bg-green-50 border-2 border-green-400 rounded-xl p-3 mb-3 text-center">
                      <p className="text-green-700 font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        ✅ {locale === 'vi' ? 'Bạn đã mua sản phẩm này' : 'You own this product'}
                      </p>
                    </div>
                    {purchasedFileUrl && (
                      <a
                        href={purchasedFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-4 rounded-xl border-2 border-black hover:bg-[#FF90E8] hover:text-black transition-colors mb-4"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        <Download size={18} />
                        {locale === 'vi' ? 'Tải xuống' : 'Download'}
                      </a>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-[#FF90E8] text-black font-bold py-4 rounded-xl border-2 border-black hover:bg-black hover:text-white transition-colors mb-4 disabled:opacity-50"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {isCheckingOut
                      ? (locale === 'vi' ? 'Đang xử lý...' : 'Processing...')
                      : t.product.buyNow}
                  </button>
                )}

                <p className="text-xs text-center text-gray-500 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {t.product.secureCheckout}
                </p>
              </div>

              {/* Creator Card */}
              {product.creator && (
                <div className="border-2 border-black rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-black overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={product.creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${product.creator.id}`}
                        alt={product.creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-black text-lg truncate" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                        {product.creator.name}
                      </h3>
                      <Link
                        href={`/creator/${product.creator.id}`}
                        className="text-sm text-[#FF90E8] font-bold hover:underline"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {t.product.viewProfile} →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* More from this creator */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t-2 border-black">
            <h2
              className="font-bold text-black text-3xl mb-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              {t.product.moreLikeThis}
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {related.map((p) => (
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
                  creatorId: p.creatorId,
                  creatorName: p.creator?.name,
                  creatorAvatar: p.creator?.avatar
                } as any} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
