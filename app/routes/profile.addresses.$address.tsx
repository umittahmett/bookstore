import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { useLoaderData, useParams } from "@remix-run/react"
import { LoaderFunction, json } from "@remix-run/node"
import { db } from "@utils/db.server"
import { ObjectId } from "mongodb"
import { addressFormSchema } from '~/lib/schemas'
import { useFetchAction } from '@hooks/use-global-submit'

export default function AddressForm() {
  const { address } = useLoaderData<typeof loader>()
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
    formData.append('addressId', address._id)
    Object.keys(values).forEach((key: string) => {
      const value = values[key as keyof typeof values];
      if (value !== undefined) {
        formData.append(key, value as string);
      }
    });
    if (params.address === 'new') {
      sendAction({
        formData: formData,
        method: 'post',
        action: '/api/address/add',
        redirectTo: '/profile/addresses'
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
    formData.append('addressId', address._id);
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
            params.address !== 'new' &&
            <Button onClick={onDelete} variant='outline' type="button">
              Delete
            </Button>
          }
          <Button type="submit">
            {params.address === 'new' ? 'Add Address' : 'Update Address'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

// Loader function
export const loader: LoaderFunction = async ({ params }) => {
  const addressId = params.address
  const address = addressId !== 'new' && await db.collection('addresses').findOne({ _id: new ObjectId(addressId as string) })
  if (!address && addressId != 'new') { return json({ error: 'Address not found' }, { status: 404 }) }
  return json({ address })
}