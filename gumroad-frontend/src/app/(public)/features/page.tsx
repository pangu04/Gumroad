'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n';
import {
  BarChart2,
  CreditCard,
  Download,
  Users,
  Mail,
  Globe,
  Tag,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mainFeatures = [
  {
    icon: CreditCard,
    title: 'Sell anything',
    description: 'Digital downloads, courses, memberships, physical products, software licenses — Gumroad handles all of it. One platform, endless product types.',
    color: '#FF90E8',
  },
  {
    icon: BarChart2,
    title: 'Analytics that matter',
    description: 'See where your sales come from, which products perform best, and how your audience grows over time. Real insights, no data science degree required.',
    color: '#B9F0A1',
  },
  {
    icon: Users,
    title: 'Memberships & subscriptions',
    description: 'Build recurring revenue with memberships. Offer exclusive content, community access, and monthly perks — all managed through Gumroad.',
    color: '#FFE580',
  },
  {
    icon: Mail,
    title: 'Email marketing built in',
    description: 'Email your customers directly from Gumroad. Send updates, new product announcements, and newsletters without a separate tool.',
    color: '#A8D8FF',
  },
];

const additionalFeatures = [
  { icon: Download, title: 'Instant delivery', description: 'Files delivered immediately after purchase. No delays, no hassle.' },
  { icon: Globe, title: 'Custom domain', description: 'Use your own domain for a professional, branded storefront.' },
  { icon: Tag, title: 'Discount codes', description: 'Create time-limited or quantity-limited discount codes for promotions.' },
  { icon: Shield, title: 'Fraud protection', description: 'Built-in fraud detection keeps you safe without any setup.' },
  { icon: Smartphone, title: 'Mobile optimized', description: 'Your store looks great on every device, automatically.' },
  { icon: Zap, title: 'Instant payouts', description: 'Weekly payouts directly to your bank account or PayPal.' },
];

export default function Features() {
  const { t, locale } = useI18n();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b-2 border-black px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p
            className="text-[#FF90E8] font-bold text-sm uppercase tracking-widest mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t.staticPages.features.tag}
          </p>
          <h1
            className="font-bold text-black mb-6"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            {t.staticPages.features.heroTitle1}
            <br />
            {t.staticPages.features.heroTitle2}
          </h1>
          <p
            className="text-gray-500 text-xl max-w-xl mx-auto"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {locale === 'vi' ? 'Gumroad là nền tảng thương mại hoàn chỉnh cho nhà sáng tạo. Sản phẩm, thanh toán, email, phân tích — tất cả trong một nơi.' : 'Gumroad is a complete creator commerce platform. Products, payments, emails, analytics — all in one place.'}
          </p>
        </div>
      </section>

      {/* Main features */}
      <section className="px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {(locale === 'vi' ? [
              {
                icon: CreditCard,
                title: 'Bán mọi thứ',
                description: 'Tệp kỹ thuật số, khóa học, thẻ thành viên, phần mềm, hàng hóa vật lý — Gumroad xử lý tất cả. Một nền tảng, vô vàn loại sản phẩm.',
                color: '#FF90E8',
              },
              {
                icon: BarChart2,
                title: 'Phân tích quan trọng',
                description: 'Xem nguồn doanh thu từ đâu, sản phẩm nào bán chạy nhất, và tệp khách hàng tăng trưởng ra sao. Dữ liệu thực, không cần bằng cấp khoa học dữ liệu.',
                color: '#B9F0A1',
              },
              {
                icon: Users,
                title: 'Thành viên & Đăng ký',
                description: 'Tạo doanh thu định kỳ với hệ thống thẻ thành viên. Cung cấp nội dung độc quyền, truy cập cộng đồng, và quyền lợi hàng tháng.',
                color: '#FFE580',
              },
              {
                icon: Mail,
                title: 'Tích hợp Email marketing',
                description: 'Gửi email trực tiếp cho khách hàng từ Gumroad. Gửi thông báo, sản phẩm mới, và bản tin mà không cần dùng tool ngoài.',
                color: '#A8D8FF',
              },
            ] : mainFeatures).map((feature) => (
              <div
                key={feature.title}
                className="border-2 border-black rounded-3xl p-10 hover:shadow-[6px_6px_0_0_#000] transition-shadow duration-150"
                style={{ backgroundColor: feature.color }}
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3
                  className="font-bold text-black text-2xl mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-black/70 text-base leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product selling showcase */}
      <section className="border-t-2 border-black bg-[#FFF7EE] px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="bg-[#FF90E8] text-black text-xs font-bold px-3 py-1 rounded-full"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Selling
              </span>
              <h2
                className="font-bold text-black mt-4 mb-6"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '2.5rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {locale === 'vi' ? 'Thiết lập cửa hàng trong vài phút.' : 'Set up your store in minutes.'}
              </h2>
              <p
                className="text-gray-600 text-lg leading-relaxed mb-8"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {locale === 'vi' ? 'Tạo sản phẩm, đặt giá và bắt đầu bán. Gumroad lo liệu thanh toán và giao hàng. Bạn chỉ tập trung vào sáng tạo.' : 'Create a product, set your price, and start selling. Gumroad handles the checkout, delivery, and payments. You focus on creating.'}
              </p>
              <ul className="space-y-4">
                {(locale === 'vi' ? [
                  'Tải lên tệp mọi kích thước',
                  'Tự đặt giá (Hỗ trợ mô hình pay-what-you-want)',
                  'Tự động gửi tệp sau khi mua',
                  'Tạo khóa bản quyền cho phần mềm',
                  'Hỗ trợ mọi loại tiền tệ',
                ] : [
                  'Upload files up to any size',
                  'Set your own pricing (pay-what-you-want supported)',
                  'Automatic file delivery after purchase',
                  'Built-in license key generation for software',
                  'Sell in any currency',
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span
                      className="text-gray-700"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border-2 border-black rounded-3xl p-6">
              <div className="border-2 border-black rounded-2xl overflow-hidden">
                <div className="bg-black p-3 flex gap-1.5">
                  {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                  ))}
                </div>
                <div className="bg-white p-6">
                  <div className="border-2 border-black rounded-xl p-4 mb-3">
                    <p className="text-xs font-bold text-gray-400 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{locale === 'vi' ? 'TÊN SẢN PHẨM' : 'PRODUCT NAME'}</p>
                    <p className="font-bold text-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{locale === 'vi' ? 'Bộ công cụ UI hoàn chỉnh 2024' : 'Complete UI Kit 2024'}</p>
                  </div>
                  <div className="border-2 border-black rounded-xl p-4 mb-3">
                    <p className="text-xs font-bold text-gray-400 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{locale === 'vi' ? 'GIÁ BÁN' : 'PRICE'}</p>
                    <p className="font-bold text-black text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>$49</p>
                  </div>
                  <div className="border-2 border-black rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-gray-400 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{locale === 'vi' ? 'TỆP TIN' : 'FILE'}</p>
                    <p className="font-bold text-black text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ui-kit-2024.fig • 48 MB</p>
                  </div>
                  <button
                    className="w-full bg-[#FF90E8] text-black font-bold py-3 rounded-xl border-2 border-black"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {locale === 'vi' ? 'Đăng sản phẩm →' : 'Publish product →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics showcase */}
      <section className="border-t-2 border-black px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="bg-black rounded-3xl p-8">
              <p
                className="text-white/50 text-xs font-bold uppercase tracking-widest mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {locale === 'vi' ? 'Doanh thu tháng này' : 'Revenue this month'}
              </p>
              <p
                className="text-white font-bold mb-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '3rem', lineHeight: 1 }}
              >
                $12,430
              </p>
              <p className="text-[#FF90E8] font-semibold mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                ↑ 34% {locale === 'vi' ? 'so với tháng trước' : 'vs last month'}
              </p>
              <div className="flex items-end gap-1 h-24">
                {[40, 60, 45, 80, 65, 90, 75, 100, 85, 95, 70, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-[#FF90E8]/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                {(locale === 'vi' ? [
                  { label: 'Doanh số', value: '248' },
                  { label: 'Khách hàng', value: '196' },
                  { label: 'Đơn TB', value: '$50' },
                ] : [
                  { label: 'Sales', value: '248' },
                  { label: 'Customers', value: '196' },
                  { label: 'Avg. order', value: '$50' },
                ]).map((stat) => (
                  <div key={stat.label}>
                    <p className="text-white font-bold text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat.value}</p>
                    <p className="text-white/40 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span
                className="bg-[#B9F0A1] text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-black"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Analytics
              </span>
              <h2
                className="font-bold text-black mt-4 mb-6"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '2.5rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Know your numbers. Grow your business.
              </h2>
              <p
                className="text-gray-600 text-lg leading-relaxed mb-8"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {locale === 'vi' ? 'Bảng phân tích của chúng tôi hiển thị những thứ quan trọng: xu hướng doanh thu, sản phẩm bán chạy, nguồn khách hàng.' : 'Our analytics dashboard shows you everything that matters: revenue trends, top products, customer sources, and conversion rates.'}
              </p>
              <ul className="space-y-4">
                {(locale === 'vi' ? [
                  'Biểu đồ doanh thu và lượng bán',
                  'Nguồn truy cập và theo dõi UTM',
                  'Thông tin nhân khẩu học khách hàng',
                  'So sánh hiệu suất sản phẩm',
                  'Phân tích phễu chuyển đổi',
                ] : [
                  'Revenue and sales charts',
                  'Traffic sources and UTM tracking',
                  'Customer demographics',
                  'Product performance comparison',
                  'Conversion funnel analysis',
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#B9F0A1] border-2 border-black flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-black text-xs font-bold">✓</span>
                    </span>
                    <span
                      className="text-gray-700"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional features grid */}
      <section className="border-t-2 border-black bg-[#FFF7EE] px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-black text-3xl mb-10 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {locale === 'vi' ? 'Tất cả mọi thứ khác bạn cần' : 'Everything else you need'}
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {(locale === 'vi' ? [
              { icon: Download, title: 'Giao hàng ngay lập tức', description: 'Tệp được giao ngay sau khi mua. Không chậm trễ, không rắc rối.' },
              { icon: Globe, title: 'Tên miền tùy chỉnh', description: 'Sử dụng tên miền riêng để có gian hàng chuyên nghiệp.' },
              { icon: Tag, title: 'Mã giảm giá', description: 'Tạo mã giảm giá giới hạn thời gian hoặc số lượng cho khuyến mãi.' },
              { icon: Shield, title: 'Bảo vệ chống gian lận', description: 'Phát hiện gian lận được tích hợp sẵn giúp bạn an toàn.' },
              { icon: Smartphone, title: 'Tối ưu cho di động', description: 'Gian hàng trông tuyệt vời trên mọi thiết bị, tự động.' },
              { icon: Zap, title: 'Thanh toán tức thì', description: 'Thanh toán hàng tuần trực tiếp vào tài khoản ngân hàng hoặc PayPal.' },
            ] : additionalFeatures).map((feature) => (
              <div
                key={feature.title}
                className="bg-white border-2 border-black rounded-2xl p-6 hover:shadow-[4px_4px_0_0_#000] transition-shadow duration-150"
              >
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={18} className="text-white" />
                </div>
                <h3
                  className="font-bold text-black text-lg mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-black bg-[#FF90E8] px-8 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-bold text-black text-4xl mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {locale === 'vi' ? 'Dành cho nhà sáng tạo muốn kinh doanh thực thụ.' : 'Built for creators who mean business.'}
          </h2>
          <p
            className="text-black/70 text-lg mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {locale === 'vi' ? 'Bắt đầu bán trong vài phút. Không yêu cầu kiến thức kỹ thuật.' : 'Start selling in minutes. No technical knowledge required.'}
          </p>
          <Link
            href={user ? "/admin" : "/auth/register"}
            className="inline-block bg-black text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-900 transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {user ? (locale === 'vi' ? 'Đi đến Trang quản trị →' : 'Go to Dashboard →') : (locale === 'vi' ? 'Bắt đầu bán hàng ngay →' : 'Start selling for free →')}
          </Link>
        </div>
      </section>
    </div>
  );
}
