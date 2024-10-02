import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { ActionFunction, json, redirect } from "@remix-run/node"
import { Form, useActionData, useNavigation, useSubmit } from "@remix-run/react"
import { createJWT } from "@utils/auth.server"
import { tokenCookie } from "@utils/cookie"
import { validatePassword } from "@utils/customer.server"
import { useEffect } from "react"
import { toast } from "sonner"
import { z } from "zod"

// Server action
export const action: ActionFunction = async ({ request }) => {
  const formPayload = Object.fromEntries(await request.formData())
  const subscriberSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  try {
    const data = subscriberSchema.parse(formPayload)
    const user = await validatePassword(data.email, data.password);
    if (!user) {
      return json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
    }
    const token = createJWT(user);
    return redirect("/", {
      headers: {
        "Set-Cookie": await tokenCookie.serialize(token),
      },
    });
  } catch (error) {
    return json({ error: "Server Error", success: false }, { status: 500 })
  }
}

export default function LoginPage() {
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
      toast.success("Giriş başarılı")
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
    <Form method="post" onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6 text-zinc-900">
      <div className="grid gap-2 text-start">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-zinc-500">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
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
          <Input id="password" type="password" name="password" placeholder="Password" required />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>

      <div className="mt-4 text-start text-zinc-500 text-sm">
        Don&apos;t have an account?{" "}
        <a href="/auth/register" className="underline text-zinc-900">
          Sign up
        </a>
      </div>
    </Form>
  )
}