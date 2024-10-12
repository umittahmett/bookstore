import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunction, json } from "@remix-run/node";
import { createUser } from "@utils/customer.server";
import { db } from "@utils/db.server";
import { InputProps } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "~/components/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { PasswordInput } from "~/components/ui/password-input";
import { useFetchAction } from "~/hooks/use-global-submit";
import { registerSchema } from "~/lib/schemas";

const RegisterPage = () => {
  const { sendAction } = useFetchAction()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = () => {
    const values = form.getValues();
    const formData = new FormData();
    Object.keys(values).forEach((key: string) => {
      const value = values[key as keyof typeof values];
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    sendAction({
      formData: formData,
      method: 'post',
      action: '/auth/register',
      redirectTo: '/auth/login',
    })
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6 text-zinc-900">
      <div className="grid gap-2 text-start">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-zinc-500">
          Enter your data below to create an account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Fullname */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name"
                    type="fullName"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone"
                    type="phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={(date: Date | undefined) => field.onChange(date)}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password"
                    {...field as InputProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm Password"
                    {...field as InputProps}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500">
                  Your password must be at least 10 characters long. It should contain 1 uppercase letter, 1 lowercase letter, and a number.
                </p>
              </FormItem>
            )}
          />

          <Button className="w-full">Register</Button>
        </form>
      </Form>

      <div className="mt-4 text-start text-zinc-500 text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="underline text-zinc-900">
          Login
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;


export const action: ActionFunction = async ({ request }) => {
  const formPayload = Object.fromEntries(await request.formData())

  try {
    const data = registerSchema.parse(formPayload)

    // Check if user already exists
    const userExists = await db.collection("customers").findOne({ email: data.email })
    if (userExists) { return json({ error: "User already exists" }, { status: 401 }) }

    // Create user and cart
    const user = await createUser({ email: data.email, password: data.password, fullName: data.fullName, birthDate: data.birthDate, phone: data.phone })
    const userCart = await db.collection("carts").insertOne({ userId: user, products: [] })

    // Check if user or cart was created
    if (!user || !userCart) {
      return json({ error: "User or cart couldnt be created" }, { status: 500 })
    }

    // Update user with cart ID
    const newUser = await db.collection("customers").updateOne({ _id: user }, { $set: { cartId: userCart.insertedId } })

    // Check if user was created
    if (newUser.modifiedCount === 0) { return json({ error: "Error while creating account aa" }, { status: 500 }) }

    return json({ success: true, message: 'Account has created' })
  } catch (error) {
    return json({ error: "Error while creating account" }, { status: 500 });
  }
};