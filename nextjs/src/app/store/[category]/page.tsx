import { ProductCard } from '@/components/product';
import { strapi } from '@/lib/api';

export async function generateStaticParams() {
  const categories = await strapi.getCategories();

  if (!categories) {
    throw new Error('Category params could not be generated');
  }

  return categories.map(({ slug }) => ({ category: slug }));
}

type Params = Awaited<ReturnType<typeof generateStaticParams>>[0];

type Props = { params: Params };

export default async function Category({ params }: Props) {
  const { category } = params;

  const products = await strapi.getProducts({ category });

  if (!products) return null;

  return (
    <section className="flex flex-col sm:container sm:gap-6 sm:py-16">
      <h1 className="hidden px-0 font-secondary text-heading-3xl sm:block">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {products.map((product) => (
          <li className="shadow-stroke-b sm:shadow-none" key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
