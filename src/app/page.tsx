"use client";
import { Pagination } from "../components";
import {
  Header,
  PageSizeControls,
  SearchStatus,
  ResultsSummary,
  AdvocatesTable,
  ErrorDisplay,
} from "./components";
import {
  AdvocatesProvider,
  useAdvocatesContext,
} from "./contexts/AdvocatesContext";

function HomeContent() {
  const { error, pagination } = useAdvocatesContext();

  if (error) {
    return <ErrorDisplay />;
  }
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div
        suppressHydrationWarning={true}
        className="flex-1 flex flex-col p-6 overflow-hidden"
      >
        <div className="flex flex-row justify-between items-end mb-2">
          <PageSizeControls />
          <SearchStatus />
          <ResultsSummary />
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0 overflow-hidden">
            <AdvocatesTable />
          </div>
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-4 flex justify-center items-start">
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <AdvocatesProvider>
      <HomeContent />
    </AdvocatesProvider>
  );
}
