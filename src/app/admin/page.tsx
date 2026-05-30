import { AdminClient } from "./admin-client"
import { getOrders, seedInitialOrders } from "../actions"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  await seedInitialOrders() // Seed DB if empty
  const orders = await getOrders()
  
  return <AdminClient initialOrders={orders} />
}
