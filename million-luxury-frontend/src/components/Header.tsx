import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/assets/million_logo.jpg"
                alt="Million Luxury"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider">
                MILLION
              </h1>
              <p className="text-xs text-[#c9a961] tracking-widest">
                LUXURY PROPERTIES
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm font-sans tracking-wider text-gray-300 hover:text-[#c9a961] transition-colors uppercase"
            >
              Properties
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
