import { Fragment } from 'react';
import { CreditCardIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';
import { Button, Modal } from '@/components/ui';
import { CartItem } from '@/components/cart';
import { useCartStore } from '@/lib/store';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartModal(props: CartModalProps) {
  const { isOpen, onClose } = props;

  const { cart } = useCartStore();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[30rem] flex flex-col"
    >
      {cart && cart.length > 0 ? (
        <Fragment>
          <div className="pt-6 flex flex-col max-h-[28.5rem] overflow-y-auto">
            {cart.map((product) => (
              <CartItem
                className="px-12 last:border-b-0"
                key={product.id}
                amount={1}
                image={product.images[0]}
                imageAlt={product.imageAlt}
                price={product.price}
                title={product.title}
              />
            ))}
          </div>
          <div className="p-12 pt-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-label-base-600 text-slate-400">TOTAL</span>
              <span className="font-secondary text-label-xl-600">$1200</span>
            </div>
            <div className="flex gap-6">
              <Button
                className="flex-1"
                text="Close"
                variant="secondary"
                onClick={onClose}
              />
              <Button
                className="flex-1"
                text="Checkout"
                icon={CreditCardIcon}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="p-12 relative flex flex-col gap-4">
          <div className="p-6 absolute top-0 right-0">
            <button type="button" onClick={onClose}>
              <XMarkIcon className="h-6" />
            </button>
          </div>
          <div className="w-36 h-36 mx-auto mb-4 bg-slate-100 rounded-lg"></div>
          <Dialog.Title className="font-secondary text-heading-2xl">
            Your Shopping Cart is Empty
          </Dialog.Title>
          <Dialog.Description className="text-body-base-400">
            Browse our products to find something you need, or check out our
            latest deals and offers.
          </Dialog.Description>
        </div>
      )}
    </Modal>
  );
}
