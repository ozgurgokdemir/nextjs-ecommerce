import type {
  MouseEventHandler,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';
import type { Category, Product } from '@/lib/types';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { ListItem } from '@/components/ui';
import { useUIStore } from '@/lib/store';

const DUMMY_CATEGORIES: Pick<Category, 'title' | 'slug'>[] = [
  { title: 'Laptop', slug: 'laptop' },
  { title: 'Smartphone', slug: 'smartphone' },
  { title: 'Smartwatch', slug: 'smartwatch' },
];

export default function SearchModal() {
  const { isSearchModalOpen, closeSearchModal } = useUIStore();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState<Product[] | null>([]);

  const modalRef = useRef<HTMLDialogElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      modalRef.current?.showModal();
      inputRef.current?.focus();
      inputRef.current?.click();
    } else {
      modalRef.current?.close();
    }
  }, [isSearchModalOpen]);

  const search = (query: string) => {
    console.log(query);

    // request data by search query
    // ...

    // update the state with response data
    // setSearchResults(data)
  };

  const handleClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    const dialog = modalRef.current;
    if (!dialog) return;

    const dialogDimensions = dialog.getBoundingClientRect();

    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  };

  const handleSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    search(searchQuery);

    setSearchQuery('');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.target.value);

    search(event.target.value);
  };

  return (
    <dialog
      ref={modalRef}
      onClick={handleClick}
      className="w-full max-w-full h-full max-h-full m-0 p-0 bg-white backdrop:bg-black/30"
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center shadow-stroke-b">
          <button
            type="button"
            onClick={() => {
              closeSearchModal();
              console.log('closeSearchModal');
            }}
            className="p-6 text-slate-800"
          >
            <ChevronLeftIcon className="h-6" />
          </button>
          <form
            onSubmit={handleSearch}
            className="w-full h-12 mr-6 flex items-center relative"
          >
            <input
              ref={inputRef}
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleChange}
              className="w-full h-full pl-3 pr-10 rounded-lg text-label-base-500 bg-slate-100 hover:bg-slate-50 focus:bg-white placeholder:text-label-base-600 placeholder:text-slate-400 search-cancel:hidden"
            />
            <button type="submit" className="absolute right-3 text-slate-400">
              <MagnifyingGlassIcon className="h-6" />
            </button>
          </form>
        </div>
        {searchResults && searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <ListItem
                key={result.id}
                href={`/store/${result.category}/${result.slug}`}
                text={result.title}
              />
            ))}
          </ul>
        ) : searchResults && searchResults.length === 0 ? (
          <ul>
            {DUMMY_CATEGORIES.map((category) => (
              <ListItem
                key={category.slug}
                href={`/store/${category.slug}`}
                text={category.title}
              />
            ))}
          </ul>
        ) : (
          <div className="flex-1 grid place-items-center">
            <p className="text-body-sm-400 text-slate-600">No results found.</p>
          </div>
        )}
      </div>
    </dialog>
  );
}
