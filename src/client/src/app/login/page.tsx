import { env } from '@/env.mjs';
import { Endpoints } from '@/lib/api/endpoints';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <a href={`${env.NEXT_PUBLIC_BACKEND_URL}${Endpoints.AUTH}/google`}>Login with Google</a>
    </div>
  );
}
