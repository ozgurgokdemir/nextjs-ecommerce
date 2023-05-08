import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Product } from '@/lib/types';
import { Fragment, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import {
  HeartIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { ProductLayout } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { Button, IconButton } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { strapi } from '@/lib/api';
import { limitImageSize } from '@/lib/utils';

type Props = {
  product: Product;
  otherProducts: Product[];
};

export default function Product({ product, otherProducts }: Props) {
  const { title, description, price, discount, images } = product;

  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState<number>(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { cartItems, addToCart, removeFromCart } = useCartStore();

  const productIndex = cartItems.findIndex((item) => item.id === product.id);
  const isProductAdded = productIndex !== -1;

  const discountAmount = price * (discount / 100);
  const newPrice = Math.trunc(price - discountAmount);
  const oldPrice = Math.trunc(price);

  useEffect(() => {
    const { offsetWidth } = carouselRef.current ?? {};
    if (offsetWidth) setCarouselWidth(offsetWidth);
  }, []);

  function handleSwipe(swipeDistance: number) {
    const swipeThreshold = carouselWidth / 4;
    if (Math.abs(swipeDistance) < swipeThreshold) return;

    const direction = swipeDistance > 0 ? -1 : 1;
    const nextIndex = currentImageIndex + direction;

    if (nextIndex < 0 || nextIndex > images.length - 1) return;
    setCurrentImageIndex(nextIndex);
  }

  return (
    <Fragment>
      <section className="py-6 container flex flex-col gap-6 sm:gap-12 md:py-16 md:flex-row md:justify-between">
        <div className="flex-1 max-w-[37rem] flex flex-col gap-4">
          <motion.div className="aspect-4/3 rounded-lg overflow-hidden">
            <motion.div
              ref={carouselRef}
              className="w-full h-full flex cursor-grab"
              animate={{ x: `-${currentImageIndex * 100}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              drag="x"
              dragConstraints={{
                left: -currentImageIndex * carouselWidth,
                right: -currentImageIndex * carouselWidth,
              }}
              dragMomentum={false}
              whileTap={{ cursor: 'grabbing' }}
              onDragEnd={(_, { offset }) => handleSwipe(offset.x)}
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="min-w-full min-h-full first:rounded-l-lg last:rounded-r-lg overflow-hidden"
                >
                  <Image
                    className="w-full h-full object-cover"
                    src={image.url}
                    alt={image.alternativeText}
                    {...limitImageSize(image, 592)}
                    blurDataURL={image.blurDataURL}
                    placeholder="blur"
                    priority={true}
                    draggable={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                className={clsx(
                  'aspect-4/3 rounded-lg overflow-hidden transition-opacity duration-300',
                  index !== currentImageIndex && 'opacity-50'
                )}
                type="button"
                onClick={setCurrentImageIndex.bind(null, index)}
              >
                <Image
                  className="w-full h-full object-cover"
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  {...limitImageSize(image, 592)}
                  blurDataURL={image.blurDataURL}
                  placeholder="blur"
                  priority={true}
                  draggable={false}
                />
              </button>
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
                text={isProductAdded ? 'Remove' : 'Add to Cart'}
                icon={isProductAdded ? TrashIcon : ShoppingCartIcon}
                variant={isProductAdded ? 'secondary' : 'primary'}
                onClick={
                  isProductAdded
                    ? removeFromCart.bind(null, product.id)
                    : addToCart.bind(null, product, 1)
                }
              />
            </div>
          </div>
        </div>
      </section>
      {otherProducts.length > 0 && (
        <section className="pt-12 flex flex-col sm:container sm:gap-6 sm:py-16">
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

Product.PageLayout = ProductLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await strapi.getProducts();
  if (!products) return { paths: [], fallback: 'blocking' };

  const paths = products.map(({ category, slug }) => ({
    params: { category, product: slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { product: slug } = context.params as { product: string };
  const product = await strapi.getProduct(slug);
  if (!product) return { notFound: true };

  const otherProductsQuery = { exclude: product.id, limit: 4 };
  const otherProducts = await strapi.getProducts(otherProductsQuery);

  return { props: { product, otherProducts }, revalidate: 3600 };
};
