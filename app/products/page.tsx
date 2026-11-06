"use client";
import { useGlobalData } from "../layout";
import { Product } from "../data/products";
import Image from "next/image";
import { buttonStyles } from "@/components/tailgrids/core/button";

export default function Page() {
  const { products, setProducts, carts, setCarts } = useGlobalData();

  const addToCarts = (product: Product) => {
    //remove product from products
    setProducts(products.filter((p: Product) => p.id != product.id))

    // append product to carts
    setCarts([...carts, product])

  }
  return (
    <div className="bg-cyan-50 w-3xl mx-auto h-[calc(80vh-100px)] mt-4 border border-gray-300 rounded-2xl overflow-y-auto">
      <div className="grid grid-cols-5 gap-4 p-4">
        {products.map((product: Product) => (
          <div key={product.id} className='border rounded-2xl'>
            <div className="relative">
              <Image
                src={product.thumbnailUrl}
                alt="Image"
                width={150}
                height={150}
                className="w-full rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm text-white text-xs p-1 line-clamp-2">
                {product.title}
              </div>
              <div className="absolute top-1 right-1 bg-black/30 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded">
                ${product.price}
              </div>
            </div>
            <div className={buttonStyles({ className:'bg-green-500' })}
            onClick={() => addToCarts(product)}
            >
              Add to Carts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}