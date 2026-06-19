'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';
import { getBackendUrl } from '@/lib/api';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product_id');
  const { token } = useAuth();
  const { locale } = useI18n();
  const [productInfo, setProductInfo] = useState<any>(null);

  const backendUrl = getBackendUrl();

  useEffect(() => {
    if (token) {
      fetch(`${backendUrl}/api/orders/my-purchases`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          const found = data.find((p: any) => p.id === productId);
          if (found) setProductInfo(found);
        })
        .catch(() => {});
    }
  }, [token, productId]);

  return (
    <>
      <div className="w-24 h-24 bg-[#FF90E8] border-2 border-black rounded-full flex items-center justify-center mb-8 mx-auto shadow-[4px_4px_0_0_#000]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {locale === 'vi' ? 'Thanh toán thành công!' : 'Payment Successful!'}
      </h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {locale === 'vi'
          ? 'Cảm ơn bạn đã mua hàng. Sản phẩm kỹ thuật số của bạn đã sẵn sàng để tải xuống.'
          : 'Thank you for your purchase. Your digital product is ready for download.'}
      </p>
      
      <div className="flex gap-4 justify-center flex-wrap">
        {productInfo?.fileUrl && (
          <a 
            href={productInfo.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white font-bold py-3 px-8 rounded-full border-2 border-black hover:bg-[#FF90E8] hover:text-black transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <Download size={18} />
            {locale === 'vi' ? 'Tải xuống ngay' : 'Download Now'}
          </a>
        )}
        <Link 
          href="/"
          className="bg-white text-black font-bold py-3 px-8 rounded-full border-2 border-black hover:bg-gray-50 transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {locale === 'vi' ? 'Quay lại Khám phá' : 'Back to Discover'}
        </Link>
      </div>

      {productInfo && (
        <div className="mt-10 bg-gray-50 border-2 border-black rounded-2xl p-6 max-w-sm mx-auto">
          <h3 className="font-bold text-black text-lg mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {productInfo.title}
          </h3>
          {productInfo.thumbnail && (
            <img src={productInfo.thumbnail} alt={productInfo.title} className="w-full h-32 object-cover rounded-xl border-2 border-black" />
          )}
        </div>
      )}
    </>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <Suspense fallback={<div className="w-8 h-8 border-4 border-[#FF90E8] border-t-transparent rounded-full animate-spin mx-auto" />}>
        <SuccessPageContent />
      </Suspense>
    </div>
  );
}
