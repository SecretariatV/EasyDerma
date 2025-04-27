'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { LogoutOptions } from '@auth0/auth0-react';

export function AuthButtons( {
    isMorning,
    isAuthenticated,
    loginWithRedirect,
    logout
}: {
    isMorning: boolean;
    isAuthenticated: boolean;
    loginWithRedirect: () => void;
    logout: (options?: LogoutOptions) => void
}) {
  

  return (
    <div>
      {!isAuthenticated ? (
        <Button onClick={() => loginWithRedirect()}
        className={`shadow-md hover:shadow-lg transition-all ${
            isMorning
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}>
          Log In
        </Button>
      ) : (
        <Button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className={`shadow-md hover:shadow-lg transition-all ${
            isMorning
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          Log Out
        </Button>
      )}
    </div>
  );
}