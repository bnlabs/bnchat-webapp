import React from 'react';
import { getConnection } from './SignalRManager';

const SignalRContext = React.createContext(null);

export function SignalRProvider({ children }) {
  const connection = getConnection();

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
}

export default SignalRContext;
