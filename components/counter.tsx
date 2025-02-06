"use client"

import { useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Counter() {
  const [count, setCount] = useState(0)

  const props = useSpring({
    from: { number: 0 },
    to: { number: count },
    config: { tension: 280, friction: 60 },
  })

  return (
    <Card className="w-full max-w-xl h-full mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <animated.div className="text-4xl font-bold">{props.number.to((n) => n.toFixed(0))}</animated.div>
        <div className="flex gap-2">
          <Button onClick={() => setCount(count - 1)}>-</Button>
          <Button variant="outline" onClick={() => setCount(0)}>
            Reset
          </Button>
          <Button onClick={() => setCount(count + 1)}>+</Button>
        </div>
      </CardContent>
    </Card>
  )
}

