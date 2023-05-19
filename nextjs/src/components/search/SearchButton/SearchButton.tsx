import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useUIStore } from '@/lib/store';

export default function SearchButton() {
  const { openSearchModal } = useUIStore();

  return (
    <button
      type="button"
      onClick={openSearchModal}
      className="flex h-12 w-60 items-center justify-between rounded-lg bg-slate-100 px-3 text-slate-400 transition-colors hover:bg-slate-50"
    >
      <p className="text-label-base-600">Search</p>
      <MagnifyingGlassIcon className="h-6" />
    </button>
  );
}
