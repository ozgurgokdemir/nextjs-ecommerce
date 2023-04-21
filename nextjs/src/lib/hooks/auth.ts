import { useSession, signIn, signOut } from 'next-auth/react';

export default function useAuth() {
  const { data: session, status, update } = useSession();

  const logInWithGoogle = () => void signIn('google');

  const logOut = () => void signOut();

  return { session, status, update, logInWithGoogle, logOut };
}
