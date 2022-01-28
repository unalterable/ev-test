import { z, ZodError } from 'zod'

export const clientsSchema = z.array(z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  company: z.string(),
  createdAt: z.string(),
}))

export const parseAsClients = (payload: any) => clientsSchema.parse(payload)

export type Clients = z.infer<typeof clientsSchema>