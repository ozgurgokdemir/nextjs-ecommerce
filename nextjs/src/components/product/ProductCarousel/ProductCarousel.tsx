'use client';
import type { Image as ImageType } from '@/lib/types';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { limitImageSize } from '@/lib/utils';

type Props = { images: ImageType[] };

export default function ProductCarousel({ images }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState<number>(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const { offsetWidth } = carouselRef.current ?? {};
    if (offsetWidth) setCarouselWidth(offsetWidth);
  }, []);

  function handleSwipe(swipeDistance: number) {
    const swipeThreshold = carouselWidth / 4;
    if (Math.abs(swipeDistance) < swipeThreshold) return;

    const direction = swipeDistance > 0 ? -1 : 1;
    const nextIndex = currentImageIndex + direction;

    if (nextIndex < 0 || nextIndex > images.length - 1) return;
    setCurrentImageIndex(nextIndex);
  }

  return (
    <div className="flex max-w-[37rem] flex-1 flex-col gap-4">
      <motion.div className="aspect-4/3 overflow-hidden rounded-lg">
        <motion.div
          ref={carouselRef}
          className="flex h-full w-full cursor-grab"
          animate={{ x: `-${currentImageIndex * 100}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          drag="x"
          dragConstraints={{
            left: -currentImageIndex * carouselWidth,
            right: -currentImageIndex * carouselWidth,
          }}
          dragMomentum={false}
          whileTap={{ cursor: 'grabbing' }}
          onDragEnd={(_, { offset }) => handleSwipe(offset.x)}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="min-h-full min-w-full overflow-hidden first:rounded-l-lg last:rounded-r-lg"
            >
              <Image
                className="h-full w-full object-cover"
                src={image.url}
                alt={image.alternativeText}
                {...limitImageSize(image, 592)}
                blurDataURL={image.blurDataURL}
                placeholder="blur"
                priority={true}
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={clsx(
              'aspect-4/3 overflow-hidden rounded-lg transition-opacity duration-300',
              index !== currentImageIndex && 'opacity-50'
            )}
            type="button"
            onClick={setCurrentImageIndex.bind(null, index)}
          >
            <Image
              className="h-full w-full object-cover"
              src={image.url}
              alt={`Image ${index + 1}`}
              {...limitImageSize(image, 592)}
              blurDataURL={image.blurDataURL}
              placeholder="blur"
              priority={true}
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
