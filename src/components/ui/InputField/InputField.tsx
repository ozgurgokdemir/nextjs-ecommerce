import type { HTMLInputTypeAttribute } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type InputFieldProps = {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  size?: 'medium' | 'large';
  error?: string;
};

export default function InputField(props: InputFieldProps) {
  const { id, label, type = 'text', size = 'medium', error } = props;

  return (
    <div className="flex flex-col gap-2">
      <label
        className={clsx(
          size === 'medium' ? 'text-label-base-600' : 'text-label-xl-600'
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={clsx(
          'h-12 px-2 rounded-lg border-2 border-slate-100',
          error && 'border-red-500'
        )}
        id={id}
        type={type}
      />
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
