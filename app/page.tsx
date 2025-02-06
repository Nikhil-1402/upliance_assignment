"use client";

import { useSpring, animated } from "@react-spring/web";
import Counter from "@/components/counter";
import UserForm from "@/components/user-form";
import RichTextEditor from "@/components/RichTextEditor";

export default function Home() {
  const pageAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Interactive Form App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto w-full">
        <div className="col-span-1">
          <Counter />
        </div>
        <div className="col-span-1">
          <RichTextEditor />
        </div>
        <div className="col-span-1">
          <UserForm />
        </div>
      </div>
    </animated.div>
  );
}
