import { useEffect, useState } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Label } from "@components/ui/label"
import { Switch } from "@components/ui/switch"
import { PasswordInput } from "@components/ui/password-input"
import { useFetchAction } from "~/hooks/use-global-submit"
import { useForm } from "react-hook-form"
import { passwordSchema } from "~/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserProps } from "~/types"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input, InputProps } from "../ui/input"

const ResetPasswordForm: React.FC<UserProps> = (user) => {
  const { sendAction } = useFetchAction()
  // Form
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {}
  })

  // Submit form
  const onSubmit = () => {
    console.log('form submitted');

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
      method: 'put',
      action: '/api/auth/reset-password',
      showAlert: true,
      alertTitle: "Are you sure?",
      alertMessage: "This action cannot be undone!"
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-500">Password Update</CardTitle>
      </CardHeader>
      <CardContent>
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
                      {...field as InputProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Current Password"
                      {...field as InputProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="New Password"
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

            <Button className="w-full">Update</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm