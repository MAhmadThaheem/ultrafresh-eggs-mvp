"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function joinWaitlist(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const zip = formData.get("zip") as string

  if (!name || !email || !phone || !zip) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    await prisma.waitlist.create({
      data: { name, email, phone, zip }
    })
    return { success: true }
  } catch (error) {
    console.error("Error joining waitlist:", error)
    return { success: false, error: "Failed to join waitlist. Email might already exist." }
  }
}

export async function getOrders() {
  try {
    // Return all orders (for Admin page)
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    })
    return orders
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export async function getCustomerOrders(customerName: string) {
  try {
    // Return orders for a specific customer (for Dashboard)
    const orders = await prisma.order.findMany({
      where: { customer: customerName },
      orderBy: { createdAt: "desc" }
    })
    return orders
  } catch (error) {
    console.error("Error fetching customer orders:", error)
    return []
  }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    })
    revalidatePath("/admin")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { success: false, error: "Failed to update status" }
  }
}

export async function seedInitialOrders() {
  // Simple seed function to get some data in the DB
  const count = await prisma.order.count()
  if (count === 0) {
    await prisma.order.createMany({
      data: [
        { orderId: "ORD-9912", customer: "Alice Johnson", zip: "32801", items: "1 Dozen Ultra-Fresh", status: "Pending" },
        { orderId: "ORD-9913", customer: "Bob Smith", zip: "33101", items: "2 Dozen Ultra-Fresh", status: "Pending" },
        { orderId: "ORD-9914", customer: "Charlie Davis", zip: "32801", items: "1 Dozen Ultra-Fresh", status: "Pending" },
        { orderId: "ORD-9915", customer: "Diana Prince", zip: "33101", items: "3 Dozen Ultra-Fresh", status: "Pending" },
      ]
    })
  }
}
