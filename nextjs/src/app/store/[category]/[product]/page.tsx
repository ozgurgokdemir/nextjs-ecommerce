import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import {
  ProductCard,
  ProductCarousel,
  ProductDetails,
} from '@/components/product';
import { strapi } from '@/lib/api';

export async function generateStaticParams() {
  const products = await strapi.getProducts();

  if (!products) {
    throw new Error('Product params could not be generated');
  }

  return products.map(({ category, slug }) => ({ category, product: slug }));
}

export type Params = Awaited<ReturnType<typeof generateStaticParams>>[0];

type Props = { params: Params };

export default async function Product({ params }: Props) {
  const { product: slug } = params;

  const product = await strapi.getProduct(slug);
  if (!product) notFound();

  const otherProductsQuery = { exclude: product.id, limit: 4 };
  const otherProducts = await strapi.getProducts(otherProductsQuery);

  return (
    <Fragment>
      <section className="container flex flex-col gap-6 py-6 sm:gap-12 md:flex-row md:justify-between md:py-16">
        <ProductCarousel images={product.images} />
        <ProductDetails product={product} />
      </section>
      {otherProducts && otherProducts.length > 0 && (
        <section className="flex flex-col pt-12 sm:container sm:gap-6 sm:py-16">
          <h2 className="px-6 font-secondary text-heading-2xl sm:px-0 sm:text-heading-3xl">
            Other Products
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {otherProducts.map((product) => (
              <li
                className="shadow-stroke-b last:shadow-none sm:shadow-none"
                key={product.id}
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Fragment>
  );
}
