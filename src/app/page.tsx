"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Truck, Leaf, Egg } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { joinWaitlist } from "./actions"

export default function Home() {
  const [zip, setZip] = useState("")
  const [zipStatus, setZipStatus] = useState<"idle" | "success" | "error">("idle")
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (zip === "32801" || zip === "33101") {
      setZipStatus("success")
    } else {
      setZipStatus("error")
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg("")
    
    const formData = new FormData(e.currentTarget)
    formData.append("zip", zip)

    const result = await joinWaitlist(formData)
    
    setIsSubmitting(false)
    if (result.success) {
      setIsSubmitted(true)
    } else {
      setErrorMsg(result.error || "An error occurred")
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-yolk/10 pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full bg-yolk/20 px-3 py-1 text-sm font-medium text-yolk-dark mb-6"
          >
            <Leaf className="mr-2 h-4 w-4" />
            Join the Beta Waitlist
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-foreground"
          >
            Say goodbye to the <span className="text-earth line-through opacity-70">90-day grocery egg</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-earth/80 max-w-2xl"
          >
            Experience ultra-fresh eggs delivered straight from our family farm to your door in under 10 days.
          </motion.p>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-yolk rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-farm rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </section>

      {/* Beta Delivery Check Section */}
      <section className="w-full py-16 md:py-24 bg-white relative z-20 -mt-8 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            
            <div className="flex flex-col space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Are we in your neighborhood?</h2>
                <p className="mt-4 text-earth/80">
                  We are currently operating a closed beta in select locations to ensure the fastest delivery times.
                </p>
              </div>
              
              <Card className="border-earth/10">
                <CardContent className="pt-6">
                  <form onSubmit={handleZipCheck} className="flex flex-col gap-4">
                    <label htmlFor="zipcode" className="font-medium text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-yolk-dark" />
                      Enter your Zip Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="zipcode"
                        placeholder="e.g. 32801"
                        value={zip}
                        onChange={(e) => {
                          setZip(e.target.value)
                          setZipStatus("idle")
                        }}
                        className="flex-1"
                        required
                      />
                      <Button type="submit">Check Availability</Button>
                    </div>
                    {zipStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-farm font-medium p-3 bg-farm/10 rounded-md"
                      >
                        🎉 Great news! You are in our delivery radius. Sign up below!
                      </motion.div>
                    )}
                    {zipStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-earth font-medium p-3 bg-earth/10 rounded-md"
                      >
                        We aren&apos;t in your area yet, but join the waitlist to be notified!
                      </motion.div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Signup Form */}
            <div className="bg-yolk/5 p-8 rounded-2xl border border-yolk/20">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Join the Beta</h3>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-farm/20 text-farm rounded-full flex items-center justify-center mb-4">
                    <Truck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold">You&apos;re on the list!</h4>
                  <p className="text-earth/80">Keep an eye on your email for the next drop date.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" name="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" required />
                  </div>
                  {errorMsg && (
                    <p className="text-sm text-red-500 font-medium">{errorMsg}</p>
                  )}
                  <Button type="submit" className="w-full text-lg h-12 mt-4" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="mr-2"
                      >
                        <Egg className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      "Join Beta"
                    )}
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* The Great Eggscape Teaser */}
      <section className="w-full py-20 bg-earth text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Great Eggscape</h2>
          <p className="max-w-2xl mx-auto text-white/80 mb-12 text-lg">
            Find the golden egg in your carton and win a year of free deliveries!
          </p>
          
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            <Button size="lg" variant="default" className="shadow-xl shadow-yolk/20 text-foreground">
              <Egg className="mr-2 h-5 w-5" />
              Catch the Fresh Egg
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

