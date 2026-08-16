"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { getSession, onAuthChange } from "@/lib/local-auth";

interface CartContextValue {
  cartIds: string[];
  loading: boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async (uid: string | null) => {
      if (!uid) {
        setCartIds([]);
        setLoading(false);
        return;
      }
      const supabase = createClient();
      const { data } = await supabase
        .from("cart_items")
        .select("book_id")
        .eq("user_id", uid);
      setCartIds((data ?? []).map((row) => row.book_id));
      setLoading(false);
    };

    const sync = () => {
      const uid = getSession()?.id ?? null;
      setUserId(uid);
      loadCart(uid);
    };

    sync();
    return onAuthChange(sync);
  }, []);

  const addToCart = (id: string) => {
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    if (cartIds.includes(id)) return;

    setCartIds((prev) => [...prev, id]);
    const supabase = createClient();
    supabase
      .from("cart_items")
      .insert({ user_id: userId, book_id: id })
      .then(({ error }) => {
        if (error) setCartIds((prev) => prev.filter((i) => i !== id));
      });
  };

  const removeFromCart = (id: string) => {
    if (!userId) return;

    setCartIds((prev) => prev.filter((i) => i !== id));
    const supabase = createClient();
    supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId)
      .eq("book_id", id)
      .then(() => {});
  };

  const isInCart = (id: string) => cartIds.includes(id);

  const clearCart = () => {
    if (!userId) return;

    setCartIds([]);
    const supabase = createClient();
    supabase.from("cart_items").delete().eq("user_id", userId).then(() => {});
  };

  return (
    <CartContext.Provider
      value={{ cartIds, loading, addToCart, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
