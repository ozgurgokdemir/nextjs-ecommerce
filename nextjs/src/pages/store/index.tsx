import type { GetStaticProps } from 'next';
import { StoreLayout } from '@/components/layout';
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
    <ul className="sm:hidden">
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
  );
}

Store.PageLayout = StoreLayout;

export const getStaticProps: GetStaticProps = async () => {
  const categories = await strapi.getCategories();
  return { props: { categories }, revalidate: 3600 };
};
