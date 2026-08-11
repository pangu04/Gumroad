'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';
import { Plus, Package, LogOut, Edit, Trash2, Upload, X, Eye, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getBackendUrl } from '@/lib/api';

interface Product {
  id: string;
  title: string;
  slug: string;
  price: string;
  originalPrice?: string | number;
  description?: string;
  longDescription?: string;
  thumbnail?: string;
  fileUrl?: string;
  tags?: string[];
  status: string;
  salesCount: number;
  categoryId?: string;
  category?: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function AdminDashboard() {
  const { user, token, logout, loading } = useAuth();
  const router = useRouter();
  const { t, locale } = useI18n();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'reports' | 'purchases' | 'profile'>('products');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  const [purchases, setPurchases] = useState<Product[]>([]);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', avatar: user?.avatar || '' });
  const [reportYear, setReportYear] = useState<number>(new Date().getFullYear());

  const [form, setForm] = useState({
    title: '',
    slug: '',
    categoryId: '',
    price: '',
    originalPrice: '',
    description: '',
    longDescription: '',
    thumbnail: '',
    fileUrl: '',
    tags: '',
    status: 'ACTIVE',
  });
  
  const [revenueData, setRevenueData] = useState<{totalRevenue: number, totalSales: number, chartData: any[]}>({
    totalRevenue: 0,
    totalSales: 0,
    chartData: []
  });

  const backendUrl = getBackendUrl();

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
    if (user) {
      setProfileForm({ name: user.name || '', avatar: user.avatar || '' });
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (token && user) {
      fetchCategories();
      fetchMyProducts();
      fetchRevenue(reportYear);
      fetchPurchases();
    }
  }, [user, token, router, reportYear]);

