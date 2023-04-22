type StrapiResponse<T> = { data: T };
type StrapiData<T> = { id: number; attributes: T };

type StrapiImage = StrapiResponse<
  StrapiData<{ url: string; alternativeText: string }>
>;
type StrapiCategory = StrapiResponse<
  StrapiData<{ title: string; slug: string; image: StrapiImage }>[]
>;

const isProduction = process.env.NODE_ENV === 'production';
const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API = STRAPI_URL + '/api';

export async function getCategories() {
  const response = await fetch(`${STRAPI_API}/categories?populate=*`);
  const { data } = (await response.json()) as StrapiCategory;

  if (!data) return [];

  const categories = data.map(({ id, attributes }) => ({
    id: id,
    title: attributes.title,
    image: {
      url:
        (isProduction ? '' : STRAPI_URL) + attributes.image.data.attributes.url,
      alternativeText: attributes.image.data.attributes.alternativeText,
    },
    slug: attributes.slug,
  }));
  return categories;
}
