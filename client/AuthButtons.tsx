'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { LogoutOptions } from '@auth0/auth0-react';

export function AuthButtons( {
    isMorning,
    isAuthenticated,
    loginWithRedirect,
    logout,
    label = !isAuthenticated ? "Log In" : "Log Out"
}: {
    isMorning: boolean;
    isAuthenticated: boolean;
    loginWithRedirect: () => void;
    logout: (options?: LogoutOptions) => void;
    label?: string;
}) {
  

  return (
    <div>
      <Button disabled={!isAuthenticated && label != "Log In"} onClick={() => {
        if(isAuthenticated) {
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
        else {
          loginWithRedirect();
        }
      }}
      className={`shadow-md hover:shadow-lg transition-all ${
          isMorning
            ? "bg-amber-600 hover:bg-amber-700 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}>
        {label}
      </Button>
    </div>
  );
}