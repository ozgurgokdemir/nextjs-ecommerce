import type { StrapiResponse, StrapiData, Image } from '@/lib/types';
import formatImage from '@/lib/utils/format-image';

type StrapiImage = StrapiResponse<StrapiData<Image>>;

type StrapiCategory = StrapiResponse<
  StrapiData<{ title: string; slug: string; image: StrapiImage }>[]
>;

export async function getCategories() {
  const url = `${process.env.STRAPI_URL}/api/categories?populate=*`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const { data } = (await response.json()) as StrapiCategory;

  if (!data) return null;

  return await Promise.all(
    data.map(async ({ id, attributes }) => ({
      id: id,
      title: attributes.title,
      image: await formatImage(attributes.image.data.attributes),
      slug: attributes.slug,
    }))
  );
}
