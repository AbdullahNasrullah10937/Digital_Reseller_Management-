'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingBag, 
  PlusCircle, 
  Tag, 
  TrendingUp, 
  Info, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export default function ProductsPricingPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 'p1', name: 'Retail Management Software', category: 'POS/Retail', usd: 1200, pkr: 330000, confirmed: false },
    { id: 'p2', name: 'Jewellery Store Management Software', category: 'POS/Retail', usd: 1500, pkr: 415000, confirmed: false },
    { id: 'p3', name: 'Book Shop Billing Management Software', category: 'POS/Retail', usd: 600, pkr: 165000, confirmed: false },
    { id: 'p4', name: 'Beauty and Cosmetics Shop Software', category: 'POS/Retail', usd: 1000, pkr: 275000, confirmed: false },
    { id: 'p5', name: 'Luggage & Bags Business Software', category: 'POS/Retail', usd: 1000, pkr: 275000, confirmed: false },
    { id: 'p6', name: 'Computer & Laptop Business Software', category: 'POS/Retail', usd: 1000, pkr: 275000, confirmed: false },
    { id: 'p7', name: 'Electronics Store Management Software', category: 'POS/Retail', usd: 1200, pkr: 330000, confirmed: false },
    
    { id: 'p8', name: 'Petrol Pump Software', category: 'Industry ERP', usd: 35000, pkr: 9650000, confirmed: false },
    { id: 'p9', name: 'LPG Business Software', category: 'Industry ERP', usd: 35000, pkr: 9650000, confirmed: false },
    { id: 'p10', name: 'Gas Station Software', category: 'Industry ERP', usd: 35000, pkr: 9650000, confirmed: false },
    { id: 'p11', name: 'Fuel Management Software', category: 'Industry ERP', usd: 30000, pkr: 8280000, confirmed: false },
    { id: 'p12', name: 'Garments Manufacturing Software', category: 'Industry ERP', usd: 30000, pkr: 8280000, confirmed: false },
    { id: 'p13', name: 'Sweets & Bakery Manufacturing Software', category: 'Industry ERP', usd: 20000, pkr: 5520000, confirmed: false },
    { id: 'p14', name: 'Apparel Manufacturing Software', category: 'Industry ERP', usd: 30000, pkr: 8280000, confirmed: false },
    { id: 'p15', name: 'Furniture Manufacturing Software', category: 'Industry ERP', usd: 25000, pkr: 6900000, confirmed: false },
    { id: 'p16', name: 'Paper and Pulp Manufacturing Software', category: 'Industry ERP', usd: 30000, pkr: 8280000, confirmed: false },
    { id: 'p17', name: 'Plastic and Rubber Manufacturing Software', category: 'Industry ERP', usd: 30000, pkr: 8280000, confirmed: false },
    { id: 'p18', name: 'Textile Industry ERP', category: 'Industry ERP', usd: 35000, pkr: 9650000, confirmed: false },
    { id: 'p19', name: 'Printing & Dyeing Industry Software', category: 'Industry ERP', usd: 25000, pkr: 6900000, confirmed: false },
    { id: 'p20', name: 'Fashion Boutique Management Software', category: 'Industry ERP', usd: 12000, pkr: 3310000, confirmed: false },
    { id: 'p21', name: 'Logistics & Transportation Software', category: 'Industry ERP', usd: 30000, pkr: 8280000, confirmed: false },
    { id: 'p22', name: 'Auto Accessories Business Software', category: 'Industry ERP', usd: 15000, pkr: 4140000, confirmed: false },
    { id: 'p23', name: 'Poultry Layer Farm Management Software', category: 'Industry ERP', usd: 20000, pkr: 5520000, confirmed: false },
    { id: 'p24', name: 'Poultry Chicken Farm Processing Software', category: 'Industry ERP', usd: 25000, pkr: 6900000, confirmed: false },
    { id: 'p25', name: 'Cloud ERP for Agriculture Business', category: 'Industry ERP', usd: 20000, pkr: 5520000, confirmed: false },

    { id: 'p26', name: 'Hotel Management Software', category: 'Hospitality ERP', usd: 15000, pkr: 4140000, confirmed: false },
    { id: 'p27', name: 'Cafe Management Software', category: 'Hospitality ERP', usd: 5000, pkr: 1380000, confirmed: false },
    { id: 'p28', name: 'Banquet Hall Management Software', category: 'Hospitality ERP', usd: 8000, pkr: 2200000, confirmed: false },

    { id: 'p29', name: 'Cloud ERP for Services Business', category: 'SME ERP', usd: 20000, pkr: 5520000, confirmed: false },
    { id: 'p30', name: 'Small & Medium Businesses Software', category: 'SME ERP', usd: 15000, pkr: 4140000, confirmed: false },
  ];

  const categories = [
    { id: 'ALL', label: 'All 30 Products' },
    { id: 'POS/Retail', label: 'POS & Retail' },
    { id: 'Industry ERP', label: 'Industry ERP' },
    { id: 'Hospitality ERP', label: 'Hospitality ERP' },
    { id: 'SME ERP', label: 'SME ERP' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
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
            Full 30-product portfolio from digitalsofts.com with Reseller 30% commission previews.
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

      {/* Pricing Disclaimer Alert */}
      <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl text-xs text-on-surface-variant flex items-start gap-3">
        <Info className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
        <div>
          <strong className="text-primary font-bold">Draft Pricing Reference Notice:</strong> Prices below represent draft market estimates. Official confirmed prices will be provided by Digitalsofts sales leadership and updated dynamically in the portal before live deployment.
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant pb-3">
        {categories.map((cat) => (
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

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => {
          const commUsd = p.usd * 0.3; // 30% reseller margin
          return (
            <div key={p.id} className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-4 shadow-xs hover:border-secondary-container hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-container bg-secondary-container/10 px-2.5 py-0.5 rounded-full">
                    {p.category}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Draft Reference Price
                  </span>
                </div>
                <h3 className="text-base font-bold text-primary leading-snug">{p.name}</h3>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Retail Price (USD):</span>
                  <span className="font-bold text-primary">${p.usd.toLocaleString()} / yr</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Retail Price (PKR):</span>
                  <span className="font-bold text-primary">Rs. {p.pkr.toLocaleString()} / yr</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-outline-variant/60 font-bold">
                  <span className="text-emerald-700">Reseller Margin (30%):</span>
                  <span className="text-secondary-container text-sm">${commUsd.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/deals/new?product=${p.id}`}
                className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary-container transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" /> Register Deal with Product
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
