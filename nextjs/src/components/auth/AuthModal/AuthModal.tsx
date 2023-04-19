import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { GoogleAuthButton, Modal } from '@/components/ui';
import { LoginForm, RegisterForm } from '@/components/auth';
import { useUIStore } from '@/lib/store';

const variants = {
  enter: (direction: number) => ({ x: `${direction * 100}%`, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: `${-direction * 100}%`, opacity: 0 }),
};

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, page, openRegister, openLogin } =
    useUIStore();

  const prefersReducedMotion = useReducedMotion();

  const direction = page === 'login' ? 1 : -1;

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      className="w-full max-w-[30rem] relative overflow-hidden flex flex-col"
    >
      <div className="p-6 flex justify-end">
        <button type="button" onClick={closeAuthModal}>
          <XMarkIcon className="h-6" />
        </button>
      </div>
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {page === 'login' ? (
          <motion.div
            className="p-12 pt-0 flex flex-col gap-8 bg-white"
            key="login"
            variants={prefersReducedMotion ? undefined : variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
          >
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
          </motion.div>
        ) : (
          <motion.div
            className="p-12 pt-0 flex flex-col gap-8 bg-white"
            key="register"
            variants={prefersReducedMotion ? undefined : variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="flex flex-col gap-4">
              <Dialog.Title className="font-secondary text-heading-2xl">
                Create Your Account
              </Dialog.Title>
              <Dialog.Description className="text-body-sm-400 text-slate-600">
                Register today to personalize your experience and start
                exploring
              </Dialog.Description>
            </div>
            <GoogleAuthButton />
            <div className="flex items-center gap-2 text-body-xs-400 text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
              or continue with
            </div>
            <RegisterForm onLogIn={openLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
