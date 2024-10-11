import { useEffect } from "react";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { UserProps } from "~/types";
import { useFetchAction } from "@hooks/use-global-submit";
import { membershipSchema } from "@lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DatePicker } from "@components/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";

const MembershipForm: React.FC<UserProps> = (user) => {
  const { sendAction } = useFetchAction()
  // Form
  const form = useForm<z.infer<typeof membershipSchema>>({
    resolver: zodResolver(membershipSchema),
    defaultValues: user || {}
  })

  // Reset form when user data changes
  useEffect(() => {
    if (user) { form.reset(user) }
  }, [user, form])

  // Submit form
  const onSubmit = () => {
    const values = form.getValues();
    const formData = new FormData();
    formData.append('userId', user._id.toString())
    Object.keys(values).forEach((key: string) => {
      const value = values[key as keyof typeof values];
      if (value !== undefined) {
        formData.append(key, value as string);
      }
    });

    sendAction({
      formData: formData,
      method: 'put',
      action: '/api/address/update',
      showAlert: true,
      alertTitle: "Are you sure?",
      alertMessage: "Do you want to update this data?"
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-500">Üyelik Bilgilerim</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-6 grid grid-cols-1">
            {/* Fullname */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                    <Input type="phone" placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Birthday */}
            <FormField
              control={form.control}
              name="birthDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birt Day</FormLabel>
                  <FormControl>
                    <DatePicker
                    // date={field.value}
                    // onDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">Güncelle</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default MembershipForm
