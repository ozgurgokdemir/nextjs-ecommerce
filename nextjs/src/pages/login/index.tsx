import { Fragment } from 'react';
import { LoginForm } from '@/components/form';
import { AuthLayout } from '@/components/layout';
import { GoogleAuthButton } from '@/components/ui';

export default function Login() {
  return (
    <section className="px-8 py-12 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-secondary text-heading-2xl">Welcome Back!</h1>
        <p className="text-body-sm-400 text-slate-600">
          Log in to your account to continue where you left off
        </p>
      </div>
      <GoogleAuthButton />
      <div className="flex items-center gap-2 text-body-xs-400 text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
        or continue with
      </div>
      <LoginForm />
    </section>
  );
}

Login.PageLayout = AuthLayout;
