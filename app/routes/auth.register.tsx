import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";


const RegisterPage = () => {
  return (
    <form method="post" className="mx-auto grid w-[350px] gap-6 text-zinc-900">
      <div className="grid gap-2 text-start">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-zinc-500">
          Enter your data below to create an account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="name" name="name"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email" name="email"
            placeholder="lorem@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input type="confirm-password" name="confirm-password" placeholder="Confirm Password" required />
        </div>
        <Button type="submit" name="actionType" value="register" className="w-full">
          Register
        </Button>
      </div>
      <div className="mt-4 text-start text-zinc-500 text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="underline text-zinc-900">
          Login
        </a>
      </div>
    </form>
  );
};

export default RegisterPage;
