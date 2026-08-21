export type CatalogProduct = {
  category: string;
  name: string;
  url: string;
  priceUsd: number;
};

export const CATALOG_CATEGORIES = [
  'Retail Industry',
  'Oil & Gas Industry',
  'Manufacturing Industry',
  'Textile Industry',
  'Hospitality Business',
  'ERP for Small & Medium Businesses',
  'Logistics & Transportation Business',
  'Real Estate Business',
  'Poultry Business',
  'Agriculture Business',
  'Visa Consultancy',
  'Electronics',
] as const;

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  { category: 'Retail Industry', name: 'Retail Management Software', url: 'https://digitalsofts.com/products/retail-management-software', priceUsd: 1200 },
  { category: 'Retail Industry', name: 'Luggage & Bags Business Software', url: 'https://digitalmanager.pk/bags-business-management-software/', priceUsd: 1000 },
  { category: 'Retail Industry', name: 'Book Shop Billing Management Software', url: 'https://digitalsofts.com/book-shop-billing-management-software/', priceUsd: 600 },
  { category: 'Retail Industry', name: 'Beauty and Cosmetics Shop Software', url: 'https://digitalsofts.com/beauty-and-cosmetics-shop-software/', priceUsd: 1000 },
  { category: 'Retail Industry', name: 'Jewellery Store Management Software', url: 'https://digitalsofts.com/jewellery-store-management-software', priceUsd: 1500 },

  { category: 'Oil & Gas Industry', name: 'Petrol Pump Software', url: 'https://digitalsofts.com/products/petrol-pump-software/', priceUsd: 35000 },
  { category: 'Oil & Gas Industry', name: 'LPG Business Software', url: 'https://digitalmanager.pk/lpg-business-management-software/', priceUsd: 35000 },
  { category: 'Oil & Gas Industry', name: 'Gas Station Software', url: 'https://digitalsofts.com/products/gas-station-software/', priceUsd: 35000 },
  { category: 'Oil & Gas Industry', name: 'Fuel Management Software', url: 'https://digitalsofts.com/fleet-fuel-management-software-system/', priceUsd: 30000 },

  { category: 'Manufacturing Industry', name: 'Garments Manufacturing Software', url: 'https://digitalmanager.pk/cloud-erp-software-for-garments-manufacturing/', priceUsd: 30000 },
  { category: 'Manufacturing Industry', name: 'Sweets & Bakery Manufacturing Software', url: 'https://digitalsofts.com/products/sweets-and-bakery-manufacturing-software/', priceUsd: 20000 },
  { category: 'Manufacturing Industry', name: 'Apparel Manufacturing Software', url: 'https://digitalsofts.com/products/software-for-apparel-manufacturing/', priceUsd: 30000 },
  { category: 'Manufacturing Industry', name: 'Furniture Manufacturing Software', url: 'https://digitalsofts.com/modular-furniture-manufacturing-erp-software/', priceUsd: 25000 },
  { category: 'Manufacturing Industry', name: 'Paper and Pulp Manufacturing Software', url: 'https://digitalsofts.com/products/paper-and-pulp-manufacturing-software', priceUsd: 30000 },
  { category: 'Manufacturing Industry', name: 'Plastic and Rubber Manufacturing Software', url: 'https://digitalsofts.com/products/plastic-and-rubber-manufacturing-software', priceUsd: 30000 },

  { category: 'Textile Industry', name: 'Cloud ERP Software for Textile Industries', url: 'https://digitalsofts.com/products/textile-industry-management-software', priceUsd: 35000 },
  { category: 'Textile Industry', name: 'Printing & Dyeing Industry Software', url: 'https://digitalsofts.com/products/digital-textile-printing-software', priceUsd: 25000 },
  { category: 'Textile Industry', name: 'Fashion Boutique Management Software', url: 'https://digitalsofts.com/fashion-boutique-management-software/', priceUsd: 12000 },

  { category: 'Hospitality Business', name: 'Hotel Management Software', url: 'https://digitalsofts.com/products/hotel-management-software', priceUsd: 15000 },
  { category: 'Hospitality Business', name: 'Cafe Management Software', url: 'https://digitalsofts.com/cafe-management-software/', priceUsd: 5000 },
  { category: 'Hospitality Business', name: 'Banquet Hall Management Software', url: 'https://digitalsofts.com/banquet-hall-management-software/', priceUsd: 8000 },

  { category: 'ERP for Small & Medium Businesses', name: 'Cloud ERP Software For Services Business', url: 'https://digitalmanager.pk/services-management-software/', priceUsd: 20000 },
  { category: 'ERP for Small & Medium Businesses', name: 'Small & Medium Businesses Software', url: 'https://digitalmanager.pk/cloud-erp-software-for-small-medium-businesses/', priceUsd: 15000 },

  { category: 'Logistics & Transportation Business', name: 'Logistics & Transportation Software', url: 'https://digitalmanager.pk/cloud-erp-software-for-logistics-transportation/', priceUsd: 30000 },
  { category: 'Logistics & Transportation Business', name: 'Auto Accessories Business Software', url: 'https://digitalsofts.com/auto-accessories-business-software/', priceUsd: 15000 },

  { category: 'Real Estate Business', name: 'Property Management Software', url: 'https://digitalsofts.com/housing-society-software-for-property-management/', priceUsd: 10000 },

  { category: 'Poultry Business', name: 'Poultry Layer Farm Management Software', url: 'https://digitalsofts.com/products/poultry-layer-farm-management-software', priceUsd: 20000 },
  { category: 'Poultry Business', name: 'Poultry Chicken Farm Processing Software', url: 'https://digitalsofts.com/poultry-chicken-farm-processing-software/', priceUsd: 25000 },

  { category: 'Agriculture Business', name: 'Cloud ERP Software For Agriculture Business', url: 'https://digitalsofts.com/software-for-agriculture-management/', priceUsd: 20000 },

  { category: 'Visa Consultancy', name: 'Software For Visa & Immigration Consultants', url: 'https://digitalmanager.pk/cloud-erp-software-for-visa-immigration/', priceUsd: 8000 },

  { category: 'Electronics', name: 'Computer & Laptop Business Software', url: 'https://digitalmanager.pk/computer-laptop-business-management-software/', priceUsd: 1000 },
  { category: 'Electronics', name: 'Electronics Store Management Software', url: 'https://digitalsofts.com/electronics-store-management-software/', priceUsd: 1200 },
];
