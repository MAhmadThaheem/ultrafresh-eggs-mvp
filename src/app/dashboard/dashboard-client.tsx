"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Package, QrCode, MapPin } from "lucide-react"
import QRCode from "react-qr-code"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CustomerOrder {
  id: string
  orderId: string
  items: string
  status: string
  createdAt: Date
}

export function DashboardClient({ initialOrders }: { initialOrders: CustomerOrder[] }) {
  const [activeTab, setActiveTab] = useState<"orders" | "schedule" | "kiosk">("orders")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Simple mock calendar dates
  const nextDates = [
    "Mon, Oct 12",
    "Wed, Oct 14",
    "Fri, Oct 16",
    "Mon, Oct 19",
  ]

  const getRelativeDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US")
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "orders" ? "bg-yolk/20 text-yolk-dark" : "text-earth hover:bg-earth/5"
              }`}
            >
              <Package className="h-5 w-5" />
              My Orders
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "schedule" ? "bg-yolk/20 text-yolk-dark" : "text-earth hover:bg-earth/5"
              }`}
            >
              <Calendar className="h-5 w-5" />
              Schedule Delivery
            </button>
            <button
              onClick={() => setActiveTab("kiosk")}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "kiosk" ? "bg-yolk/20 text-yolk-dark" : "text-earth hover:bg-earth/5"
              }`}
            >
              <QrCode className="h-5 w-5" />
              Kiosk Pickup
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your recent farm-fresh deliveries.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b border-earth/10">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Items</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {initialOrders.map((order) => (
                            <tr key={order.id} className="border-b border-earth/5 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <td className="p-4 align-middle font-medium">{order.orderId}</td>
                              <td className="p-4 align-middle">{order.items}</td>
                              <td className="p-4 align-middle text-earth/70">{getRelativeDate(order.createdAt)}</td>
                              <td className="p-4 align-middle">
                                <Badge variant={order.status === "Pending" ? "secondary" : "success"}>
                                  {order.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "schedule" && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Next Delivery</CardTitle>
                    <CardDescription>Select a drop-off date that works best for you.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {nextDates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            selectedDate === date
                              ? "border-yolk bg-yolk/5 shadow-md shadow-yolk/10"
                              : "border-earth/10 hover:border-yolk/50 hover:bg-yolk/5"
                          }`}
                        >
                          <span className="text-sm text-earth/70 mb-1">{date.split(", ")[0]}</span>
                          <span className="font-bold text-foreground">{date.split(", ")[1]}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button disabled={!selectedDate} onClick={() => alert("Delivery Scheduled!")}>
                        Confirm Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "kiosk" && (
              <motion.div
                key="kiosk"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-2 border-farm/20 shadow-xl shadow-farm/5">
                  <div className="bg-farm text-white p-6 text-center flex flex-col items-center">
                    <MapPin className="h-8 w-8 mb-2 opacity-80" />
                    <h3 className="text-2xl font-bold">Smart Locker Pickup</h3>
                    <p className="opacity-90">123 Fresh Ave, Orlando, FL</p>
                  </div>
                  <CardContent className="pt-10 pb-12 flex flex-col items-center text-center">
                    <div className="bg-white p-4 rounded-2xl shadow-lg mb-6 border border-earth/10">
                      <QRCode
                        value={initialOrders.length > 0 ? `${initialOrders[0].orderId}-PICKUP-TOKEN` : "NO-ORDERS"}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#1a1512"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Order {initialOrders.length > 0 ? initialOrders[0].orderId : "N/A"} is Ready!</h4>
                    <p className="text-earth max-w-sm">
                      Scan this QR code at the smart locker scanner to retrieve your ultra-fresh eggs.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

      </div>
    </div>
  )
}
