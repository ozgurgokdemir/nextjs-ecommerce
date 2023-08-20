'use client';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputField } from '@/components/ui';

const schema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is NOT valid' }),
  message: z.string().trim().min(1, { message: 'Message is required' }),
});

type Schema = z.infer<typeof schema>;

export default function ContactForm() {
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
      className="grid grid-cols-1 gap-6 bg-white sm:mx-auto sm:max-w-[37.75rem] sm:grid-cols-2 sm:rounded-lg sm:p-12 sm:shadow-lg sm:shadow-slate-400/10"
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
    >
      <div className="col-span-full flex flex-col gap-2 sm:pb-5">
        <h2 className="font-secondary text-heading-2xl">Contact us</h2>
        <p className="text-body-xs-400 text-slate-600 sm:text-body-sm-400">
          Any question or remarks? Just write us a message!
        </p>
      </div>
      <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <InputField
          id="contact-name"
          label="Name"
          type="text"
          register={register('name')}
          error={errors.name?.message}
        />
        <InputField
          id="contact-email"
          label="Email"
          type="email"
          register={register('email')}
          error={errors.email?.message}
        />
        <InputField
          className="col-span-full"
          id="contact-message"
          label="Message"
          type="textarea"
          register={register('message')}
          error={errors.message?.message}
        />
      </div>
      <Button className="sm:col-start-2" type="submit" text="Send message" />
    </form>
  );
}
