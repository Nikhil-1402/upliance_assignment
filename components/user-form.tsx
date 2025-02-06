"use client"

import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserData } from "../types"

export default function UserForm() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    address: "",
    email: "",
    phone: "",
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("userData")
    if (savedData) {
      setUserData(JSON.parse(savedData))
    }
  }, [])

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData))
  }, [userData])

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  })

  const generateRandomUser = () => {
    const randomId = Math.floor(Math.random() * 1000)
    setUserData({
      name: `User ${randomId}`,
      address: `${randomId} Main St`,
      email: `user${randomId}@example.com`,
      phone: `555-${String(randomId).padStart(4, "0")}`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save to localStorage handled by useEffect
  }

  return (
    <animated.div style={formAnimation}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <Input
                placeholder="Address"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={generateRandomUser}>
                Auto Generate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </animated.div>
  )
}

