'use client';

import { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import { PropertyFilterDto } from '@/types/property.types';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [filters, setFilters] = useState<PropertyFilterDto>({
    page: 1,
    pageSize: 10,
  });

  const {
    properties,
    totalCount,
    totalPages,
    currentPage,
    loading,
    error,
    fetchProperties,
  } = useProperties();

  const handleFilterChange = (newFilters: PropertyFilterDto) => {
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar onFilterChange={handleFilterChange} loading={loading} />

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded mb-6">
            Error: {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#c9a961] border-t-transparent"></div>
            <p className="mt-6 text-gray-400 font-sans tracking-wider uppercase text-sm">Loading exclusive properties...</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mb-8">
            <p className="text-gray-300 font-sans">
              Found <span className="font-bold text-[#c9a961]">{totalCount}</span> exclusive {totalCount === 1 ? 'property' : 'properties'}
            </p>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.idProperty} property={property} />
            ))}
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-20 bg-[#1a1a1a] rounded-lg border border-[#c9a961]/20">
            <p className="text-gray-300 text-lg font-display mb-2">
              No Properties Found
            </p>
            <p className="text-gray-500 font-sans text-sm">
              Try adjusting your search criterea
            </p>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </main>

      <footer className="bg-[#0a0a0a] mt-20 border-t border-[#c9a961]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 font-sans text-sm tracking-wider">
            © {new Date().getFullYear()} <span className="text-[#c9a961]">MILLION LUXURY</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
