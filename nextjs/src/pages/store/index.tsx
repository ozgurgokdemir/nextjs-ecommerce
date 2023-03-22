import type { GetStaticProps } from 'next';
import { IndexLayout } from '@/components/layout';
import { ListItem } from '@/components/ui';
import { strapi } from '@/lib/api';

type Category = {
  id: number;
  title: string;
  image: {
    url: string;
    alternativeText: string;
  };
  slug: string;
};

type Props = {
  categories: Category[];
};

export default function Store({ categories }: Props) {
  return (
    <main className="pb-[4.5rem] sm:pb-0">
      <ul>
        {categories.map(({ id, title, image, slug }) => (
          <ListItem
            key={id}
            href={`store/${slug}`}
            text={title}
            image={image.url}
            imageAlt={image.alternativeText}
            size="large"
          />
        ))}
      </ul>
    </main>
  );
}

Store.PageLayout = IndexLayout;

export const getStaticProps: GetStaticProps = async () => {
  const categories = await strapi.getCategories();
  return { props: { categories }, revalidate: 3600 };
};
