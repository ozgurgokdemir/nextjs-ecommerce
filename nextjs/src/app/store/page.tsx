import { strapi } from '@/lib/api';
import { CategoryItem } from '@/components/store';

export default async function Store() {
  const categories = await strapi.getCategories();

  if (!categories) return null;

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
