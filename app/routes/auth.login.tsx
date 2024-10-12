import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ActionFunction, json, redirect } from "@remix-run/node"
import { createJWT } from "@utils/auth.server"
import { tokenCookie } from "@utils/cookie"
import { validatePassword } from "@utils/customer.server"
import { InputProps } from "react-day-picker"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { PasswordInput } from "~/components/ui/password-input"
import { useFetchAction } from "~/hooks/use-global-submit"
import { loginSchema } from "~/lib/schemas"

// Server action
export const action: ActionFunction = async ({ request }) => {
  const formPayload = Object.fromEntries(await request.formData())

  try {
    const data = loginSchema.parse(formPayload)
    const user = await validatePassword(data.email, data.password);
    if (!user) {
      return json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
    }
    const token = createJWT(user);
    return json(
      { success: true, message: "Başarıyla giriş yapıldı" },
      {
        status: 200,
        headers: {
          "Set-Cookie": await tokenCookie.serialize(token),
        },
      }
    );
  } catch (error) {
    return json({ error: "Server Error", success: false }, { status: 500 })
  }
}

const LoginPage = () => {
  const { sendAction } = useFetchAction()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {}
  })

  const onSubmit = () => {
    const values = form.getValues();
    const formData = new FormData();
    Object.keys(values).forEach((key: string) => {
      const value = values[key as keyof typeof values];
      if (value !== undefined) {
        formData.append(key, value as string);
      }
    });

    sendAction({
      formData: formData,
      method: 'post',
      action: '/auth/login',
      redirectTo: '/',
    })
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6 text-zinc-900">
      <div className="grid gap-2 text-start">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-balance text-zinc-500">
          Enter your data below to sign in
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email*/}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Current Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-zinc-900 text-xs underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <PasswordInput placeholder="Password"
                    {...field as InputProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Sign in</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;