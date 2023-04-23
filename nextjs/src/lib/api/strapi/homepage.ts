import type { StrapiResponse, StrapiData, Image } from '@/lib/types';
import { formatImage } from '@/lib/utils';

type StrapiImage = StrapiResponse<StrapiData<Image>>;

type StrapiHomePage = StrapiData<{
  title: string;
  subtitle: string;
  image: StrapiImage;
}>;

export async function getHomePageData() {
  const url = `${process.env.STRAPI_URL}/api/home-page?populate=*`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiHomePage>;

  if (!data) return { title: null, subtitle: null, image: null };

  const { title, subtitle, image } = data.attributes;
  return { title, subtitle, image: formatImage(image.data.attributes) };
}
