'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { trackAddToCart } from '@/lib/gtm'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('sportslab_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sportslab_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    // Pushed here, outside the state updater, because React may run the
    // updater twice (StrictMode / re-render) and that would double-count.
    trackAddToCart(item)

    setCart((prev) => {
      const existingItem = prev.find((product) => product.id === item.id)

      if (existingItem) {
        return prev.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })

    setCartOpen(true)
  }

  const clearCart = () => {
    setCart([])
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        cartOpen,
        setCartOpen,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}