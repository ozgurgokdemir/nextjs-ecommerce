import type { FormEventHandler, ChangeEventHandler } from 'react';
import type { Category, Product } from '@/lib/types';
import { useState, useRef, useEffect } from 'react';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { clsx } from 'clsx';
import { ListItem } from '@/components/ui';
import { useUIStore } from '@/lib/store';

type SearchResult = Pick<Product, 'id' | 'title' | 'slug' | 'category'>;

const DUMMY_CATEGORIES: Pick<Category, 'title' | 'slug'>[] = [
  { title: 'Laptop', slug: 'laptop' },
  { title: 'Smartphone', slug: 'smartphone' },
  { title: 'Smartwatch', slug: 'smartwatch' },
];

const variants = {
  hidden: (isMobile: boolean) => ({
    top: isMobile ? '100%' : '12rem',
    opacity: isMobile ? 1 : 0,
    scale: isMobile ? 1 : 0.95,
    transition: { ease: 'easeIn', duration: 0.2 },
  }),
  show: (isMobile: boolean) => ({
    top: isMobile ? 0 : '12rem',
    opacity: 1,
    scale: 1,
    transition: { ease: 'easeOut', duration: 0.3 },
  }),
};

const backdropVariants = {
  hidden: {
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.2 },
  },
  show: {
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.3 },
  },
};

const searchResultVariants = {
  initial: ({ isMobile }: { isMobile: boolean }) => ({
    height: isMobile ? 'auto' : 0,
    opacity: 0,
    left: '-3rem',
    transition: { ease: 'easeIn', duration: 0.2 },
  }),
  hidden: ({ isMobile }: { isMobile: boolean }) => ({
    height: isMobile ? 'auto' : 0,
    opacity: 0,
    left: 0,
    transition: { ease: 'easeIn', duration: 0.2 },
  }),
  show: ({ index }: { index: number }) => ({
    height: 'auto',
    opacity: 1,
    left: 0,
    transition: { ease: 'easeOut', duration: 0.3, delay: index * 0.2 },
  }),
};

const messageVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.2 },
  },
  show: {
    height: '12rem',
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.3 },
  },
};

export default function SearchModal() {
  const { isSearchModalOpen, closeSearchModal } = useUIStore();

  const getIsMobile = () => window.innerWidth < 640;

  const [isMobile, setIsMobile] = useState(getIsMobile());

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState<SearchResult[] | null>();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    inputRef.current?.blur();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAnimationStart = (variant: keyof typeof variants) => {
    if (variant === 'show') inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isSearchModalOpen && (
        <Dialog
          static
          as={motion.div}
          open={isSearchModalOpen}
          onClose={closeSearchModal}
          className="relative z-50"
        >
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={backdropVariants}
            aria-hidden="true"
            className="fixed inset-0 bg-black/30"
          />
          <Dialog.Panel
            as={motion.div}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={variants}
            custom={isMobile}
            onAnimationStart={handleAnimationStart}
            className="fixed inset-0 flex h-full w-full flex-col overflow-hidden bg-white font-primary sm:mx-auto sm:h-fit sm:max-w-[30rem] sm:rounded-lg"
          >
            <div className="flex items-center shadow-stroke-b sm:p-3">
              <button
                type="button"
                onClick={closeSearchModal}
                className="p-6 text-slate-800 sm:hidden"
              >
                <ChevronLeftIcon className="h-6" />
              </button>
              <form
                onSubmit={handleSubmit}
                className="relative mr-6 flex h-12 w-full items-center sm:mr-0"
              >
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleChange}
                  className="h-full w-full rounded-lg bg-slate-100 pl-3 pr-10 text-label-base-500 placeholder:text-label-base-600 placeholder:text-slate-400 hover:bg-slate-50 focus:bg-white search-cancel:hidden sm:bg-white sm:pl-14 sm:focus-within:outline-none"
                />
                <button
                  type="button"
                  disabled={searchQuery === ''}
                  onClick={handleCancel}
                  tabIndex={-1}
                  className={clsx(
                    'pointer-events-none absolute right-3 text-slate-400 sm:right-auto sm:left-3 sm:text-slate-800',
                    searchQuery.length > 0 && 'hidden sm:flex'
                  )}
                >
                  <MagnifyingGlassIcon className="h-6" />
                </button>
                <button
                  type="button"
                  disabled={searchQuery === ''}
                  onClick={handleCancel}
                  className={clsx(
                    'absolute right-3 text-slate-400 sm:text-slate-800',
                    searchQuery.length === 0 && 'hidden'
                  )}
                >
                  <XMarkIcon className="h-6" />
                </button>
              </form>
            </div>
            <AnimatePresence initial={false} mode="wait">
              {searchResults === undefined ? (
                <ul key="categories" className="overflow-x-hidden">
                  {DUMMY_CATEGORIES.map((category, index) => (
                    <motion.li
                      key={category.slug}
                      initial="initial"
                      animate="show"
                      exit="hidden"
                      variants={searchResultVariants}
                      custom={{ index, isMobile }}
                      className="relative overflow-hidden bg-white shadow-stroke-b transition-colors hover:bg-slate-50"
                    >
                      <ListItem.Content
                        href={`/store/${category.slug}`}
                        text={category.title}
                      />
                    </motion.li>
                  ))}
                </ul>
              ) : searchResults === null ? (
                <motion.p
                  key="errorMessage"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={messageVariants}
                  className="mt-36 text-center text-body-sm-400 text-slate-600 sm:mt-0 sm:grid sm:h-48 sm:place-items-center"
                >
                  Something went wrong.
                </motion.p>
              ) : searchResults.length > 0 ? (
                <ul
                  key="searchResults"
                  className="max-h-[28rem] overflow-y-auto overflow-x-hidden"
                >
                  {searchResults.map((result, index) => (
                    <motion.li
                      key={result.id}
                      initial="initial"
                      animate="show"
                      exit="hidden"
                      variants={searchResultVariants}
                      custom={{ index, isMobile }}
                      className="relative overflow-hidden bg-white shadow-stroke-b transition-colors hover:bg-slate-50"
                    >
                      <ListItem.Content
                        href={`/store/${result.category}/${result.slug}`}
                        text={result.title}
                      />
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.p
                  key="notFoundMessage"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={messageVariants}
                  className="mt-36 text-center text-body-sm-400 text-slate-600 sm:mt-0 sm:grid sm:h-48 sm:place-items-center"
                >
                  No results found.
                </motion.p>
              )}
            </AnimatePresence>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
