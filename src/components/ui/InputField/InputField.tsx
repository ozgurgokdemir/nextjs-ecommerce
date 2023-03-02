import type { HTMLInputTypeAttribute } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type InputFieldProps = {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute | 'textarea';
  size?: 'medium' | 'large';
  error?: string;
  className?: string;
};

export default function InputField(props: InputFieldProps) {
  const {
    id,
    label,
    register,
    type = 'text',
    size = 'medium',
    error,
    className,
  } = props;

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label
        className={clsx(
          size === 'medium' ? 'text-label-base-600' : 'text-label-xl-600'
        )}
        htmlFor={id}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={clsx(
            'min-h-[3rem] max-h-96 px-4 py-2.5 rounded-lg resize-none sm:resize-y border-2 border-slate-100 text-body-base-500',
            error && 'border-red-500'
          )}
          id={id}
          rows={4}
          {...register}
        />
      ) : (
        <input
          className={clsx(
            'h-12 px-4 rounded-lg border-2 border-slate-100 text-body-base-500',
            error && 'border-red-500'
          )}
          id={id}
          type={type}
          {...register}
        />
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-500">
          <ExclamationCircleIcon
            className={clsx(size === 'medium' ? 'h-4' : 'h-5')}
          />
          <p
            className={clsx(
              size === 'medium' ? 'text-label-sm-500' : 'text-label-base-500'
            )}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
