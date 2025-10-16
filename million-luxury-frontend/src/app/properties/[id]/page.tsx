'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePropertyDetail } from '@/hooks/usePropertyDetail';
import ImageGallery from '@/components/ImageGallery';
import PropertyDetailInfo from '@/components/PropertyDetailInfo';
import OwnerInfo from '@/components/OwnerInfo';
import PropertyTraces from '@/components/PropertyTraces';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { property, loading, error } = usePropertyDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#c9a961]/20 rounded w-1/4"></div>
            <div className="h-96 bg-[#1a1a1a] rounded-lg border border-[#c9a961]/20"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-48 bg-[#1a1a1a] rounded-lg border border-[#c9a961]/20"></div>
                <div className="h-64 bg-[#1a1a1a] rounded-lg border border-[#c9a961]/20"></div>
              </div>
              <div className="h-64 bg-[#1a1a1a] rounded-lg border border-[#c9a961]/20"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-[#1a1a1a] border border-[#c9a961]/30 text-[#c9a961] px-6 py-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-[#c9a961]">Error</h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-4 py-2 bg-[#c9a961] text-black rounded-md hover:bg-[#b8975a] hover:cursor-pointer transition-colors"
            >
              ← Back to Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-[#c9a961] mb-4">
              Property Not Found
            </h2>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#1a1a1a] border-b border-[#c9a961]/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#c9a961] hover:text-[#b8975a] font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Properties
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <ImageGallery
            images={property.images}
            propertyName={property.property.name}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PropertyDetailInfo property={property.property} />

              <PropertyTraces traces={property.traces} />
            </div>

            <div className="space-y-6">
              <OwnerInfo owner={property.owner} />

              <div className="bg-gradient-to-br from-[#c9a961] to-[#b8965a] text-black rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">Intrested?</h3>
                <p className="text-black/70 mb-4 text-sm">
                  Contact us to schedul a visit or get more information about
                  this property.
                </p>
                <button className="w-full bg-[#1a1a1a] text-[#c9a961] font-semibold py-2 px-4 rounded-md hover:bg-[#0a0a0a] hover:cursor-pointer transition-colors">
                  Contact Agent
                </button>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Share Property
                </h3>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#0a0a0a] text-[#c9a961] py-2 px-3 rounded-md hover:bg-gray-800 hover:cursor-pointer transition-colors text-sm font-medium border border-gray-700">
                    Facebook
                  </button>
                  <button className="flex-1 bg-[#0a0a0a] text-[#c9a961] py-2 px-3 rounded-md hover:bg-gray-800 hover:cursor-pointer transition-colors text-sm font-medium border border-gray-700">
                    Twitter
                  </button>
                  <button className="flex-1 bg-[#0a0a0a] text-[#c9a961] py-2 px-3 rounded-md hover:bg-gray-800 hover:cursor-pointer transition-colors text-sm font-medium border border-gray-700">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Million Luxury. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
