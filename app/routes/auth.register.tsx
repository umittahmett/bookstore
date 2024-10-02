import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { createUser } from "@utils/customer.server";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";


export const action: ActionFunction = async ({ request }) => {
  const formPayload = Object.fromEntries(await request.formData())
  const registerSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  try {
    const data = registerSchema.parse(formPayload)
    const user = await createUser({ email: data.email, password: data.password, fullName: data.fullName });
    if (!user) {
      return json({ error: "Kullanıcı oluşturulamadı" }, { status: 401 });
    }
    return redirect("/auth/login");
  } catch (error) {
    return json({ error: "Kullanıcı oluşturulamadı" }, { status: 500 });
  }
};

const RegisterPage = () => {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const submit = useSubmit()

  // Show error toast
  useEffect(() => {
    if (actionData && !actionData.success) {
      toast.error(actionData.error)
    }
  }, [actionData])

  // Show success toast on successful submission
  useEffect(() => {
    if (navigation.state === "loading" && navigation.formData) {
      toast.success("Kullanıcı oluşturuldu")
    }
  }, [navigation.state, navigation.formData])

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit(event.currentTarget, { replace: true })
  }

  // Disable the submit button if the form is submitting
  const isSubmitting = navigation.state === "submitting"

  return (
    <form method="post" onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6 text-zinc-900">
      <div className="grid gap-2 text-start">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-zinc-500">
          Enter your data below to create an account
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text" name="fullName"
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
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Register"}
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
