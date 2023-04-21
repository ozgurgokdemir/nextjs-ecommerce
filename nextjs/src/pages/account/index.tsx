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
      <ul>
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
