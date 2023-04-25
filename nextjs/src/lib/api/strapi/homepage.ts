import type { StrapiResponse, StrapiData, Image } from '@/lib/types';
import { formatImage } from '@/lib/utils';

type StrapiImage = StrapiResponse<StrapiData<Image>>;

type StrapiHomePage = StrapiData<{
  title: string;
  subtitle: string;
  image: StrapiImage;
}>;

export async function getHomePageData() {
  try {
    const url = `${process.env.STRAPI_URL}/api/home-page?populate=*`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as StrapiResponse<StrapiHomePage>;

    if (!data?.data?.attributes) {
      throw new Error('Expected data was not found');
    }

    const { title, subtitle, image } = data.data.attributes;
    return { title, subtitle, image: formatImage(image.data.attributes) };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return { title: null, subtitle: null, image: null };
  }
}
