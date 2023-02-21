import Link from 'next/link';

type CategoryChipProps = {
  label: string;
  link: string;
};

export default function CategoryChip(props: CategoryChipProps) {
  const { label, link } = props;

  return (
    <Link
      className="w-fit h-9 px-4 rounded-lg flex flex-row items-center text-label-base-500 bg-slate-100"
      href={link}
    >
      {label}
    </Link>
  );
}
