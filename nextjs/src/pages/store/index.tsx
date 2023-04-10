import type { GetStaticProps } from 'next';
import type { Category } from '@/lib/types';
import { StoreLayout } from '@/components/layout';
import { strapi } from '@/lib/api';
import { CategoryItem } from '@/components/store';

type Props = {
  categories: Category[];
};

export default function Store({ categories }: Props) {
  return (
    <ul className="sm:hidden">
      {categories.map((category) => (
        <li className="shadow-stroke-b" key={category.id}>
          <CategoryItem category={category} />
        </li>
      ))}
    </ul>
  );
}

Store.PageLayout = StoreLayout;

export const getStaticProps: GetStaticProps = async () => {
  const categories = await strapi.getCategories();
  return { props: { categories }, revalidate: 3600 };
};
