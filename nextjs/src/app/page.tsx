import type { GetStaticProps } from 'next';
import type { Product, Image as ImageType } from '@/lib/types';
import { Fragment } from 'react';
import Image from 'next/image';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import {
  TruckIcon,
  ChatBubbleBottomCenterTextIcon,
  CreditCardIcon,
  TagIcon,
} from '@heroicons/react/24/solid';
import { IndexLayout } from '@/components/layout';
import { Button, InfoCard, LinkButton } from '@/components/ui';
import { ProductCard } from '@/components/product';
import { ContactForm } from '@/components/form';
import { strapi } from '@/lib/api';
import { useUIStore } from '@/lib/store';

type Props = {
  title: string | null;
  subtitle: string | null;
  image: ImageType | null;
  products: Product[] | null;
};

export default function Home(props: Props) {
  const { title, subtitle, image, products } = props;

  const { openAuthModal } = useUIStore();

  return (
    <Fragment>
      <section className="container grid gap-6 py-12 sm:min-h-fit sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 sm:gap-y-0 sm:py-16">
        <div className="flex flex-col gap-2 text-center sm:place-content-end sm:gap-4 sm:text-left">
          <h1 className="font-secondary text-heading-2xl md:text-heading-3xl lg:text-display">
            {title}
          </h1>
          <p className="text-body-xs-500 md:text-body-sm-500 lg:text-body-base-500">
            {subtitle}
          </p>
        </div>
        <div className="aspect-square w-full py-4 sm:row-span-2 sm:py-0 xl:aspect-4/3 xl:w-[37.75rem]">
          {image && (
            <Image
              className="h-full w-full object-cover sm:rotate-[45deg] sm:-scale-x-100"
              src={image.url}
              alt={image.alternativeText}
              width={604}
              height={453}
              priority={true}
            />
          )}
        </div>
        <LinkButton
          className="flex sm:hidden"
          text="Get yours today"
          icon={ArrowLongRightIcon}
          href="/register"
        />
        <Button
          className="hidden sm:mt-12 sm:flex md:mt-16 md:w-[18.125rem]"
          text="Get yours today"
          icon={ArrowLongRightIcon}
          onClick={openAuthModal.bind(null, 'register')}
        />
      </section>
      <section className="grid grid-cols-1 gap-4 px-6 pb-8 pt-3 sm:container sm:grid-cols-2 sm:gap-6 sm:py-12 xl:grid-cols-4">
        <InfoCard
          icon={TruckIcon}
          title="Free Delivery"
          subtitle="Free shipping on all order"
        />
        <InfoCard
          icon={ChatBubbleBottomCenterTextIcon}
          title="Online Support"
          subtitle="Support online 7/24"
        />
        <InfoCard
          icon={CreditCardIcon}
          title="Money Return"
          subtitle="Money back guarantee"
        />
        <InfoCard
          icon={TagIcon}
          title="Member Discount"
          subtitle="On every second order"
        />
      </section>
      {products && products.length > 0 && (
        <section className="flex flex-col gap-4 py-8 sm:container sm:gap-6 sm:py-16">
          <h2 className="px-6 font-secondary text-heading-2xl sm:px-0 sm:text-heading-3xl">
            Hot Sales
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {products.map((product) => (
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
      <section className="bg-white px-6 py-8 transition-colors sm:bg-slate-50 sm:py-16">
        <ContactForm />
      </section>
    </Fragment>
  );
}

Home.PageLayout = IndexLayout;

export const getStaticProps: GetStaticProps = async () => {
  const { title, subtitle, image } = await strapi.getHomePageData();
  const products = await strapi.getProducts({ discount: true, limit: 4 });
  return { props: { title, subtitle, image, products }, revalidate: 3600 };
};
