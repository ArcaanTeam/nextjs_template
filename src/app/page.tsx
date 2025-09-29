"use client";

import { findPetsByStatus } from "@/gen/api/pet/pet";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    findPetsByStatus({
      status: ["available"],
    }).then((res) => console.log(res.data));
  }, []);

  return (
    <div className="w-screen h-screen p-10">
      <div className="w-full h-full rounded-2xl bg-emerald-100">
        <div className="w-full h-full flex justify-center items-center">
          <h1>Hello Next.js</h1>
        </div>
      </div>
    </div>
  );
}
