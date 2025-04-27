'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

export function AuthButtons( {isMorning}: {isMorning: boolean}) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

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