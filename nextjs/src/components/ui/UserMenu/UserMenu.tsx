import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import { Button, IconButton, MenuItem } from '@/components/ui';
import { useUIStore } from '@/lib/store';
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
  const { openAuthModal } = useUIStore();

  const { status, logOut } = useAuth();

  const isAuthenticated = status === 'authenticated';

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <Fragment>
          <Menu.Button as="div">
            <IconButton icon={UserIcon} size="large" />
          </Menu.Button>
          <AnimatePresence>
            {open && (
              <Menu.Items
                className="w-60 mt-3 absolute right-0 origin-top-right flex flex-col border rounded-lg border-slate-100 bg-white overflow-hidden"
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
                        'shadow-stroke-b bg-white transition-colors',
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
                        'shadow-stroke-b bg-white transition-colors',
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
                        'shadow-stroke-b bg-white transition-colors',
                        active && 'bg-slate-50'
                      )}
                    >
                      <MenuItem text="Preferences" />
                    </li>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <li
                      className="m-6 flex flex-col"
                      onClick={
                        isAuthenticated
                          ? logOut
                          : openAuthModal.bind(null, 'login')
                      }
                    >
                      <Button
                        className={active ? 'bg-slate-700' : ''}
                        text={isAuthenticated ? 'Log out' : 'Log in'}
                        icon={
                          isAuthenticated
                            ? ArrowRightOnRectangleIcon
                            : ArrowLeftOnRectangleIcon
                        }
                      />
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
