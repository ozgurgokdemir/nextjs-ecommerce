import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { AccountLayout } from '@/components/layout';
import { LinkButton, ListItem } from '@/components/ui';

export default function Account() {
  return (
    <section className="flex flex-col sm:hidden">
      <ul>
        <ListItem href="" text="Preferences" size="large" />
      </ul>
      <LinkButton
        className="mx-6 my-8"
        href="/login"
        text="Log in"
        icon={ArrowLeftOnRectangleIcon}
      />
    </section>
  );
}

Account.PageLayout = AccountLayout;
