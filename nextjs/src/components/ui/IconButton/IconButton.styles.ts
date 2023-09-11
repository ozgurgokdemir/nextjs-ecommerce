import { cva } from 'class-variance-authority';
import { twMerge } from '@/lib/utils/tailwind-merge';

const iconButtonVariants = cva(
  'flex items-center justify-center transition disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
        secondary: 'bg-slate-100 text-slate-400 hover:bg-slate-50',
      },
      size: {
        small: 'h-6 w-6 rounded-md',
        medium: 'h-9 w-9 rounded-lg',
        large: 'h-12 w-12 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'medium',
    },
  }
);

export const iconButtonStyles: typeof iconButtonVariants = (variants) => {
  return twMerge(iconButtonVariants(variants));
};