  const fetchPurchases = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/orders/my-purchases`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setPurchases(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchRevenue = async (year: number) => {
    try {
      const res = await fetch(`${backendUrl}/api/orders/my-revenue?year=${year}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRevenueData(data);
      }
    } catch (error) {
      console.error('Failed to fetch revenue', error);
    }
  };

  const fetchMyProducts = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/products/my/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProducts(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/products/categories`);
      if (res.ok) setCategories(await res.json());
    } catch (e) { console.error(e); }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${backendUrl}/api/products/upload-thumbnail`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setForm((f) => ({ ...f, thumbnail: url }));
      showToast('Image uploaded to Cloudinary!');
    } catch (e) {
      showToast('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setUploadingAvatar(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${backendUrl}/api/products/upload-thumbnail`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setProfileForm((f) => ({ ...f, avatar: url }));
      showToast('Avatar uploaded!');
    } catch (e) {
      showToast('Upload failed');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!form.fileUrl) {
        showToast('Vui lòng cung cấp link tải File (File URL)');
        setSaving(false);
        return;
      }

      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        categoryId: form.categoryId,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        description: form.description,
        longDescription: form.longDescription,
        thumbnail: form.thumbnail,
        fileUrl: form.fileUrl,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
        status: form.status,
      };

      const url = editProduct
        ? `${backendUrl}/api/products/${editProduct.id}`
        : `${backendUrl}/api/products`;
      const method = editProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Save failed');
      }

      showToast(editProduct ? 'Product updated!' : 'Product created!');
      setShowForm(false);
      setEditProduct(null);
      resetForm();
      fetchMyProducts();
    } catch (err: any) {
      showToast(`${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${backendUrl}/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast('Product deleted');
        fetchMyProducts();
      }
    } catch (e) { showToast('Delete failed'); }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/auth/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });
      if (res.ok) {
        showToast(locale === 'vi' ? 'Cập nhật thông tin thành công!' : 'Profile updated!');
        // Ideally should update context, but a reload or re-fetch would also work.
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast('Cập nhật thất bại');
      }
    } catch (e) {
      showToast('Cập nhật thất bại');
    }
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      title: p.title,
      slug: p.slug,
      categoryId: p.categoryId || p.category?.id || '',
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      description: p.description || '',
      longDescription: p.longDescription || '',
      thumbnail: p.thumbnail || '',
      fileUrl: p.fileUrl || '',
      tags: p.tags ? p.tags.join(', ') : '',
      status: p.status || 'ACTIVE',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ title: '', slug: '', categoryId: '', price: '', originalPrice: '', description: '', longDescription: '', thumbnail: '', fileUrl: '', tags: '', status: 'ACTIVE' });
    setEditProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF90E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFF7EE]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-sm animate-in slide-in-from-top"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {toast}
        </div>
      )}

      {/* Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-white border-r-2 border-black flex flex-col">
          <div className="p-6 border-b-2 border-black">
            <Link href="/">
              <span className="font-bold text-2xl text-black" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.03em' }}>
                DigitalNook
              </span>
            </Link>
            <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.dashboard}</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full px-3 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                activeTab === 'products' ? 'bg-[#FF90E8] text-black border-2 border-black font-bold' : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <Package size={18} className={activeTab === 'products' ? 'text-black' : 'text-gray-500'} />
              <span className="text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {t.admin.myProducts}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full px-3 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                activeTab === 'reports' ? 'bg-[#FF90E8] text-black border-2 border-black font-bold' : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <TrendingUp size={18} className={activeTab === 'reports' ? 'text-black' : 'text-gray-500'} />
              <span className="text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'vi' ? 'Báo cáo' : 'Reports'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`w-full px-3 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                activeTab === 'purchases' ? 'bg-[#FF90E8] text-black border-2 border-black font-bold' : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <Package size={18} className={activeTab === 'purchases' ? 'text-black' : 'text-gray-500'} />
              <span className="text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'vi' ? 'Sản phẩm đã mua' : 'My Purchases'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-3 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                activeTab === 'profile' ? 'bg-[#FF90E8] text-black border-2 border-black font-bold' : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <Edit size={18} className={activeTab === 'profile' ? 'text-black' : 'text-gray-500'} />
              <span className="text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'vi' ? 'Thông tin cá nhân' : 'Profile Info'}
              </span>
            </button>
          </nav>

          <div className="p-4 border-t-2 border-black">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#FF90E8] border-2 border-black overflow-hidden flex items-center justify-center flex-shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-black text-sm">{user.name[0]}</span>
                )}
              </div>
              <div>
                <p className="font-bold text-black text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{user.name}</p>
                <p className="text-gray-400 text-xs truncate max-w-[120px]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="w-full flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bold text-black text-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                {activeTab === 'products' && t.admin.myProducts}
                {activeTab === 'reports' && (locale === 'vi' ? 'Báo cáo' : 'Reports')}
                {activeTab === 'purchases' && (locale === 'vi' ? 'Sản phẩm đã mua' : 'My Purchases')}
                {activeTab === 'profile' && (locale === 'vi' ? 'Thông tin cá nhân' : 'Profile Info')}
              </h1>
              {activeTab === 'products' && (
                <p className="text-gray-500 mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {products.length} {t.admin.published}
                </p>
              )}
            </div>
            {activeTab === 'products' && (
              <button
                onClick={() => { resetForm(); setShowForm(true); }}
                className="flex items-center gap-2 bg-[#FF90E8] text-black font-bold px-6 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <Plus size={18} />
                {t.admin.addProduct}
              </button>
            )}
          </div>

          {activeTab === 'reports' && (
            <>
          {/* Revenue Report */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-black text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'vi' ? 'Báo cáo doanh thu' : 'Revenue Report'}
              </h2>
              <select
                value={reportYear}
                onChange={(e) => setReportYear(Number(e.target.value))}
                className="border-2 border-black rounded-lg px-3 py-2 font-bold text-black focus:outline-none focus:border-[#FF90E8]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {[...Array(5)].map((_, i) => {
                  const y = new Date().getFullYear() - i;
                  return <option key={y} value={y}>{y}</option>;
                })}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_#000]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-black flex items-center justify-center">
                    <DollarSign size={16} className="text-black" />
                  </div>
                  <span className="font-bold text-gray-500 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Tổng doanh thu' : 'Total Revenue'}
                  </span>
                </div>
                <p className="font-bold text-black text-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  ${revenueData.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_#000]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-black flex items-center justify-center">
                    <Package size={16} className="text-black" />
                  </div>
                  <span className="font-bold text-gray-500 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Tổng lượt bán' : 'Total Sales'}
                  </span>
                </div>
                <p className="font-bold text-black text-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {revenueData.totalSales.toLocaleString()}
                </p>
              </div>
              <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_#000]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF90E8] border-2 border-black flex items-center justify-center">
                    <TrendingUp size={16} className="text-black" />
                  </div>
                  <span className="font-bold text-gray-500 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Tháng này' : 'This Month'}
                  </span>
                </div>
                <p className="font-bold text-black text-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  ${(revenueData.chartData?.[new Date().getMonth()]?.revenue || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[6px_6px_0_0_#000]">
              <h3 className="font-bold text-black mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'vi' ? 'Doanh thu theo tháng' : 'Monthly Revenue'}
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData.chartData?.length > 0 ? revenueData.chartData : [
                    { name: 'Jan', revenue: 0 }, { name: 'Feb', revenue: 0 }, { name: 'Mar', revenue: 0 },
                    { name: 'Apr', revenue: 0 }, { name: 'May', revenue: 0 }, { name: 'Jun', revenue: 0 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fill: '#6B7280' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fill: '#6B7280' }}
                      tickFormatter={(value) => `$${value}`}
                      dx={-10}
                    />
                    <Tooltip 
                      cursor={{ fill: '#F3F4F6' }}
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: '2px solid black',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 'bold',
                        boxShadow: '4px 4px 0 0 #000'
                      }}
                      formatter={(value: any) => [`$${value}`, locale === 'vi' ? 'Doanh thu' : 'Revenue']}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="#FF90E8" 
                      radius={[4, 4, 0, 0]} 
                      stroke="#000000"
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
            </>
          )}

          {activeTab === 'products' && (
            <>
              {/* Products grid */}
              {products.length === 0 ? (
                <div className="border-2 border-black border-dashed rounded-3xl p-16 text-center">
                  <Package size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="font-bold text-gray-400 text-xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.noProducts}</p>
                  <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.createFirst}</p>
                  <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-[#FF90E8] text-black font-bold px-8 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {t.admin.createBtn}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[4px_4px_0_0_#000] transition-shadow">
                      <div className="relative h-40 bg-gray-100">
                        {p.thumbnail ? (
                          <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={36} className="text-gray-300" />
                          </div>
                        )}
                        <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {p.status}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-black text-base mb-1 line-clamp-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{p.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-black text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>${p.price}</span>
                          <span className="text-gray-400 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{p.salesCount} {t.admin.sales}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/product/${p.slug}`} target="_blank"
                            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            <Eye size={12} /> {t.admin.view}
                          </Link>
                          <button onClick={() => openEdit(p)}
                            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 border-2 border-black rounded-lg hover:bg-[#FF90E8] transition-colors"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            <Edit size={12} /> {t.admin.edit}
                          </button>
                          <button onClick={() => handleDelete(p.id)}
                            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 border-2 border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors ml-auto"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'purchases' && (
            <div className="grid grid-cols-3 gap-5">
              {purchases.length === 0 ? (
                <div className="col-span-3 border-2 border-black border-dashed rounded-3xl p-16 text-center">
                  <Package size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="font-bold text-gray-400 text-xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Bạn chưa mua sản phẩm nào' : 'No purchases yet'}
                  </p>
                  <Link href="/" className="bg-[#FF90E8] text-black font-bold px-8 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors inline-block mt-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Khám phá ngay' : 'Discover now'}
                  </Link>
                </div>
              ) : (
                purchases.map((p) => (
                  <div key={p.id} className="bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[4px_4px_0_0_#000] transition-shadow">
                    <div className="relative h-40 bg-gray-100">
                      {p.thumbnail ? (
                        <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={36} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-black text-base mb-3 line-clamp-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{p.title}</h3>
                      {p.fileUrl && (
                        <a href={p.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-black text-white font-bold py-2 rounded-xl border-2 border-black hover:bg-[#FF90E8] hover:text-black transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          <Upload size={14} className="rotate-180" />
                          {locale === 'vi' ? 'Tải xuống' : 'Download'}
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl bg-white border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0_0_#000]">
              <h2 className="font-bold text-black text-2xl mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'vi' ? 'Cập nhật thông tin' : 'Update Profile'}
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Tên hiển thị' : 'Display Name'}
                  </label>
                  <input
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Ảnh đại diện' : 'Avatar'}
                  </label>
                  <div
                    onClick={() => avatarInputRef.current?.click()}
                    className="relative w-32 h-32 border-2 border-dashed border-black rounded-full overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center bg-gray-100"
                  >
                    {profileForm.avatar ? (
                      <>
                        <img src={profileForm.avatar} alt="avatar" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white font-bold text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Click to change</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        {uploadingAvatar ? (
                          <div className="w-6 h-6 border-4 border-[#FF90E8] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Upload size={24} className="text-gray-400" />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { if (e.target.files?.[0]) handleAvatarUpload(e.target.files[0]); }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF90E8] text-black font-bold px-8 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {locale === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 bg-black/50 overflow-y-auto">
          <div className="bg-white border-2 border-black rounded-3xl w-full max-w-2xl shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center justify-between p-6 border-b-2 border-black">
              <h2 className="font-bold text-black text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {editProduct ? t.admin.editTitle : t.admin.createTitle}
              </h2>
              <button
                onClick={() => { setShowForm(false); resetForm(); }}
                className="w-9 h-9 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-50"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Thumbnail upload */}
              <div>
                <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {t.admin.image}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative border-2 border-dashed border-black rounded-2xl overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ height: 160 }}
                >
                  {form.thumbnail ? (
                    <>
                      <img src={form.thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Click to change</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      {uploading ? (
                        <div className="w-8 h-8 border-4 border-[#FF90E8] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Upload size={32} className="text-gray-400" />
                          <p className="text-gray-400 text-sm font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {t.admin.clickToUpload}
                          </p>
                          <p className="text-gray-300 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0]); }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.title}</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm((f) => ({
                      ...f, title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                    }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    placeholder="Complete UI Kit 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.price}</label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    placeholder="49"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8] bg-white"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.originalPrice}</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.originalPrice}
                    onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    placeholder="99"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Link tải file (File URL) *' : 'File URL *'}
                  </label>
                  <input
                    required
                    type="url"
                    value={form.fileUrl}
                    onChange={(e) => setForm((f) => ({ ...f, fileUrl: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {locale === 'vi' ? 'Người mua sẽ nhận được link này sau khi thanh toán thành công.' : 'Buyers will receive this link after successful payment.'}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.category}</label>
                  <select
                    required
                    value={form.categoryId}
                    onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8] bg-white"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <option value="">{t.admin.selectCategory}</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.shortDesc}</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8] resize-none"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    placeholder="A brief overview of your product..."
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.longDesc}</label>
                  <textarea
                    rows={4}
                    value={form.longDescription}
                    onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8] resize-none"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    placeholder="Detailed description of what's included, who it's for, etc..."
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.admin.tags}</label>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF90E8]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    placeholder="Figma, UI, Design System"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="flex-1 border-2 border-black text-black font-bold py-3 rounded-full hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#FF90E8] text-black font-bold py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {saving ? t.admin.saving : editProduct ? t.admin.updateBtn : t.admin.publishBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
