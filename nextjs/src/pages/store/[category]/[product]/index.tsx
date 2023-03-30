import type { GetStaticProps, GetStaticPaths } from 'next';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ProductLayout } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { Button, IconButton } from '@/components/ui';
import { strapi } from '@/lib/api';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  imageAlt: string;
  category: string;
  slug: string;
};

type Props = {
  product: Product;
  otherProducts: Product[];
};

export default function Product({ product, otherProducts }: Props) {
  const { title, description, price, discount, images, imageAlt } = product;

  const [displayedImage, setDisplayedImage] = useState(images[0]);

  const discountAmount = price * (discount / 100);
  const newPrice = Math.trunc(price - discountAmount);
  const oldPrice = Math.trunc(price);

  return (
    <Fragment>
      <section className="py-6 container flex flex-col gap-6 sm:gap-12 md:py-16 md:flex-row md:justify-between">
        <div className="flex-1 max-w-[37.75rem] flex flex-col gap-4">
          <div>
            <Image
              className="w-full aspect-4/3 rounded-lg object-cover"
              src={displayedImage}
              alt={imageAlt}
              width={604}
              height={453}
              priority={true}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, i) => (
              <Image
                className={clsx(
                  'w-full aspect-4/3 rounded-lg object-cover cursor-pointer',
                  displayedImage !== image && 'opacity-50'
                )}
                key={i}
                src={image}
                alt={imageAlt}
                width={604}
                height={453}
                priority={true}
                onClick={setDisplayedImage.bind(null, image)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex md:justify-end">
          <div className="flex flex-col gap-4 md:max-w-[25rem] sm:gap-6">
            <h1 className="font-secondary text-heading-3xl text-slate-900 sm:text-heading-4xl">
              {title}
            </h1>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm-600 text-slate-400">
                DESCRIPTION
              </span>
              <p className="text-body-base-400">{description}</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-secondary text-heading-3xl">
              <span>{`$${newPrice}`}</span>
              {discount > 0 && (
                <Fragment>
                  <span className="text-slate-400">{'·'}</span>
                  <span className="text-slate-400 line-through">{`$${oldPrice}`}</span>
                </Fragment>
              )}
            </div>
            <div className="hidden sm:flex gap-4">
              <IconButton icon={HeartIcon} size="large" />
              <Button
                className="flex-1"
                text="Add to Cart"
                icon={ShoppingCartIcon}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pt-12 flex flex-col sm:container sm:gap-6 sm:py-16">
        <h2 className="px-6 font-secondary text-heading-2xl sm:px-0 sm:text-heading-3xl">
          Other Products
        </h2>
        <ul className="group grid grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {otherProducts.map((product) => (
            <li className="group/item" key={product.id}>
              <ProductCard
                className="group-last/item:border-b-0 group-last/item:sm:border-b"
                title={product.title}
                price={product.price}
                discount={product.discount}
                image={product.images[0]}
                imageAlt={product.imageAlt}
                slug={`${product.category}/${product.slug}`}
              />
            </li>
          ))}
        </ul>
      </section>
    </Fragment>
  );
}

Product.PageLayout = ProductLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await strapi.getProducts();
  const paths = products.map(({ category, slug }) => ({
    params: { category, product: slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { product: slug } = context.params as { product: string };
  const product = await strapi.getProduct(slug);
  const otherProducts = await strapi.getOtherProducts(product.id, 4);
  return { props: { product, otherProducts }, revalidate: 3600 };
};
