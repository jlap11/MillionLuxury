'use client';

import { useState } from 'react';
import { PropertyFilterDto } from '@/types/property.types';

interface FilterBarProps {
  readonly onFilterChange: (filters: PropertyFilterDto) => void;
  readonly loading?: boolean;
}

export default function FilterBar({ onFilterChange, loading = false }: Readonly<FilterBarProps>) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    const filtersData: PropertyFilterDto = {
      name: name || undefined,
      address: address || undefined,
      minPrice: minPrice ? Number.parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? Number.parseFloat(maxPrice) : undefined,
      page: 1,
      pageSize: 10
    };

    onFilterChange(filtersData);
  };

  const handleReset = () => {
    setName('');
    setAddress('');
    setMinPrice('');
    setMaxPrice('');
    
    const resetFilters: PropertyFilterDto = {
      page: 1,
      pageSize: 10
    };
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-8 mb-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#c9a961]" />
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          Find Your Perfect Property
        </h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Property Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Villa, Penthouse..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c9a961] focus:border-[#c9a961] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading} />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="New York, Miami..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c9a961] focus:border-[#c9a961] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading} />
          </div>
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-300 mb-2">Min Price</label>
            <input type="number" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="100,000" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c9a961] focus:border-[#c9a961] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading} />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-300 mb-2">Max Price</label>
            <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="5,000,000" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c9a961] focus:border-[#c9a961] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading} />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button 
            type="button" 
            onClick={handleSearch} 
            disabled={loading} 
            className="px-8 py-3 bg-[#c9a961] text-black font-medium rounded-md hover:bg-[#b8965a] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Searching...' : 'Search Properties'}
          </button>
          <button 
            type="button" 
            onClick={handleReset} 
            disabled={loading} 
            className="px-6 py-3 bg-[#0a0a0a] border border-gray-600 text-gray-300 font-medium rounded-md hover:bg-gray-800 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
