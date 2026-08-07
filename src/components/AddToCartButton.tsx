"use client";

import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import clsx from "clsx";

const cartIconPath = (
  <path
    d="M2 3h2l1.6 9.6a1.5 1.5 0 0 0 1.48 1.25h6.24a1.5 1.5 0 0 0 1.48-1.25L16 6H4.5"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export default function AddToCartButton({
  bookId,
  className,
  labeled = false,
}: {
  bookId: string;
  className?: string;
  labeled?: boolean;
}) {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const inCart = isInCart(bookId);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) removeFromCart(bookId);
    else addToCart(bookId);
  };

  if (labeled) {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        onClick={toggle}
        className={clsx(
          "glass-panel rounded-full px-5 py-3 font-semibold flex items-center gap-2 transition-colors",
          inCart && "bg-[var(--color-forest)] text-white",
          className
        )}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          {inCart ? (
            <path
              d="M4 10l4 4 8-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <>
              {cartIconPath}
              <circle cx="7.5" cy="17" r="1.2" fill="currentColor" />
              <circle cx="14" cy="17" r="1.2" fill="currentColor" />
            </>
          )}
        </svg>
        {inCart ? "In your cart" : "Add to cart"}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={toggle}
      aria-label={inCart ? "Remove from cart" : "Add to cart"}
      title={inCart ? "Remove from cart" : "Add to cart"}
      className={clsx(
        "glass-panel rounded-full w-9 h-9 grid place-items-center transition-colors",
        inCart && "bg-[var(--color-forest)] text-white",
        className
      )}
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        {inCart ? (
          <path
            d="M4 10l4 4 8-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            {cartIconPath}
            <circle cx="7.5" cy="17" r="1.2" fill="currentColor" />
            <circle cx="14" cy="17" r="1.2" fill="currentColor" />
          </>
        )}
      </svg>
    </motion.button>
  );
}
