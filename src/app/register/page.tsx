import dynamic from 'next/dynamic';

const Register = dynamic(() => import('../components/Register'));

export default function RegisterPage() {
  return (
    <>
      {/* Any server-rendered content */}
      <Register />
    </>
  );
}