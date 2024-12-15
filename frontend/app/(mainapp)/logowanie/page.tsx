'use client'

import { Suspense, useState } from 'react';
import Header from '@/app/ui/login/header';
import { clientService } from '@/services';
import LoginForm from '@/app/ui/login/loginForm';
import VerifyForm from '@/app/ui/login/verifyForm';

export default function Page() {
  const client = clientService;
  const [phoneNum, setPhoneNumber] = useState('');
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLoginSubmit = async (phoneNumber: string) => {
    try {
      setPhoneNumber(phoneNumber);
      await client.generateRandomCode(phoneNumber);
      setIsTransitioning(true);
      setTimeout(() => {
        setShowVerifyForm(true);
        setIsTransitioning(false);
      }, 200); // Match the duration of the transition
    } catch (error) {
      console.log(error)
    }
  };

  const handleVerifySubmit = async (authCode: string) => {
    try {
      const response = await client.login(phoneNum, authCode);
      const token = response.access_token;
      localStorage.setItem('access_token', token);
      return false
    } catch (error) {
      console.log(error);
      return true
    }
  };

  return (
    <div className="flex min-h-screen p-8 relative w-full justify-center">
      <main className="flex flex-col items-center">
        <Header text='Logowanie' backUrl='/' />
        <div className={`transition-opacity duration-300 ${!showVerifyForm && !isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
          {!showVerifyForm && <LoginForm onSubmit={handleLoginSubmit} />}
        </div>
        <Suspense>
          <div className={`w-full transition-opacity duration-300 ${showVerifyForm && !isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
            {showVerifyForm && !isTransitioning && <VerifyForm onSubmit={handleVerifySubmit} />}
          </div>
        </Suspense>
      </main>
    </div>
  );
}