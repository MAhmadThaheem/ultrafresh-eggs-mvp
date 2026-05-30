"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Truck, CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { updateOrderStatus } from "../actions"

type OrderStatus = "Pending" | "Manual Delivery" | "Truck A" | "Drone Queue"

interface AdminOrder {
  id: string
  orderId: string
  customer: string
  zip: string
  status: string
  createdAt: Date
}

export function AdminClient({ initialOrders }: { initialOrders: AdminOrder[] }) {
  const [toast, setToast] = useState<{ message: string, visible: boolean }>({ message: "", visible: false })

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
    }, 3000)
  }

  const handleAssign = async (id: string, newStatus: OrderStatus) => {
    const result = await updateOrderStatus(id, newStatus)
    if (result.success) {
      showToast(`Order assigned to ${newStatus}`)
    } else {
      showToast(result.error || "Failed to update status")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl relative min-h-screen">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl"
          >
            <CheckCircle2 className="h-5 w-5 text-farm" />
            <span className="font-medium text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-earth mt-2">Manage beta users and dispatch ultra-fresh deliveries.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="border-earth/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Beta Users</CardTitle>
            <Users className="h-4 w-4 text-yolk-dark" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142</div>
            <p className="text-xs text-earth/70 mt-1">+12 this week</p>
          </CardContent>
        </Card>
        <Card className="border-earth/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-yolk-dark" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{initialOrders.filter(o => o.status === "Pending").length}</div>
            <p className="text-xs text-earth/70 mt-1">Awaiting dispatch assignment</p>
          </CardContent>
        </Card>
        <Card className="border-earth/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Drone Fleet Status</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-farm"
            >
              <path d="M12 2v20" />
              <path d="m4.93 10.93 14.14 14.14" />
              <path d="M2 12h20" />
              <path d="m4.93 13.07 14.14-14.14" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-farm">Online</div>
            <p className="text-xs text-earth/70 mt-1">4/5 drones ready for deployment</p>
          </CardContent>
        </Card>
      </div>

      {/* Dispatch Queue */}
      <Card className="border-earth/10 shadow-sm">
        <CardHeader>
          <CardTitle>Drone / Truck Dispatch Queue</CardTitle>
          <CardDescription>Assign pending orders to a delivery method.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-earth/10">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Zone</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {initialOrders.map((order) => (
                  <tr key={order.id} className="border-b border-earth/5 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{order.orderId}</td>
                    <td className="p-4 align-middle">{order.customer}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline">{order.zip}</Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge 
                        variant={order.status === "Pending" ? "secondary" : "success"}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-right">
                      {order.status === "Pending" ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleAssign(order.id, "Manual Delivery")}>
                            Manual
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleAssign(order.id, "Truck A")}>
                            Truck
                          </Button>
                          <Button size="sm" onClick={() => handleAssign(order.id, "Drone Queue")}>
                            Drone
                          </Button>
                        </div>
                      ) : (
                        <span className="text-earth/60 italic text-sm">Assigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}
