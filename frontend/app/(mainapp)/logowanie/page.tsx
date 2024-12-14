'use client'

import { useState } from 'react';
import Button from '@/app/ui/button';
import { PhoneInput } from '@/app/ui/login/phoneInput';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/app/ui/login/header';

export default function Page() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const router = useRouter()
    const params = useSearchParams();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log(phoneNumber)
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
            router.push(`/logowanie/weryfikacja${route ? `?route=${route}` : ''}`);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

  return (
    <div className="flex min-h-screen p-8 relative w-full justify-center">
      <main className="flex flex-col items-center">
        <Header text='Logowanie' backUrl='/'/>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16">
          <PhoneInput label='Podaj swój numer telefonu' className='font-semibold w-44 text-xl' value={phoneNumber} onChange={setPhoneNumber} />
          <Button label='Kontynuuj' className='mt-4 text-lg font-semibold' />
        </form>
      </main>
    </div>
  );
}