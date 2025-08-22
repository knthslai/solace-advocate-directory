import Header from "./Header";

export default function ErrorDisplay() {
  return (
    <main className="p-6">
      <Header />
      <div className="text-error-700 p-5 bg-error-50 border border-error-200 rounded-lg mt-4">
        <div className="flex items-center gap-2">
          <span className="text-error-600">⚠️</span>
          <span className="font-semibold">Error loading advocates.</span>
        </div>
        <p className="mt-2 text-error-600">
          Please try again or contact support if the problem persists.
        </p>
      </div>
    </main>
  );
}
