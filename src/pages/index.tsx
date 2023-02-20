import Image from 'next/image';
import { IndexLayout } from '@/components/layout';
import { Button } from '@/components/ui';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main>
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
    </main>
  );
}

Home.PageLayout = IndexLayout;
