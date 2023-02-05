import { ReactNode } from 'react';

type ButtonProps = {
  text: string;
  size?: 'medium' | 'large';
  type?: 'primary' | 'secondary';
  icon?: ReactNode;
};

export default function Button(props: ButtonProps) {
  const { text, size, type, icon } = props;

  return (
    <button
      className={`flex items-center justify-center px-6 gap-2 rounded-lg font-medium ${
        size === 'medium' ? 'h-9 text-sm' : 'h-12 text-base'
      } ${
        type === 'secondary'
          ? 'text-slate-800 bg-slate-100 hover:bg-slate-50'
          : 'text-slate-50 bg-slate-800 hover:bg-slate-700'
      }`}
    >
      {text}
      {icon}
    </button>
  );
}
