import type { ApiProductProduct } from '../../../../../strapi/schemas';

type StrapiResponse<T> = { data: T };
type StrapiData<T> = { id: number; attributes: T };

type StrapiImages = StrapiResponse<
  StrapiData<{ url: string; alternativeText: string }>[]
>;
type StrapiCategory = StrapiResponse<
  StrapiData<{ title: string; slug: string }>
>;
type StrapiProduct = StrapiData<
  ApiProductProduct['attributes'] & {
    images: StrapiImages;
    category: StrapiCategory;
  }
>;

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://127.0.0.1:1337';
const STRAPI_API = STRAPI_URL + '/api';

export async function getProducts(category?: string, discount?: boolean) {
  const params = ['populate=*'];
  if (category) params.push(`filters[category][slug][$eq]=${category}`);
  if (discount) params.push('filters[discount][$gt]=0');

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
    category: attributes.category.data.attributes.slug,
    slug: attributes.slug,
  }));
  return products;
}
