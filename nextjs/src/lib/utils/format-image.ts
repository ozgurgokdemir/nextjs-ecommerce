import { Image } from '@/lib/types';

export const formatImage = ({ url, alternativeText }: Image) => {
  if (process.env.NODE_ENV === 'production') return { url, alternativeText };
  return { url: process.env.STRAPI_URL + url, alternativeText };
};
