import type { SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField, Button } from '@/components/ui';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is NOT valid' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 digits' }),
});

type Schema = z.infer<typeof schema>;

type RegisterFormProps = {
  onLogIn?: () => void;
};

export default function RegisterForm({ onLogIn }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
    >
      <div className="flex flex-col gap-4">
        <InputField
          id="email"
          label="Email"
          type="email"
          register={register('email')}
          error={errors.email?.message}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          register={register('password')}
          error={errors.password?.message}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-body-xs-400 text-slate-600">
          By continuing you accept our standard{' '}
          <Link className="text-body-xs-500 text-slate-800" href="">
            Terms and Conditions
          </Link>{' '}
          and our{' '}
          <Link className="text-body-xs-500 text-slate-800" href="">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" text="Sign Up" />
        <p className="text-body-xs-400 text-slate-600">
          Already have an account?{' '}
          {onLogIn ? (
            <button
              className="text-body-xs-500 text-slate-800"
              type="button"
              onClick={onLogIn}
            >
              Log In
            </button>
          ) : (
            <Link className="text-body-xs-500 text-slate-800" href="/register">
              Log In
            </Link>
          )}
        </p>
      </div>
    </form>
  );
}
