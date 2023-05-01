import type { Image } from '@/lib/types';
import { getPlaiceholder } from 'plaiceholder';

async function formatImage(image: Image): Promise<Image> {
  const { url, alternativeText } = image;

  const isProduction = process.env.NODE_ENV === 'production';

  const src = isProduction ? url : process.env.STRAPI_URL + url;

  const { img, base64 } = await getPlaiceholder(src, {
    size: 16,
    format: ['webp'],
  });

  return {
    url: img.src,
    alternativeText,
    blurDataURL: base64,
    width: img.width,
    height: img.height,
  };
}

export default formatImage;
