import type { ApiProductProduct } from '../../../../../strapi/schemas';

type StrapiResponse<T> = { data: T };
type StrapiData<T> = { id: number; attributes: T };

type ApiProductImage = { url: string; alternativeText: string };
type StrapiImages = { images: StrapiResponse<StrapiData<ApiProductImage>[]> };
type StrapiProduct = StrapiData<ApiProductProduct['attributes'] & StrapiImages>;

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://127.0.0.1:1337';
const STRAPI_API = STRAPI_URL + '/api';

type Category = 'laptop' | 'smartphone' | 'smartwatch';

export async function getProducts(category?: Category, discount?: boolean) {
  const params: string[] = [];
  if (category) params.push(`filters[category][$eq]=${category}`);
  if (discount) params.push('filters[discount][$gt]=0');
  params.push('populate=*');

  const response = await fetch(`${STRAPI_API}/products?${params.join('&')}`);
  const { data } = (await response.json()) as StrapiResponse<StrapiProduct[]>;
  const products = data.map(({ id, attributes }) => ({
    id: id,
    title: attributes.title,
    description: attributes.description,
    price: attributes.price,
    discount: attributes.discount,
    images: attributes.images.data.map(
      (image) => STRAPI_URL + image.attributes.url
    ),
    imageAlt: attributes.images.data[0].attributes.alternativeText,
    category: attributes.category,
    slug: attributes.slug,
  }));
  return products;
}
