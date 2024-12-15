import { useState } from 'react';
import Button from '@/app/ui/button';
import { AuthCodeInput } from './authCodeInput';

interface VerifyFormProps {
  onSubmit: (authCode: string) => void;
}

export default function VerifyForm({ onSubmit }: VerifyFormProps) {
  const [authCode, setAuthCode] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(authCode);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16">
        <AuthCodeInput label='Wpisz kod otrzymany w wiadomości SMS' className='font-semibold w-32 text-xl' value={authCode} onChange={setAuthCode} />
        <Button label='Kontynuuj' className='mt-4 text-lg font-semibold'/>
    </form>
  );
}