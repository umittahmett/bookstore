import * as z from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { redirect, useParams } from "@remix-run/react"
import { addressFormSchema } from '~/lib/schemas'
import { useFetchAction } from '@hooks/use-global-submit'
import { AddressDetailFormProps, AddressProps } from '~/types'

const AddressDetailForm: React.FC<AddressDetailFormProps> = ({ address, action, redirectTo, successFunction }) => {
  const params = useParams()
  const { sendAction } = useFetchAction()

  // Form
  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: address || {}
  })

  // Reset form when address changes
  useEffect(() => {
    if (address) { form.reset(address) }
  }, [address, form])


  // Submit form
  const onSubmit = () => {
    const values = form.getValues();
    const formData = new FormData();
    address && formData.append('addressId', address._id.toString())
    Object.keys(values).forEach((key: string) => {
      const value = values[key as keyof typeof values];
      if (value !== undefined) {
        formData.append(key, value as string);
      }
    });
    if (action == 'add' || params.address === 'new') {
      sendAction({
        formData: formData,
        method: 'post',
        action: '/api/address/add',
        redirectTo: redirectTo || '/profile/addresses',
        successFunction: successFunction
      })
    }
    else {
      sendAction({
        formData: formData,
        method: 'put',
        action: '/api/address/update',
        redirectTo: '/profile/addresses',
        showAlert: true,
        alertTitle: "Are you sure?",
        alertMessage: "Do you want to update this address?"
      })
    }
  }

  // Delete address
  const onDelete = () => {
    const formData = new FormData();
    address && formData.append('addressId', address._id.toString());
    sendAction({
      formData: formData,
      method: 'delete',
      action: '/api/address/delete',
      redirectTo: '/profile/addresses',
      showAlert: true,
      alertTitle: 'Are you sure?',
      alertMessage: 'This action cannot be undone!'
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-6 grid grid-cols-2">
        <FormField
          control={form.control}
          name="name"
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
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Address Line 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP Code</FormLabel>
              <FormControl>
                <Input placeholder="ZIP Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Info</FormLabel>
              <FormControl>
                <Input placeholder="Additional Info" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-2.5 w-fit ml-auto col-span-2'>
          {
            params.address !== 'new' && action !== 'add' &&
            <Button onClick={onDelete} variant='outline' type="button">
              Delete
            </Button>
          }
          <Button type="submit">
            {action == 'add' || params.address === 'new' ? 'Add Address' : 'Update Address'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default AddressDetailForm