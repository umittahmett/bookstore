import { z } from "zod";

export const addressFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  addressLine2: z.string().optional(),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  zip: z.string().min(5, { message: "ZIP code must be at least 5 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
  additionalInfo: z.string().optional(),
})
