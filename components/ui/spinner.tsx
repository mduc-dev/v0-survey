"use client";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>
      <span className="ml-4 text-lg font-semibold text-gray-700">
        Loading...
      </span>
    </div>
  );
};

export { LoadingSpinner };
