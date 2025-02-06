"use client";

import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserData } from "../types";

export default function UserForm() {
  const [userData, setUserData] = useState<UserData>({
    id: "", 
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isDirty, setIsDirty] = useState(false); 


  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);


  useEffect(() => {
    if (isDirty) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData, isDirty]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  const generateRandomUser = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setUserData({
      id: `USER-${randomId}`, 
      name: `User ${randomId}`,
      address: `${randomId} Main St`,
      email: `user${randomId}@example.com`,
      phone: `555-${String(randomId).padStart(4, "0")}`,
    });
    setIsDirty(true);
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.id) {
      setUserData((prev) => ({
        ...prev,
        id: `USER-${Math.floor(Math.random() * 1000)}`,
      }));
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsDirty(false); 
    alert("User data saved successfully!");
  };

  return (
    <animated.div style={formAnimation}>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="User ID" value={userData.id} disabled />
              <Input
                placeholder="Name"
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                placeholder="Address"
                value={userData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={userData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
                onClick={generateRandomUser}
              >
                Auto Generate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </animated.div>
  );
}
