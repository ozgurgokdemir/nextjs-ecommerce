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

  const [searchResults, setSearchResults] = useState<Product[] | null>([]);

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

  useEffect(() => closeSearchModal, [closeSearchModal]);

  const search = (query: string) => {
    console.log(query);

    // request data by search query
    // ...

    // update the state with response data
    // setSearchResults(data)
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

    search(event.target.value);
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
            className="w-full max-w-full h-full max-h-full m-0 p-0 block-start-auto block-end-auto bg-white backdrop:bg-black/30"
          >
            <div className="w-full h-full flex flex-col">
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
                  <p className="text-body-sm-400 text-slate-600">
                    No results found.
                  </p>
                </div>
              )}
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </Portal>
  );
}
