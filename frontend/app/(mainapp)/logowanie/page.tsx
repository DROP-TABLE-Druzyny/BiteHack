'use client'

import { useState } from 'react';
import Button from '@/app/ui/button';
import { PhoneInput } from '@/app/ui/login/phoneInput';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/app/ui/login/header';
import { clientService } from '@/services';
import LoginForm from '@/app/ui/login/loginForm';
import VerifyForm from '@/app/ui/login/verifyForm';

export default function Page() {
    const router = useRouter();
    const params = useSearchParams();
    const client = clientService;
    const route = params.get('route');
    const [phoneNum, setPhoneNumber] = useState('');

    const handleLoginSubmit = async (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
        const response = await client.generateRandomCode(phoneNumber);
    };

    const handleVerifySubmit = async (authCode: string) => {
        const response = await client.login(phoneNum, authCode);
        //router.push(`/logowanie/weryfikacja${route ? `?route=${route}` : ''}`);
    };

    return (
        <div className="flex min-h-screen p-8 relative w-full justify-center">
            <main className="flex flex-col items-center">
                <Header text='Logowanie' backUrl='/'/>
                <LoginForm onSubmit={handleLoginSubmit}/>
                <VerifyForm onSubmit={handleVerifySubmit} />
            </main>
        </div>
    );
}