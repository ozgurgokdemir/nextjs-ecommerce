import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { UserIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { LinkButton, ListItem } from '@/components/ui';
import { SignOutButton } from '@/components/auth';

export default async function Account() {
  const session = await getServerSession(authOptions);

  const { user } = session ?? {};

  return (
    <section className="flex flex-col sm:hidden">
      {user && (
        <div className="flex items-center gap-4 px-6 py-8 shadow-stroke-b">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100">
            {user.image ? (
              <Image
                className="h-full w-full object-cover"
                src={user.image}
                alt={user.name}
                width={96}
                height={96}
                priority={true}
              />
            ) : (
              <UserIcon className="h-12 text-slate-400" />
            )}
          </div>
          <h1 className="flex-1 truncate font-secondary text-heading-2xl text-slate-900">
            {user.name}
          </h1>
        </div>
      )}
      <ul>
        {user && (
          <>
            <ListItem href="" text="Customize profile" size="large" />
            <ListItem href="" text="Change password" size="large" />
          </>
        )}
        <ListItem href="" text="Preferences" size="large" />
      </ul>
      {user ? (
        <SignOutButton text="Log out" className="mx-6 my-8" showIcon />
      ) : (
        <LinkButton
          href="/login"
          text="Log in"
          icon={ArrowLeftOnRectangleIcon}
          className="mx-6 my-8"
        />
      )}
    </section>
  );
}
