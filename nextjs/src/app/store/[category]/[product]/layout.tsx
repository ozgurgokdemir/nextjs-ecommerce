import type { Params } from './page';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { strapi } from '@/lib/api';
import { ProductActionBar } from '@/components/product';

type ProductLayoutProps = {
  children: React.ReactNode;
  params: Params;
};

export default async function ProductLayout(props: ProductLayoutProps) {
  const { children, params } = props;

  const product = await strapi.getProduct(params.product);
  if (!product) notFound();

  return (
    <Fragment>
      {children}
      <ProductActionBar product={product} />
    </Fragment>
  );
}
