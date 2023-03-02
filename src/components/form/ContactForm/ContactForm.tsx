import { Button, InputField } from '@/components/ui';

export default function ContactForm() {
  return (
    <form className="grid grid-cols-1 gap-6 bg-white sm:max-w-[37.75rem] sm:mx-auto sm:p-12 sm:rounded-lg sm:grid-cols-2 sm:shadow-lg sm:shadow-slate-400/10">
      <div className="col-span-full flex flex-col gap-2 sm:pb-5">
        <h2 className="font-secondary text-heading-2xl">Contact us</h2>
        <p className="text-body-xs-400 text-slate-600 sm:text-body-sm-400">
          Any question or remarks? Just write us a message!
        </p>
      </div>
      <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <InputField id="name" label="Name" type="text" />
        <InputField id="email" label="Email" type="email" />
        <InputField
          className="col-span-full"
          id="message"
          label="Message"
          type="textarea"
        />
      </div>
      <Button className="sm:col-start-2" type="submit" text="Send message" />
    </form>
  );
}
