import Link from 'next/link';

type CategoryChipProps = {
  label: string;
  link: string;
};

export default function CategoryChip(props: CategoryChipProps) {
  const { label, link } = props;

  return (
    <Link
      className="flex h-9 w-fit flex-row items-center rounded-lg bg-slate-100 px-4 text-label-base-500 transition-colors hover:bg-slate-50"
      href={link}
    >
      {label}
    </Link>
  );
}
