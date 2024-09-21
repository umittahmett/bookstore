import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

const LoginPage = () => {
  return (
    <form method="post" className="mx-auto grid w-[350px] gap-6 text-zinc-900">
      <div className="grid gap-2 text-start">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className=" text-zinc-500">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email" name="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="ml-auto inline-block text-zinc-900 text-sm underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input type="password" name="password" placeholder="Password" required />
        </div>
        <Button type="submit" name="actionType" value="login" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-start text-zinc-500 text-sm">
        Don&apos;t have an account?{" "}
        <a href="/auth/register" className="underline text-zinc-900">
          Sign up
        </a>
      </div>
    </form>
  );
};

export default LoginPage;
