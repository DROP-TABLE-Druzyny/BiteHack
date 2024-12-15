import { useState } from 'react';
import Button from '@/app/ui/button';
import { AuthCodeInput } from './authCodeInput';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface VerifyFormProps {
    onSubmit: (authCode: string) => Promise<boolean>;
}

export default function VerifyForm({ onSubmit }: VerifyFormProps) {
    const [authCode, setAuthCode] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await onSubmit(authCode)
        setIsInvalid(result);
        if(result){
            setAuthCode('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16">
            <AuthCodeInput label='Wpisz kod otrzymany w wiadomości SMS' className='font-semibold w-32 text-xl' value={authCode} onChange={setAuthCode} />
            {isInvalid &&
            <div className='flex items-center justify-center mt-2'>
              <span className="flex items-center justify-center bg-sky-700 text-white rounded-full w-42 px-4 py-2 font-bold"><InformationCircleIcon className='w-4 h-4' /> Niepoprawny klucz</span>
            </div>
          }
            <Button label='Kontynuuj' className='mt-4 text-lg font-semibold' />
        </form>
    );
}