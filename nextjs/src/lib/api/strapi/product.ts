import type { StrapiResponse, StrapiData, Product, Image } from '@/lib/types';
import formatImage from '@/lib/utils/format-image';

type StrapiImages = StrapiResponse<StrapiData<Image>[]>;

type StrapiCategory = StrapiResponse<
  StrapiData<{ title: string; slug: string }>
>;

type StrapiProduct = StrapiData<
  Product & {
    images: StrapiImages;
    category: StrapiCategory;
  }
>;

const formatProduct = async ({ id, attributes }: StrapiProduct) => ({
  id: id,
  title: attributes.title,
  description: attributes.description,
  price: attributes.price,
  discount: attributes.discount,
  images: await Promise.all(
    attributes.images.data.map((image) => formatImage(image.attributes))
  ),
  category: attributes.category.data.attributes.slug,
  slug: attributes.slug,
});

async function fetchProducts(filters: string[]) {
  const params = ['populate=*'];
  filters.forEach((filter) => params.push(filter));

  const url = `${process.env.STRAPI_URL}/api/products?${params.join('&')}`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiProduct[]>;

  if (!data) return null;

  return Promise.all(data.map(formatProduct));
}

export async function getProduct(slug: string) {
  const filter = `filters[slug][$eq]=${slug}`;

  const products = await fetchProducts([filter]);

  return products ? products[0] : null;
}

type Queries = {
  category?: string;
  discount?: boolean;
  limit?: number;
  exclude?: number;
};

export async function getProducts(queries?: Queries) {
  const filters: string[] = [];

  if (!queries) return await fetchProducts(filters);

  const { category, discount, limit, exclude } = queries;

  if (category) filters.push(`filters[category][slug][$eq]=${category}`);
  if (discount) filters.push('filters[discount][$gt]=0');
  if (limit) filters.push(`pagination[limit]=${limit}`);
  if (exclude) filters.push(`filters[id][$ne]=${exclude}`);

  return await fetchProducts(filters);
}
