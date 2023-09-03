import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex items-center justify-center whitespace-nowrap rounded-lg px-6 font-primary transition disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-slate-800 text-slate-50 hover:bg-slate-700',
        secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-50',
      },
      size: {
        medium: 'h-9 gap-2 text-label-sm-500',
        large: 'h-12 gap-3 text-label-base-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'large',
    },
  }
);
