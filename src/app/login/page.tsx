import { LoginForm } from "../components/login/LoginForm";

export default async function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md shrink-0 px-4 py-6">
        <LoginForm />
      </div>
    </div>
  );
}
