import { useEffect, useState } from 'react';
import { onAuthStateChange } from '@/firebase/auth';
import { USER_STATES } from '@/constants/api_states';

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOW);

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);

  return {
    data: user,
    isAuthenticated: !!(user && user.uid),
    isUnknow: user === USER_STATES.NOT_KNOW,
  };
}
