'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Info, PlusCircle } from 'lucide-react';
import { supabaseFrom, getSession } from '@/lib/supabase/client';

type Product = {
  id: string;
  name: string;
  category: string;
  retail_price_usd: number;
  retail_price_pkr: number;
  is_confirmed: boolean;
  price_status: string;
};

const CATEGORIES = [
  { id: 'ALL', label: 'All 30 Products' },
  { id: 'POS/Retail', label: 'POS & Retail' },
  { id: 'Industry ERP', label: 'Industry ERP' },
  { id: 'Hospitality ERP', label: 'Hospitality ERP' },
  { id: 'SME ERP', label: 'SME ERP' },
  { id: 'Real Estate ERP', label: 'Real Estate ERP' },
];

export default function ProductsPricingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Partner's commission rate from session
  const [commissionRate, setCommissionRate] = useState(30); // default 30%

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch products from Supabase REST API
        const productData = await supabaseFrom<Product>(
          'products',
          'select=id,name,category,retail_price_usd,retail_price_pkr,is_confirmed,price_status&is_active=eq.true&order=category,name'
        );
        setProducts(productData ?? []);

        // Get current user's commission rate from cached session
        const session = getSession();
        if (session?.user) {
          const partners = await supabaseFrom<{ commission_rate: number }>(
            'partners',
            `select=commission_rate&user_id=eq.${session.user.id}&limit=1`
          );
          if (partners.length > 0) setCommissionRate(Number(partners[0].commission_rate));
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Products & Pricing Catalog</h1>
          <p className="text-xs text-on-surface-variant">
            Full 30-product portfolio from digitalsofts.com · Your commission rate: <strong className="text-secondary-container">{commissionRate}%</strong>
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-outline absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search software catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-9 pr-3 py-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container"
          />
        </div>
      </div>

      {/* Pricing Disclaimer */}
      <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl text-xs text-on-surface-variant flex items-start gap-3">
        <Info className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
        <div>
          <strong className="text-primary font-bold">Draft Pricing Reference Notice:</strong> Prices marked as &quot;Draft&quot; represent market estimates. Official confirmed prices will be updated before live deployment.
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant pb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface border border-outline-variant text-on-surface-variant hover:text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface border border-outline-variant rounded-2xl p-5 h-52 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
          {error}
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const commissionUsd = (p.retail_price_usd * commissionRate) / 100;
            const isDraft = !p.is_confirmed || p.price_status !== 'CONFIRMED_LAUNCH';
            return (
              <div
                key={p.id}
                className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-4 shadow-xs hover:border-secondary-container hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-container bg-secondary-container/10 px-2.5 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    {isDraft && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Draft Reference Price
                      </span>
                    )}
                    {!isDraft && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Confirmed Price
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-primary leading-snug">{p.name}</h3>
                </div>

                {/* Pricing */}
                <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Retail Price (USD):</span>
                    <span className="font-bold text-primary">${Number(p.retail_price_usd).toLocaleString()} / yr</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Retail Price (PKR):</span>
                    <span className="font-bold text-primary">Rs. {Number(p.retail_price_pkr).toLocaleString()} / yr</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-outline-variant/60 font-bold">
                    <span className="text-emerald-700">Your Margin ({commissionRate}%):</span>
                    <span className="text-secondary-container text-sm">${commissionUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</span>
                  </div>
                </div>

                {/* Register Deal CTA */}
                <Link
                  href={`/deals/new?product_id=${p.id}&product_name=${encodeURIComponent(p.name)}`}
                  className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary-container transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" /> Register Deal with Product
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12 text-on-surface-variant text-sm">
          No products found matching &quot;{searchQuery}&quot;.
        </div>
      )}
    </div>
  );
}
