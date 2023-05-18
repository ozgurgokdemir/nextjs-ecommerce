import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useUIStore } from '@/lib/store';

export default function SearchButton() {
  const { openSearchModal } = useUIStore();

  return (
    <button
      type="button"
      onClick={openSearchModal}
      className="w-60 h-12 rounded-lg flex items-center justify-between px-3 text-slate-400 bg-slate-100 hover:bg-slate-50 transition-colors"
    >
      <p className="text-label-base-600">Search</p>
      <MagnifyingGlassIcon className="h-6" />
    </button>
  );
}
