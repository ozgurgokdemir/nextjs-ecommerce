import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { AccountLayout } from '@/components/layout';
import { Button, LinkButton, ListItem } from '@/components/ui';
import { useAuth } from '@/lib/hooks';

export default function Account() {
  const { session, logOut } = useAuth();

  return (
    <section className="flex flex-col sm:hidden">
      {session && (
        <div className="px-6 py-8 flex items-center gap-4 shadow-stroke-b">
          <div className="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden bg-slate-100">
            {session.user.image ? (
              <Image
                className="w-full h-full object-cover"
                src={session.user.image}
                alt={session.user.name}
                width={96}
                height={96}
              />
            ) : (
              <UserIcon className="h-12 text-slate-400" />
            )}
          </div>
          <h1 className="flex-1 font-secondary text-heading-2xl text-slate-900 truncate">
            {session.user.name}
          </h1>
        </div>
      )}
      <ul>
        {session && (
          <>
            <ListItem href="" text="Customize profile" size="large" />
            <ListItem href="" text="Change password" size="large" />
          </>
        )}
        <ListItem href="" text="Preferences" size="large" />
      </ul>
      {session ? (
        <Button
          className="mx-6 my-8"
          text="Log out"
          icon={ArrowRightOnRectangleIcon}
          onClick={logOut}
        />
      ) : (
        <LinkButton
          className="mx-6 my-8"
          href="/login"
          text="Log in"
          icon={ArrowLeftOnRectangleIcon}
        />
      )}
    </section>
  );
}

Account.PageLayout = AccountLayout;
