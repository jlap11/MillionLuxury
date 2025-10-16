interface LoadingSpinnerProps {
  readonly message?: string;
  readonly size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({
  message = 'Loading...',
  size = 'md',
}: Readonly<LoadingSpinnerProps>) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`inline-block animate-spin rounded-full border-b-2 border-[#c9a961] ${sizeClasses[size]}`}
      ></div>
      {message && <p className="mt-4 text-gray-300">{message}</p>}
    </div>
  );
}
