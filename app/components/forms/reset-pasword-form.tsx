import { Button } from "@components/ui/button"
import { PasswordInput } from "@components/ui/password-input"
import { useFetchAction } from "@hooks/use-global-submit"
import { useForm } from "react-hook-form"
import { resetPasswordSchema } from "@lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Input, InputProps } from "@components/ui/input"
import { ResetPasswordFormProps } from "~/types"
import clsx from "clsx"

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ className, title }) => {
  const { sendAction } = useFetchAction()
  // Form
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {}
  })

  // Submit form
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
      method: 'put',
      action: '/api/auth/reset-password',
      showAlert: true,
      alertTitle: "Are you sure?",
      alertMessage: "This action cannot be undone!"
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={clsx('space-y-4', className)}>
        {title && <h2 className="text-3xl font-bold">{title}</h2>}
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
  )
}

export default ResetPasswordForm