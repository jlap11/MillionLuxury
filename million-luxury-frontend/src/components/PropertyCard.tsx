import Image from 'next/image';
import Link from 'next/link';
import { PropertyListDto } from '@/types/property.types';
import { formatPrice } from '@/utils/format';

interface PropertyCardProps {
  readonly property: PropertyListDto;
}

export default function PropertyCard({ property }: Readonly<PropertyCardProps>) {
  const imageUrl = property.image || '/placeholder-property.jpg';

  return (
    <Link href={`/properties/${property.idProperty}`} className="group">
      <div className="bg-[#1a1a1a] rounded-lg border border-[#c9a961]/20 overflow-hidden hover:border-[#c9a961] transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-[#c9a961]/10">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-3xl font-display font-bold text-[#c9a961] drop-shadow-lg">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-display font-semibold text-gray-100 mb-3 truncate group-hover:text-[#c9a961] transition-colors">
            {property.name}
          </h3>
          
          <p className="text-gray-400 text-sm mb-3 truncate font-sans">
            {property.address}
          </p>
          
          <div className="pt-3 border-t border-[#c9a961]/20">
            <p className="text-xs text-gray-500 font-sans tracking-wider uppercase">
              Listed by: <span className="text-gray-300">{property.ownerName}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
