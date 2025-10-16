import { PropertyTraceDto } from '@/types/property.types';
import { formatPrice, formatDate } from '@/utils/format';

interface PropertyTracesProps {
  readonly traces: PropertyTraceDto[];
}

export default function PropertyTraces({ traces }: Readonly<PropertyTracesProps>) {
  if (!traces || traces.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Transaction History
        </h2>
        <p className="text-gray-400">No transaction history availible</p>
      </div>
    );
  }

  const sortedTraces = [...traces].sort(
    (a, b) => new Date(b.dateSale).getTime() - new Date(a.dateSale).getTime()
  );

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Transaction History
      </h2>

      <div className="space-y-4">
        {sortedTraces.map((trace) => {
          const totalWithTax = trace.value + trace.tax;

          return (
            <div
              key={trace.idPropertyTrace}
              className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-[#0a0a0a]"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-white">{trace.name}</h3>
                  <p className="text-sm text-gray-400">
                    {formatDate(trace.dateSale)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#c9a961]">
                    {formatPrice(totalWithTax)}
                  </p>
                  <p className="text-xs text-gray-400">Total</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t border-gray-800">
                <div>
                  <p className="text-gray-400">Sale Value</p>
                  <p className="font-semibold text-white">
                    {formatPrice(trace.value)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Tax</p>
                  <p className="font-semibold text-white">
                    {formatPrice(trace.tax)}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  Transaction ID: {trace.idPropertyTrace}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-[#c9a961]/10 border border-[#c9a961]/20 rounded-lg p-3">
            <p className="text-sm text-gray-300">Total Transactions</p>
            <p className="text-2xl font-bold text-[#c9a961]">{traces.length}</p>
          </div>
          <div className="bg-[#c9a961]/10 border border-[#c9a961]/20 rounded-lg p-3">
            <p className="text-sm text-gray-300">Latest Value</p>
            <p className="text-2xl font-bold text-[#c9a961]">
              {formatPrice(sortedTraces[0].value + sortedTraces[0].tax)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
