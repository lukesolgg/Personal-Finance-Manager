import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../components/Login'));

export default function LoginPage() {
  return <Login />;
}