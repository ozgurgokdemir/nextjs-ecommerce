import { LoginForm } from '@/components/form';
import { AuthLayout } from '@/components/layout';

export default function Login() {
  return <LoginForm />;
}

Login.PageLayout = AuthLayout;
