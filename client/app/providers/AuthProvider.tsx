'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!origin) {
    // You can return null or a loading spinner until origin is available
    return null;
  }

  return (
    <Auth0Provider
      domain="dev-g70hvo3dm7a3gvfv.us.auth0.com"
      clientId="QJ4fV7PXM6v9wqkBvovjII1yR6lPmnzL"
      authorizationParams={{
        redirect_uri: origin,
        audience: 'server'
      }}
    >
      {children}
    </Auth0Provider>
  );
}
