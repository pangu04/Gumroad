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
  reviews?: { id: string; rating: number; comment: string; createdAt: string; user: { name: string; avatar: string; } }[];
  rating: number;
}

export default function ProductDetail() {
  const { id: slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [related, setRelated] = useState<any[]>([]);
  const [purchased, setPurchased] = useState(false);
  const [purchasedFileUrl, setPurchasedFileUrl] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
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

            // We removed auto-fill so the review box is always empty on load
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !product) return;
    setSubmittingReview(true);
    try {
      const res = await fetch(`${backendUrl}/api/products/${product.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment })
      });
      if (res.ok) {
        const newReview = await res.json();
        alert(locale === 'vi' ? 'Đánh giá thành công!' : 'Review submitted!');
        
        // Reset the form
        setReviewRating(5);
        setReviewComment('');
        
        // Optimistically update product state so review appears below
        setProduct((prev: any) => {
          if (!prev) return prev;
          let newReviews = [...(prev.reviews || [])];
          const existingIndex = newReviews.findIndex((r: any) => r.user?.name === user?.name);
          
          if (existingIndex >= 0) {
            newReviews[existingIndex] = { ...newReviews[existingIndex], rating: newReview.rating, comment: newReview.comment };
          } else {
            newReviews.unshift({
              id: newReview.id || Date.now().toString(),
              rating: newReview.rating,
              comment: newReview.comment,
              createdAt: newReview.createdAt || new Date().toISOString(),
              user: { name: user?.name || 'You', avatar: user?.avatar || '' }
            });
          }
          
          const newRating = newReviews.reduce((acc, r) => acc + r.rating, 0) / newReviews.length;
          return { ...prev, reviews: newReviews, rating: newRating };
        });
      } else {
        const err = await res.json();
        alert(err.message || 'Error submitting review');
      }
    } catch (err) {
      alert('Error submitting review');
    } finally {
      setSubmittingReview(false);
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
                  <Star key={star} size={16} className={star <= (product.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
                <span className="font-bold text-black text-sm ml-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {Number(product.rating || 5).toFixed(1)}
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

            {/* Reviews Section */}
            <div className="mb-8 pt-8 border-t-2 border-black">
              <h2 className="font-bold text-black text-xl mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'vi' ? 'Đánh giá sản phẩm' : 'Product Reviews'}
              </h2>
              
              {purchased && (
                <form onSubmit={handleReviewSubmit} className="mb-8 bg-gray-50 p-6 rounded-2xl border-2 border-black">
                  <h3 className="font-bold text-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Viết đánh giá của bạn' : 'Write a review'}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star size={24} className={star <= reviewRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder={locale === 'vi' ? 'Chia sẻ cảm nhận của bạn...' : 'Share your thoughts...'}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-[#FF90E8]"
                    rows={3}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  />
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-[#FF90E8] text-black font-bold px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {submittingReview ? '...' : (locale === 'vi' ? 'Gửi đánh giá' : 'Submit Review')}
                  </button>
                </form>
              )}

              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((r: any) => (
                    <div key={r.id} className="border-2 border-black rounded-xl p-4 bg-white">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={r.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.user.name}`} alt={r.user.name} className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                        <div>
                          <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{r.user.name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {r.comment && (
                        <p className="text-gray-600 text-sm mt-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{r.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {locale === 'vi' ? 'Chưa có đánh giá nào.' : 'No reviews yet.'}
                </p>
              )}
            </div>
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
                  {!purchased && (
                    <p className="text-sm font-semibold text-green-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {t.product.lifetimeAccess}
                    </p>
                  )}
                </div>

                {purchased ? (
                  <>
                    {purchasedFileUrl && (
                      <a
                        href={purchasedFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-[#FF90E8] text-black font-bold py-4 rounded-xl border-2 border-black hover:bg-black hover:text-white transition-colors mb-4"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        <Download size={18} />
                        {locale === 'vi' ? 'Lấy file ngay' : 'Get file now'}
                      </a>
                    )}
                  </>
                ) : (
                  <>
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
                    <p className="text-xs text-center text-gray-500 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {t.product.secureCheckout}
                    </p>
                  </>
                )}

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
