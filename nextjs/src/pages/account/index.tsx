import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { AccountLayout } from '@/components/layout';
import { Button, ListItem } from '@/components/ui';

export default function Account() {
  return (
    <section className="flex flex-col sm:hidden">
      <ul>
        <ListItem href="" text="Preferences" size="large" />
      </ul>
      <Button
        className="mx-6 my-8"
        text="Log in"
        icon={ArrowLeftOnRectangleIcon}
      />
    </section>
  );
}

Account.PageLayout = AccountLayout;
