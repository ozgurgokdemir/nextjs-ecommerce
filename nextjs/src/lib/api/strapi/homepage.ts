import type { ApiHomePageHomePage } from '../../../../../strapi/schemas';

type StrapiResponse<T> = { data: T };
type StrapiData<T> = { id: number; attributes: T };
type StrapiImage = StrapiResponse<
  StrapiData<{ url: string; alternativeText: string }>
>;

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://127.0.0.1:1337';
const STRAPI_API = STRAPI_URL + '/api';

export async function getHomePageData() {
  const response = await fetch(`${STRAPI_API}/home-page?populate=*`);
  const { data } = (await response.json()) as StrapiResponse<
    StrapiData<ApiHomePageHomePage['attributes'] & { image: StrapiImage }>
  >;
  const { title, subtitle, image } = data.attributes;
  const { url, alternativeText } = image.data.attributes;
  return { title, subtitle, image: { url: STRAPI_URL + url, alternativeText } };
}
