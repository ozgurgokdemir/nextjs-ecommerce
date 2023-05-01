import { Image } from '@/lib/types';

export function limitImageSize(image: Image, limit: number) {
  if (!image.width || !image.height) return {};
  const aspectRatio = image.width / image.height;

  let limitedWidth = limit;
  let limitedHeight = limit / aspectRatio;

  while (limitedWidth % 1 !== 0 || limitedHeight % 1 !== 0) {
    limitedWidth++;
    limitedHeight = limitedWidth / aspectRatio;
  }

  return { width: limitedWidth, height: limitedHeight };
}
