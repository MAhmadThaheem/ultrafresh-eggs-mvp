import { DashboardClient } from "./dashboard-client"
import { getCustomerOrders } from "../actions"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  // For the MVP, we just fetch Alice Johnson's orders as a mock logged-in user
  const orders = await getCustomerOrders("Alice Johnson")
  
  return <DashboardClient initialOrders={orders} />
}
