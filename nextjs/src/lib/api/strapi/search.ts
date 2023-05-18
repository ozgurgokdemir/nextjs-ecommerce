import type {
  StrapiResponse,
  StrapiData,
  Product,
  Category,
} from '@/lib/types';

type StrapiCategory = StrapiResponse<StrapiData<Pick<Category, 'slug'>>>;

type StrapiProduct = StrapiData<
  Pick<Product, 'title' | 'slug'> & {
    category: StrapiCategory;
  }
>;

export async function getSearchResults(query: string) {
  const params = [
    `filters[title][$containsi]=${query}`,
    'fields=title,slug',
    'populate[category][fields]=slug',
  ];

  const url = `${process.env.STRAPI_URL}/api/products?${params.join('&')}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const { data } = (await response.json()) as StrapiResponse<StrapiProduct[]>;

  return data.map((result) => ({
    id: result.id,
    title: result.attributes.title,
    slug: result.attributes.slug,
    category: result.attributes.category.data.attributes.slug,
  }));
}
