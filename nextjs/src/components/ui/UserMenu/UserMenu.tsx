'use client';
import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import { Button, IconButton, LinkButton, MenuItem } from '@/components/ui';
import { useAuth } from '@/lib/hooks';

const variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: { ease: 'easeIn', duration: 0.075 },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { ease: 'easeOut', duration: 0.1 },
  },
};

export default function UserMenu() {
  const { status, logOut } = useAuth();

  const isAuthenticated = status === 'authenticated';

  return (
    <Menu as="div" className="relative">
      {({ open, close }) => (
        <Fragment>
          <Menu.Button as="div">
            <IconButton icon={UserIcon} size="large" />
          </Menu.Button>
          <AnimatePresence>
            {open && (
              <Menu.Items
                className="absolute right-0 mt-3 flex w-60 origin-top-right flex-col overflow-hidden rounded-lg border border-slate-100 bg-white"
                as={motion.ul}
                static
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={variants}
              >
                <Menu.Item disabled={!isAuthenticated}>
                  {({ active, disabled }) => (
                    <li
                      className={clsx(
                        'bg-white shadow-stroke-b transition-colors',
                        active && 'bg-slate-50'
                      )}
                    >
                      <MenuItem text="Account" disabled={disabled} />
                    </li>
                  )}
                </Menu.Item>
                <Menu.Item disabled={!isAuthenticated}>
                  {({ active, disabled }) => (
                    <li
                      className={clsx(
                        'bg-white shadow-stroke-b transition-colors',
                        active && 'bg-slate-50'
                      )}
                    >
                      <MenuItem text="Favourites" disabled={disabled} />
                    </li>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <li
                      className={clsx(
                        'bg-white shadow-stroke-b transition-colors',
                        active && 'bg-slate-50'
                      )}
                    >
                      <MenuItem text="Preferences" />
                    </li>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <li className="m-6 flex flex-col">
                      {isAuthenticated ? (
                        <Button
                          onClick={logOut}
                          text={'Log out'}
                          icon={ArrowRightOnRectangleIcon}
                          className={active ? 'bg-slate-700' : ''}
                        />
                      ) : (
                        <LinkButton
                          href={{ query: { auth: 'register' } }}
                          onClick={close}
                          text={'Log in'}
                          icon={ArrowLeftOnRectangleIcon}
                          className={active ? 'bg-slate-700' : ''}
                        />
                      )}
                    </li>
                  )}
                </Menu.Item>
              </Menu.Items>
            )}
          </AnimatePresence>
        </Fragment>
      )}
    </Menu>
  );
}
