"use client";

import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Twitter } from "@tailgrids/icons";
import Link from "next/link";

export default function Footer() {
  return (
    /* con */
    <>
      <div className=" flex justify-center mt-2 ">
        <Badge className="mt-5 inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-medium  text-blue-600  ring-blue-100">
68095945 นายธนัท แสงสว่าง
        </Badge>
      </div>
      {/* /* contacts */}
      <div className="mt-2">
        <div className="flex justify-center gap-6">
          <Link href="#">
            <Facebook className="text-blue-700" />
          </Link>
      
        </div>

      </div>
    </>
  );
}
