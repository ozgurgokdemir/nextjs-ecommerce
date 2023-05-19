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
        'flex select-none items-center gap-4 rounded-lg p-4 shadow-stroke-2',
        'sm:shadow-md sm:shadow-slate-400/10 xl:w-[18.125rem]',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-6 text-slate-400" />
      </div>
      <div>
        <h5 className="text-label-xl-500">{title}</h5>
        <p className="text-body-sm-400 text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}
