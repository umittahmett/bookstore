import { useLoaderData } from "@remix-run/react"
import { LoaderFunction, json } from "@remix-run/node"
import { connectToDatabase } from "@utils/db.server"
import { ObjectId } from "mongodb"
import AddressDetailForm from '@components/forms/address-detail-form'

export default function AddressForm() {
  const { address } = useLoaderData<typeof loader>()
  return (
    <AddressDetailForm address={address} />
  )
}

// Loader function
export const loader: LoaderFunction = async ({ params }) => {
  const addressId = params.address
  const { db } = await connectToDatabase()
  const address = addressId !== 'new' && await db.collection('addresses').findOne({ _id: new ObjectId(addressId as string) })
  if (!address && addressId != 'new') { return json({ error: 'Address not found' }, { status: 404 }) }
  return json({ address })
}