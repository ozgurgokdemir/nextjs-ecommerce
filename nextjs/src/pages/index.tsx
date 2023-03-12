import Image from 'next/image';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import {
  TruckIcon,
  ChatBubbleBottomCenterTextIcon,
  CreditCardIcon,
  TagIcon,
} from '@heroicons/react/24/solid';
import { IndexLayout } from '@/components/layout';
import { Button, InfoCard } from '@/components/ui';
import { ProductCard } from '@/components/product';
import { ContactForm } from '@/components/form';

const DUMMY_PRODUCTS = [
  {
    key: 0,
    title: 'Laptop 2',
    price: '000',
    oldPrice: '000',
    image: '',
    imageAlt: '',
    slug: '',
  },
  {
    key: 0,
    title: 'Smartwatch 1',
    price: '000',
    oldPrice: '000',
    image: '',
    imageAlt: '',
    slug: '',
  },
  {
    key: 0,
    title: 'Smartphone 2',
    price: '000',
    oldPrice: '000',
    image: '',
    imageAlt: '',
    slug: '',
  },
  {
    key: 0,
    title: 'Smartwatch 2',
    price: '000',
    oldPrice: '000',
    image: '',
    imageAlt: '',
    slug: '',
  },
];

export default function Home() {
  return (
    <main className="pb-[4.5rem] sm:pb-0">
      <section className="container py-12 grid gap-6 sm:min-h-fit sm:py-16 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 sm:gap-y-0">
        <div className="flex flex-col gap-2 text-center sm:gap-4 sm:text-left sm:place-content-end">
          <h1 className="font-secondary text-heading-2xl md:text-heading-3xl lg:text-display">
            Shop the Latest Laptop
            <br />
            at eCommerce
          </h1>
          <p className="text-body-xs-500 md:text-body-sm-500 lg:text-body-base-500">
            The smartest way to buy the products you love
          </p>
        </div>
        <div className="w-full aspect-square xl:w-[37.75rem] xl:aspect-4/3 sm:row-span-2">
          <Image
            className="w-full h-full object-contain"
            src=""
            alt=""
            width={604}
            height={453}
          />
        </div>
        <Button
          className="sm:mt-12 md:w-[18.125rem] md:mt-16"
          text="Get yours today"
          icon={ArrowLongRightIcon}
        />
      </section>
      <section className="grid grid-cols-1 gap-4 px-6 pt-3 pb-8 sm:container sm:grid-cols-2 sm:gap-6 sm:py-12 xl:grid-cols-4">
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
      <section className="flex flex-col gap-4 py-8 sm:container sm:gap-6 sm:py-16">
        <h2 className="px-6 font-secondary text-heading-2xl sm:px-0 sm:text-heading-3xl">
          Hot Sales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {DUMMY_PRODUCTS.map((product) => (
            <ProductCard
              className="last:border-b-0 last:sm:border-b"
              key={product.key}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image}
              imageAlt={product.imageAlt}
              slug={product.slug}
            />
          ))}
        </div>
      </section>
      <section className="px-6 py-8 bg-white transition-colors sm:py-16 sm:bg-slate-50">
        <ContactForm />
      </section>
    </main>
  );
}

Home.PageLayout = IndexLayout;
