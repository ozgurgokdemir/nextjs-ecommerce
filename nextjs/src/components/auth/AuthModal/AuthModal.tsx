import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';
import { GoogleAuthButton, Modal } from '@/components/ui';
import { LoginForm } from '@/components/form';
import { useUIStore } from '@/lib/store';

export default function LoginModal() {
  const { isAuthModalOpen, closeAuthModal, page, openRegister } = useUIStore();

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      className="w-full max-w-[30rem] flex flex-col"
    >
      <div className="p-6 flex justify-end">
        <button type="button" onClick={closeAuthModal}>
          <XMarkIcon className="h-6" />
        </button>
      </div>
      {page === 'login' && (
        <div className="p-12 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Dialog.Title className="font-secondary text-heading-2xl">
              Welcome Back!
            </Dialog.Title>
            <Dialog.Description className="text-body-sm-400 text-slate-600">
              Log in to your account to continue where you left off
            </Dialog.Description>
          </div>
          <GoogleAuthButton />
          <div className="flex items-center gap-2 text-body-xs-400 text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
            or continue with
          </div>
          <LoginForm onSignUp={openRegister} />
        </div>
      )}
    </Modal>
  );
}
