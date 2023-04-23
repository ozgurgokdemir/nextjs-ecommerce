import type { ComponentType, SVGProps } from 'react';
import { clsx } from 'clsx';

type InfoCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  className?: string;
};

export default function InfoCard(props: InfoCardProps) {
  const { icon: Icon, title, subtitle, className } = props;

  return (
    <div
      className={clsx(
        'rounded-lg flex items-center gap-4 p-4 shadow-stroke-2 select-none',
        'sm:shadow-md sm:shadow-slate-400/10 xl:w-[18.125rem]',
        className
      )}
    >
      <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-slate-100">
        <Icon className="h-6 text-slate-400" />
      </div>
      <div>
        <h5 className="text-label-xl-500">{title}</h5>
        <p className="text-body-sm-400 text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}
