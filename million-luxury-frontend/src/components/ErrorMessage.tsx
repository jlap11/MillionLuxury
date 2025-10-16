interface ErrorMessageProps {
  readonly title?: string;
  readonly message: string;
  readonly onRetry?: () => void;
}

export default function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
}: Readonly<ErrorMessageProps>) {
  return (
    <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-6 py-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600/80 text-white rounded-md hover:bg-red-600 hover:cursor-pointer transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
