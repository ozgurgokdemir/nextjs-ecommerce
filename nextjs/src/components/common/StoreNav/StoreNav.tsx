import { CategoryChip } from '@/components/store';

const categories = [
  { key: 0, label: 'Laptop', link: '/store/laptop' },
  { key: 1, label: 'Smartphone', link: '/store/smartphone' },
  { key: 2, label: 'Smartwatch', link: '/store/smartwatch' },
];

export default function StoreNav() {
  return (
    <nav
      className="container hidden h-24 items-center gap-4 sm:flex"
      role="navigation"
      aria-label="Secondary"
    >
      {categories.map(({ key, label, link }) => (
        <CategoryChip key={key} label={label} link={link} />
      ))}
    </nav>
  );
}
