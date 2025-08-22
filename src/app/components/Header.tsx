import { SearchControls } from ".";

export default function Header() {
  return (
    <header
      className={`sticky top-0 z-10 flex flex-row justify-between items-center bg-primary-700 p-4 shadow-md`}
    >
      <h1 className="text-3xl font-bold mb-2 text-white">Solace Advocates</h1>
      <SearchControls />
    </header>
  );
}
