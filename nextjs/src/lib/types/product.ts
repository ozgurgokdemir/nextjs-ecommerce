import { Image } from '@/lib/types';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  images: Image[];
  category: string;
  slug: string;
};
