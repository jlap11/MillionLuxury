'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PropertyImageDto } from '@/types/property.types';

interface ImageGalleryProps {
  readonly images: PropertyImageDto[];
  readonly propertyName: string;
}

export default function ImageGallery({ images, propertyName }: Readonly<ImageGalleryProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const enabledImages = images.filter((img) => img.enabled);

  if (!enabledImages || enabledImages.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
        <p className="text-gray-400">No images availible</p>
      </div>
    );
  }

  const currentImage = enabledImages[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? enabledImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === enabledImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative h-96 md:h-[500px] bg-gray-900 rounded-lg overflow-hidden">
        <Image
          src={currentImage.file}
          alt={`${propertyName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
        />

        {enabledImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 hover:cursor-pointer text-white p-3 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
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
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 hover:cursor-pointer text-white p-3 rounded-full transition-colors"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {enabledImages.length}
            </div>
          </>
        )}
      </div>

      {enabledImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {enabledImages.map((image, index) => (
            <button
              key={image.idPropertyImage}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 rounded-md overflow-hidden border-2 transition-all hover:cursor-pointer ${
                index === currentIndex
                  ? 'border-[#c9a961] scale-105'
                  : 'border-transparent hover:border-gray-600'
              }`}
            >
              <Image
                src={image.file}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
