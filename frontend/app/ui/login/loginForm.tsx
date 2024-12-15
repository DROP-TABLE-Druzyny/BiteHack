import { useState } from 'react';
import Button from '@/app/ui/button';
import { PhoneInput } from '@/app/ui/login/phoneInput';

interface LoginFormProps {
  onSubmit: (phoneNumber: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(phoneNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16">
      <PhoneInput label='Podaj swój numer telefonu' className='font-semibold w-44 text-xl' value={phoneNumber} onChange={setPhoneNumber} />
      <Button label='Kontynuuj' className='mt-4 text-lg font-semibold' />
    </form>
  );
}