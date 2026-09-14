'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { trackViewCart } from '@/lib/gtm'

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
  } = useCart()

  // view_cart fires each time the drawer is opened — hooks must run before the
  // early return below, so this sits above it.
  useEffect(() => {
    if (cartOpen) trackViewCart(cart)
    // Intentionally keyed on `cartOpen` only: editing quantities while the
    // drawer is open is not a new cart view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartOpen])

  if (!cartOpen) return null

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 z-[9998] cursor-pointer bg-black/40"
      />

      <div className="fixed right-0 top-0 z-[9999] flex h-screen w-full max-w-md flex-col bg-white p-6 text-black shadow-2xl">
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-black">
            Cart
          </h2>

          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="cursor-pointer text-3xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">
          
          {cart.length === 0 && (
            <p className="text-zinc-500">
              Your cart is empty.
            </p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-300 p-4"
            >
              
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-black">
                    {item.name}
                  </p>

                  <p className="text-sm text-zinc-500">
                    ${item.price} each
                  </p>
                </div>

                <p className="font-black text-[#2563EB]">
                  ${item.price * item.quantity}
                </p>
              </div>

              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-3">
                  
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-xl font-black active:scale-95"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center font-black">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-xl font-black active:scale-95"
                  >
                    +
                  </button>

                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer text-sm font-black text-red-500"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-200 pt-5">
          
          <div className="mb-5 flex items-center justify-between">
            <p className="text-lg font-black">
              Total
            </p>

            <p className="text-3xl font-black text-[#2563EB]">
              ${total}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = '/checkout'
            }}
            className="w-full cursor-pointer rounded-full bg-[#2563EB] py-4 text-lg font-black text-white active:scale-95"
          >
            Checkout →
          </button>

        </div>
      </div>
    </>
  )
}