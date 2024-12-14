'use client'

import Button from '@/app/ui/button';
import { AuthCodeInput } from '@/app/ui/login/authCodeInput';
import Header from '@/app/ui/login/header';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
        const [authCode, setAuthCode] = useState('')
        const router = useRouter()
        const params = useSearchParams();
        const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            try {
                // const response = await fetch('https://api.example.com/login', {
                //   method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify({ phoneNumber }),
                // });
                // if (response.ok) {
                //     console.log('Form submitted successfully:', response);
                //     redirect("/logowanie/veryfikacja");
                // } else {
                //   console.error('Failed to submit form:', response);
                // }
                const route = params.get('route');

                router.push(`/${route ? `${route}` : ''}`);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
  return (
    <div className="flex min-h-screen p-8 relative w-full justify-center">
      <main className="flex flex-col items-center">
        <Header text='Potwierdzenie' backUrl='/logowanie'/>
        <form onSubmit={handleSubmit} method="post" className="flex flex-col items-center mt-16">
            <AuthCodeInput label='Wpisz kod otrzymany w wiadomości SMS' className='font-semibold w-32 text-xl' value={authCode} onChange={setAuthCode} />
          <Button label='Kontynuuj' className='mt-4 text-lg font-semibold'/>
        </form>
      </main>
    </div>
  );
}