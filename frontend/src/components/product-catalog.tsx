'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ChevronDown,
  ShoppingBag,
  Fuel,
  Factory,
  Scissors,
  Hotel,
  Briefcase,
  Truck,
  Building2,
  Bird,
  Wheat,
  Stamp,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS, type CatalogProduct } from '@/data/catalog';

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

const CATEGORY_STYLE: Record<
  string,
  { icon: LucideIcon; badge: string }
> = {
  'Retail Industry': { icon: ShoppingBag, badge: 'bg-gradient-to-br from-secondary-container to-secondary' },
  'Oil & Gas Industry': { icon: Fuel, badge: 'bg-gradient-to-br from-primary to-primary-container' },
  'Manufacturing Industry': { icon: Factory, badge: 'bg-gradient-to-br from-primary-container to-tertiary-container' },
  'Textile Industry': { icon: Scissors, badge: 'bg-gradient-to-br from-brand-navy to-primary' },
  'Hospitality Business': { icon: Hotel, badge: 'bg-gradient-to-br from-secondary to-brand-orange' },
  'ERP for Small & Medium Businesses': { icon: Briefcase, badge: 'bg-gradient-to-br from-secondary-container to-primary' },
  'Logistics & Transportation Business': { icon: Truck, badge: 'bg-gradient-to-br from-tertiary to-primary-container' },
  'Real Estate Business': { icon: Building2, badge: 'bg-gradient-to-br from-brand-dark-navy to-brand-navy' },
  'Poultry Business': { icon: Bird, badge: 'bg-gradient-to-br from-primary-container to-secondary' },
  'Agriculture Business': { icon: Wheat, badge: 'bg-gradient-to-br from-secondary-container to-brand-navy' },
  'Visa Consultancy': { icon: Stamp, badge: 'bg-gradient-to-br from-primary to-secondary-container' },
  Electronics: { icon: Cpu, badge: 'bg-gradient-to-br from-brand-navy to-secondary' },
};

function priceRange(items: CatalogProduct[]) {
  const prices = items.map((p) => p.priceUsd);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatUsd(min);
  return `${formatUsd(min)} – ${formatUsd(max)}`;
}

export default function ProductCatalog() {
  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Set<string>>(() => new Set([CATALOG_CATEGORIES[0]]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory = category === 'ALL' || product.category === category;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const grouped = useMemo(() => {
    const groups: { category: string; items: CatalogProduct[] }[] = [];
    for (const cat of CATALOG_CATEGORIES) {
      const items = filtered.filter((p) => p.category === cat);
      if (items.length) groups.push({ category: cat, items });
    }
    return groups;
  }, [filtered]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      setOpen(new Set(grouped.map((g) => g.category)));
      return;
    }
    if (category !== 'ALL') {
      setOpen(new Set([category]));
      return;
    }
    const first = grouped[0]?.category ?? CATALOG_CATEGORIES[0];
    setOpen(new Set([first]));
  }, [query, category, grouped]);

  const toggle = (cat: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <section id="products" className="py-20 md:py-24 px-4 md:px-8 bg-surface-container-low relative">
      <div className="max-w-container-max mx-auto">
        <div className="mb-8">
          <span className="text-[11px] font-bold text-secondary-container uppercase tracking-[0.16em]">
            Launch catalog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-1 tracking-tight">
            32 B2B products you can sell
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant mt-2 max-w-xl">
            Draft market estimates for partner quoting. Confirmed retail and partner prices will be published at launch.
          </p>
        </div>

        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or industry"
            className="w-full h-12 pl-10 pr-4 rounded-2xl border border-outline-variant bg-white text-sm text-primary placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-container/40 focus:border-secondary-container"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setCategory('ALL')}
            className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors ${
              category === 'ALL'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-outline-variant hover:border-primary'
            }`}
          >
            All {CATALOG_PRODUCTS.length}
          </button>
          {CATALOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors ${
                category === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-primary border-outline-variant hover:border-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {grouped.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant bg-white px-6 py-16 text-center text-sm text-on-surface-variant shadow-sm">
            No products match that filter.
          </div>
        ) : (
          <div className="space-y-3">
            {grouped.map((group) => {
              const isOpen = open.has(group.category);
              const style = CATEGORY_STYLE[group.category];
              const Icon = style?.icon ?? Briefcase;
              const countLabel = `${group.items.length} product${group.items.length === 1 ? '' : 's'}`;

              return (
                <div
                  key={group.category}
                  className="rounded-2xl border border-outline-variant bg-white shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(group.category)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left hover:bg-surface-container-low/70 transition-colors"
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white shadow-sm ${style?.badge ?? 'bg-primary'}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm sm:text-base font-bold text-primary truncate">
                        {group.category}
                      </span>
                      <span className="block text-xs text-on-surface-variant mt-0.5">{countLabel}</span>
                    </span>
                    <span className="hidden sm:block text-sm font-semibold text-secondary shrink-0">
                      {priceRange(group.items)}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-outline shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`catalog-panel ${isOpen ? 'catalog-panel-open' : ''}`}>
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-outline-variant/70">
                      <p className="sm:hidden text-xs font-semibold text-secondary mb-3">
                        {priceRange(group.items)}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.items.map((product) => (
                          <article
                            key={product.name}
                            className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
                          >
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <h4 className="text-sm font-semibold text-primary leading-snug">
                                {product.name}
                              </h4>
                              <span className="shrink-0 inline-flex items-center rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant px-2 py-0.5 text-[10px] font-semibold">
                                Launching soon
                              </span>
                            </div>
                            <div className="text-lg font-bold text-secondary">{formatUsd(product.priceUsd)}</div>
                            <div className="text-[11px] text-on-surface-variant mt-0.5">draft estimate / yr</div>
                            <a
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-3 text-xs font-semibold text-primary hover:text-secondary-container"
                            >
                              View details →
                            </a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-6 text-xs text-on-surface-variant">
          Showing {filtered.length} of {CATALOG_PRODUCTS.length} products. Prices are draft market estimates in USD per year and are not yet confirmed for launch.
        </p>
      </div>
    </section>
  );
}
