import { PropertyInfoDto } from '@/types/property.types';
import { formatPrice } from '@/utils/format';

interface PropertyDetailInfoProps {
  readonly property: PropertyInfoDto;
}

export default function PropertyDetailInfo({ property }: Readonly<PropertyDetailInfoProps>) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {property.name}
          </h1>
          <p className="text-gray-300 flex items-center gap-2">
            <span>.</span>
            <span className="text-lg">{property.address}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">Price</p>
          <p className="text-3xl md:text-4xl font-bold text-[#c9a961]">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-700">
        <div className="bg-[#0a0a0a] rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Internal Code</p>
          <p className="text-lg font-semibold text-white">
            {property.codeInternal}
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Year Built</p>
          <p className="text-lg font-semibold text-white">
            {property.year}
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Property ID</p>
          <p className="text-sm font-mono text-gray-300 truncate">
            {property.idProperty}
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-[#c9a961]/10 rounded-lg border border-[#c9a961]/20">
        <p className="text-sm text-gray-300">
          This property is{' '}
          <span className="font-bold text-[#c9a961]">
            {new Date().getFullYear() - property.year} years old
          </span>
        </p>
      </div>
    </div>
  );
}
