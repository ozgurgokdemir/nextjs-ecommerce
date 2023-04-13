import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Button, IconButton, ListItem } from '@/components/ui';

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
                <Menu.Item>
                  {({ active }) => (
                    <ListItem
                      className={active ? 'bg-slate-50' : ''}
                      href=""
                      text="Preferences"
                    />
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <li className="m-6 flex flex-col">
                      <Button
                        className={active ? 'bg-slate-700' : ''}
                        text="Log in"
                        icon={ArrowLeftOnRectangleIcon}
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
