import { RegisterForm } from '@/components/auth';
import { AuthLayout } from '@/components/layout';
import { GoogleAuthButton } from '@/components/ui';

export default function Login() {
  return (
    <section className="flex flex-col gap-8 px-8 py-12">
      <div className="flex flex-col gap-4">
        <h1 className="font-secondary text-heading-2xl">Create Your Account</h1>
        <p className="text-body-sm-400 text-slate-600">
          Register today to personalize your experience and start exploring
        </p>
      </div>
      <GoogleAuthButton />
      <div className="flex items-center gap-2 text-body-xs-400 text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
        or continue with
      </div>
      <RegisterForm />
    </section>
  );
}

Login.PageLayout = AuthLayout;
