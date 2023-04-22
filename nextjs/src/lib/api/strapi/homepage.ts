type StrapiResponse<T> = { data: T };
type StrapiData<T> = { id: number; attributes: T };
type StrapiImage = StrapiResponse<
  StrapiData<{ url: string; alternativeText: string }>
>;
type StrapiHomePage = StrapiData<{
  title: string;
  subtitle: string;
  image: StrapiImage;
}>;

const isProduction = process.env.NODE_ENV === 'production';
const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API = STRAPI_URL + '/api';

export async function getHomePageData() {
  const response = await fetch(`${STRAPI_API}/home-page?populate=*`);
  const { data } = (await response.json()) as StrapiResponse<StrapiHomePage>;

  if (!data)
    return { title: '', subtitle: '', image: { url: '', alternativeText: '' } };

  const { title, subtitle, image } = data.attributes;
  const { url, alternativeText } = image.data.attributes;
  return {
    title,
    subtitle,
    image: { url: (isProduction ? '' : STRAPI_URL) + url, alternativeText },
  };
}
