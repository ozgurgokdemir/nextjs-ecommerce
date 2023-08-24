import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Button, LinkButton, ListItem } from '@/components/ui';

export default async function Account() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-col sm:hidden">
      {session && (
        <div className="flex items-center gap-4 px-6 py-8 shadow-stroke-b">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100">
            {session.user.image ? (
              <Image
                className="h-full w-full object-cover"
                src={session.user.image}
                alt={session.user.name}
                width={96}
                height={96}
              />
            ) : (
              <UserIcon className="h-12 text-slate-400" />
            )}
          </div>
          <h1 className="flex-1 truncate font-secondary text-heading-2xl text-slate-900">
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
          onClick={void signOut}
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
