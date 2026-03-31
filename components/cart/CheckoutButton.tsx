"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface Props {
  disabled?: boolean;
  fullWidth?: boolean;
}

export function CheckoutButton({ disabled, fullWidth }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;

  const handleCheckoutClick = async () => {
    if (disabled || isLoading || !isVerified) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/checkout');
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerify = (token: string) => {
    
    setIsVerified(true);
  };

  const onError = (err: unknown) => {
    console.error('hCaptcha error:', err);
    setIsVerified(false);
  };

 

  return (
    <>
      <Button
        fullWidth={fullWidth}
        disabled={disabled || isLoading || !isVerified}
        onClick={handleCheckoutClick}
        className={`transition duration-300 ease-in-out ${
          (disabled || isLoading || !isVerified)
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Loading...' : 'Checkout'}
      </Button>

      {siteKey ? (
        <HCaptcha
          sitekey={siteKey}
          onVerify={onVerify}
          onError={onError}
        />
      ) : (
        <p>Missing hCaptcha site key</p>
      )}
    </>
  );
}