import type {
  MouseEventHandler,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';
import type { Category, Product } from '@/lib/types';
import { useState, useRef, useEffect } from 'react';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ListItem } from '@/components/ui';
import { useUIStore } from '@/lib/store';
import { usePortal } from '@/lib/hooks';

type SearchResult = Pick<Product, 'id' | 'title' | 'slug' | 'category'>;

const DUMMY_CATEGORIES: Pick<Category, 'title' | 'slug'>[] = [
  { title: 'Laptop', slug: 'laptop' },
  { title: 'Smartphone', slug: 'smartphone' },
  { title: 'Smartwatch', slug: 'smartwatch' },
];

const variants = {
  hidden: { top: '100%', transition: { ease: 'easeIn', duration: 0.2 } },
  show: { top: 0, transition: { ease: 'easeOut', duration: 0.3 } },
};

export default function SearchModal() {
  const { isSearchModalOpen, closeSearchModal } = useUIStore();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState<SearchResult[] | null>();

  const modalRef = useRef<HTMLDialogElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const Portal = usePortal('__next');

  useEffect(() => {
    const isMobile = window.innerWidth < 640;

    if (isSearchModalOpen) {
      modalRef.current?.showModal();
      inputRef.current?.focus();
      document.documentElement.style.overflow = 'hidden';
      if (!isMobile) document.documentElement.style.paddingRight = '17px';
    } else {
      document.documentElement.style.overflow = '';
      if (!isMobile) document.documentElement.style.paddingRight = '';
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return setSearchResults(undefined);

    const timeoutId = setTimeout(() => void search(query), 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => closeSearchModal, [closeSearchModal]);

  const search = async (query: string) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });

    if (!response.ok) return setSearchResults(null);

    const searchResults = (await response.json()) as SearchResult[];

    setSearchResults(searchResults);
  };

  const handleCancel = () => {
    setSearchQuery('');

    inputRef.current?.focus();
  };

  const handleClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    const dialogDimensions = modalRef.current?.getBoundingClientRect();

    if (!dialogDimensions) return;

    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      closeSearchModal();
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    modalRef.current?.focus();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Portal>
      <AnimatePresence>
        {isSearchModalOpen && (
          <motion.dialog
            ref={modalRef}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={variants}
            onClick={handleClick}
            className="m-0 h-full max-h-full w-full max-w-full bg-white p-0 font-primary block-start-auto block-end-auto backdrop:bg-black/30"
          >
            <div className="flex h-full w-full flex-col">
              <div className="flex items-center shadow-stroke-b">
                <button
                  type="button"
                  onClick={closeSearchModal}
                  className="p-6 text-slate-800"
                >
                  <ChevronLeftIcon className="h-6" />
                </button>
                <form
                  onSubmit={handleSubmit}
                  className="relative mr-6 flex h-12 w-full items-center"
                >
                  <input
                    ref={inputRef}
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleChange}
                    className="h-full w-full rounded-lg bg-slate-100 pl-3 pr-10 text-label-base-500 placeholder:text-label-base-600 placeholder:text-slate-400 hover:bg-slate-50 focus:bg-white search-cancel:hidden"
                  />
                  <button
                    type="button"
                    disabled={searchQuery === ''}
                    onClick={handleCancel}
                    className={clsx(
                      'absolute right-3 text-slate-400',
                      searchQuery === '' && 'pointer-events-none'
                    )}
                  >
                    {searchQuery === '' ? (
                      <MagnifyingGlassIcon className="h-6" />
                    ) : (
                      <XMarkIcon className="h-6" />
                    )}
                  </button>
                </form>
              </div>
              {searchResults === undefined ? (
                <ul>
                  {DUMMY_CATEGORIES.map((category) => (
                    <ListItem
                      key={category.slug}
                      href={`/store/${category.slug}`}
                      text={category.title}
                    />
                  ))}
                </ul>
              ) : searchResults === null ? (
                <p className="mt-36 text-center text-body-sm-400 text-slate-600">
                  Something went wrong.
                </p>
              ) : searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((result) => (
                    <ListItem
                      key={result.id}
                      href={`/store/${result.category}/${result.slug}`}
                      text={result.title}
                    />
                  ))}
                </ul>
              ) : (
                <p className="mt-36 text-center text-body-sm-400 text-slate-600">
                  No results found.
                </p>
              )}
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </Portal>
  );
}
