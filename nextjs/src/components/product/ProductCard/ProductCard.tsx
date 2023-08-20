'use client';
import type { MouseEvent } from 'react';
import type { Product } from '@/lib/types';
import { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import {
  HeartIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { IconButton, Button } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { limitImageSize } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
  className?: string;
};

const variants = {
  card: {
    default: {
      top: 0,
      left: 0,
      right: 0,
      transition: { ease: 'easeIn', duration: 0.2 },
    },
    hover: (width: number) => ({
      top: '-3.5rem',
      left: -((width * 1.1 - width) / 2),
      right: -((width * 1.1 - width) / 2),
      transition: { ease: 'easeOut', duration: 0.3 },
    }),
  },
  ctaContainer: {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { ease: 'easeIn', duration: 0.2 },
    },
    show: {
      opacity: 1,
      height: 'auto',
      transition: { ease: 'easeOut', duration: 0.3 },
    },
  },
  ctaButton: {
    hidden: {
      opacity: 0,
      transition: { ease: 'easeIn', duration: 0.2 },
    },
    show: {
      opacity: 1,
      transition: { ease: 'easeOut', duration: 0.3 },
    },
  },
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const { title, price, discount, images, category, slug } = product;

  const cardRef = useRef<HTMLDivElement>(null);

  const getIsDesktop = () => window.innerWidth >= 1280;

  const [isDesktop, setIsDesktop] = useState(getIsDesktop());

  const [isHovered, setIsHovered] = useState(false);

  const getCardSize = () => {
    const { offsetWidth, offsetHeight } = cardRef.current ?? {};
    return { width: offsetWidth, height: offsetHeight };
  };

  const [cardSize, setCardSize] = useState(getCardSize());

  const { cartItems, addToCart, removeFromCart } = useCartStore();

  const productIndex = cartItems.findIndex((item) => item.id === product.id);
  const isProductAdded = productIndex !== -1;

  const discountAmount = price * (discount / 100);
  const newPrice = Math.trunc(price - discountAmount);
  const oldPrice = Math.trunc(price);

  const url = `/store/${category}/${slug}`;

  useEffect(() => {
    setCardSize(getCardSize());

    const handleResize = () => {
      setIsDesktop(getIsDesktop());
      setCardSize(getCardSize());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const preventRouting = (event: MouseEvent, callback: () => void) => {
    event.preventDefault();
    event.stopPropagation();
    callback();
  };

  return (
    <div className="sm:relative" style={{ height: cardSize.height }}>
      <motion.div
        ref={cardRef}
        initial="default"
        whileHover="hover"
        variants={isDesktop ? variants.card : undefined}
        custom={cardSize.width ?? 0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
          'transition-shadow sm:absolute sm:h-fit sm:overflow-hidden sm:rounded-lg sm:border sm:border-slate-100 sm:bg-white xl:hover:shadow-lg xl:hover:shadow-slate-400/10',
          className
        )}
      >
        <Link className="flex gap-4 p-6 sm:flex-col sm:gap-0 sm:p-0" href={url}>
          <Image
            className="h-24 w-24 rounded-lg object-cover sm:aspect-4/3 sm:h-auto sm:w-full sm:rounded-none"
            src={images[0].url}
            alt={images[0].alternativeText}
            {...limitImageSize(images[0], 290)}
            blurDataURL={images[0].blurDataURL}
            placeholder="blur"
          />
          <div className="flex flex-1 flex-col justify-between sm:flex-none sm:justify-start sm:gap-3 sm:p-6 sm:pb-0">
            <h5 className="text-label-lg-500 sm:text-label-xl-500">{title}</h5>
            <div className="flex items-center gap-1 font-secondary text-label-sm-600 sm:mb-3">
              <span>{`$${newPrice}`}</span>
              {discount > 0 && (
                <Fragment>
                  <span className="text-slate-400">{'·'}</span>
                  <span className="text-slate-400">{`$${oldPrice}`}</span>
                </Fragment>
              )}
            </div>
            <div className="flex gap-3 sm:hidden">
              <IconButton className="flex-1" icon={HeartIcon} />
              <IconButton
                className={clsx('flex-1', isProductAdded && 'text-blue-400')}
                icon={ShoppingCartIcon}
                onClick={(e) =>
                  preventRouting(
                    e,
                    isProductAdded
                      ? removeFromCart.bind(null, product.id)
                      : addToCart.bind(null, product, 1)
                  )
                }
              />
            </div>
            <motion.div
              initial="hidden"
              animate={isHovered ? 'show' : 'hidden'}
              variants={isDesktop ? variants.ctaContainer : undefined}
              className="hidden sm:block"
            >
              <div className="flex gap-4 pb-6">
                <IconButton icon={HeartIcon} size="large" />
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={isProductAdded ? 'remove' : 'add'}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={variants.ctaButton}
                    className="flex-1"
                  >
                    <Button
                      className="w-full"
                      text={isProductAdded ? 'Remove' : 'Add to Cart'}
                      icon={isProductAdded ? TrashIcon : ShoppingCartIcon}
                      variant={isProductAdded ? 'secondary' : 'primary'}
                      onClick={(e) =>
                        preventRouting(
                          e,
                          isProductAdded
                            ? removeFromCart.bind(null, product.id)
                            : addToCart.bind(null, product, 1)
                        )
                      }
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
