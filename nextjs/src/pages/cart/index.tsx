import { CartLayout } from '@/components/layout';
import { CartItem } from '@/components/cart';
import { useCartStore } from '@/lib/store';

export default function Cart() {
  const { cartItems } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <section className="px-6 flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-36 h-36 mb-4 bg-slate-100 rounded-lg"></div>
        <h1 className="font-secondary text-heading-2xl">
          Your Shopping Cart <br /> is Empty
        </h1>
        <p className="text-body-sm-400 text-slate-600">
          Browse our products to find something you need, or check out our
          latest deals and offers.
        </p>
      </section>
    );
  }

  return (
    <section>
      <ul className="flex flex-col">
        {cartItems.map((item) => (
          <li className="shadow-stroke-b last:shadow-none" key={item.id}>
            <CartItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

Cart.PageLayout = CartLayout;
