import Image from 'next/image';
import { OwnerDto } from '@/types/property.types';
import { formatDate } from '@/utils/format';

interface OwnerInfoProps {
  readonly owner: OwnerDto;
}

export default function OwnerInfo({ owner }: Readonly<OwnerInfoProps>) {
  const age = owner.birthday
    ? new Date().getFullYear() - new Date(owner.birthday).getFullYear()
    : null;

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Property Owner
      </h2>

      <div className="flex items-start gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#c9a961]/30 flex-shrink-0">
          {owner.photo ? (
            <Image
              src={owner.photo}
              alt={owner.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            {owner.name}
          </h3>

          <div className="space-y-2 text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-[#c9a961] font-semibold">Address:</span>
              <span>{owner.address}</span>
            </div>

            {owner.birthday && (
              <div className="flex items-center gap-2">
                <span className="text-[#c9a961] font-semibold">Birthday:</span>
                <span>
                  {formatDate(owner.birthday)}
                  {age && ` (${age} years old)`}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-[#c9a961] font-semibold">ID:</span>
              <span className="text-sm font-mono text-gray-400">
                {owner.idOwner}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
