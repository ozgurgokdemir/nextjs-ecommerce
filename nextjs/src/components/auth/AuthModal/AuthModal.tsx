'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';
import { Modal } from '@/components/ui';
import { LoginForm, RegisterForm, GoogleAuthButton } from '@/components/auth';

const variants = {
  enter: (direction: number) => ({ x: `${direction * 100}%`, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: `${-direction * 100}%`, opacity: 0 }),
};

export default function AuthModal() {
  const prefersReducedMotion = useReducedMotion();

  const searchParams = useSearchParams();

  const authParam = searchParams.get('auth');

  const direction = authParam === 'login' ? 1 : -1;

  const pathname = usePathname();

  const router = useRouter();

  const handleClose = () => router.push(pathname);

  return (
    <Modal
      isOpen={authParam === 'login' || authParam === 'register'}
      onClose={handleClose}
      className="relative flex w-full max-w-[30rem] flex-col overflow-hidden"
    >
      <div className="flex justify-end p-6">
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="h-6" />
        </button>
      </div>
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {authParam === 'login' ? (
          <motion.div
            className="flex flex-col gap-8 bg-white p-12 pt-0"
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
            <LoginForm withParams />
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col gap-8 bg-white p-12 pt-0"
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
            <RegisterForm withParams />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
