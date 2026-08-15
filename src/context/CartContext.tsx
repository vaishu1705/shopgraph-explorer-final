import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Product } from "@/data/types";


/* =========================================================
   TYPES
========================================================= */

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status:
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
}

interface CartContextType {
  items: CartItem[];

  addToCart: (
    product: Product,
  ) => void;

  removeFromCart: (
    productId: string,
  ) => void;

  increaseQuantity: (
    productId: string,
  ) => void;

  decreaseQuantity: (
    productId: string,
  ) => void;

  clearCart: () => void;

  cartCount: number;

  cartTotal: number;

  orders: Order[];

  placeOrder: () => Order | null;

  clearOrders: () => void;
}


/* =========================================================
   STORAGE KEYS
========================================================= */

const CART_STORAGE_KEY =
  "shopgraph-cart";

const ORDERS_STORAGE_KEY =
  "shopgraph-orders";


/* =========================================================
   STORAGE HELPERS
========================================================= */

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved =
      window.localStorage.getItem(
        CART_STORAGE_KEY,
      );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error(
      "Unable to load cart:",
      error,
    );

    return [];
  }
}


function getStoredOrders(): Order[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved =
      window.localStorage.getItem(
        ORDERS_STORAGE_KEY,
      );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error(
      "Unable to load orders:",
      error,
    );

    return [];
  }
}


/* =========================================================
   CONTEXT
========================================================= */

const CartContext =
  createContext<
    CartContextType | undefined
  >(undefined);


/* =========================================================
   PROVIDER
========================================================= */

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  /* =======================================================
     CART STATE
  ======================================================= */

  const [items, setItems] =
    useState<CartItem[]>(
      getStoredCart,
    );


  /* =======================================================
     ORDERS STATE
  ======================================================= */

  const [orders, setOrders] =
    useState<Order[]>(
      getStoredOrders,
    );


  /* =======================================================
     SAVE CART WHENEVER IT CHANGES
  ======================================================= */

  useEffect(() => {

    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    try {

      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items),
      );

    } catch (error) {

      console.error(
        "Unable to save cart:",
        error,
      );

    }

  }, [items]);


  /* =======================================================
     SAVE ORDERS WHENEVER THEY CHANGE
  ======================================================= */

  useEffect(() => {

    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    try {

      window.localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(orders),
      );

    } catch (error) {

      console.error(
        "Unable to save orders:",
        error,
      );

    }

  }, [orders]);


  /* =======================================================
     ADD TO CART
  ======================================================= */

  function addToCart(
    product: Product,
  ) {

    setItems((current) => {

      const existing =
        current.find(
          (item) =>
            item.product.id ===
            product.id,
        );


      if (existing) {

        return current.map(
          (item) =>
            item.product.id ===
            product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item,
        );

      }


      return [
        ...current,
        {
          product,
          quantity: 1,
        },
      ];

    });

  }


  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  function removeFromCart(
    productId: string,
  ) {

    setItems((current) =>
      current.filter(
        (item) =>
          item.product.id !==
          productId,
      ),
    );

  }


  /* =======================================================
     INCREASE QUANTITY
  ======================================================= */

  function increaseQuantity(
    productId: string,
  ) {

    setItems((current) =>
      current.map(
        (item) =>
          item.product.id ===
          productId
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item,
      ),
    );

  }


  /* =======================================================
     DECREASE QUANTITY
  ======================================================= */

  function decreaseQuantity(
    productId: string,
  ) {

    setItems((current) =>
      current
        .map(
          (item) =>
            item.product.id ===
            productId
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item,
        )
        .filter(
          (item) =>
            item.quantity > 0,
        ),
    );

  }


  /* =======================================================
     CLEAR CART
  ======================================================= */

  function clearCart() {

    setItems([]);

  }


  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount =
    useMemo(
      () =>
        items.reduce(
          (
            total,
            item,
          ) =>
            total +
            item.quantity,
          0,
        ),
      [items],
    );


  /* =======================================================
     CART TOTAL
  ======================================================= */

  const cartTotal =
    useMemo(
      () =>
        items.reduce(
          (
            total,
            item,
          ) =>
            total +
            item.product.price *
              item.quantity,
          0,
        ),
      [items],
    );


  /* =======================================================
     PLACE ORDER
  ======================================================= */

  function placeOrder():
    Order | null {

    if (
      items.length === 0
    ) {
      return null;
    }


    /* -----------------------------------------------------
       DELIVERY
    ----------------------------------------------------- */

    const delivery =
      cartTotal >= 50000
        ? 0
        : 499;


    /* -----------------------------------------------------
       CREATE ORDER
    ----------------------------------------------------- */

    const newOrder: Order = {

      id:
        `SG-${Date.now()
          .toString()
          .slice(-8)}`,

      date:
        new Date().toISOString(),

      status:
        "Processing",

      items:
        items.map(
          (item) => ({
            product:
              item.product,

            quantity:
              item.quantity,
          }),
        ),

      subtotal:
        cartTotal,

      delivery,

      total:
        cartTotal +
        delivery,

    };


    /* -----------------------------------------------------
       ADD NEW ORDER
    ----------------------------------------------------- */

    setOrders(
      (current) => [
        newOrder,
        ...current,
      ],
    );


    /* -----------------------------------------------------
       CLEAR CART
    ----------------------------------------------------- */

    setItems([]);


    return newOrder;
  }


  /* =======================================================
     CLEAR ALL ORDERS
  ======================================================= */

  function clearOrders() {

    setOrders([]);

  }


  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value:
    CartContextType = {

    items,

    addToCart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    clearCart,

    cartCount,

    cartTotal,

    orders,

    placeOrder,

    clearOrders,

  };


  /* =======================================================
     PROVIDER
  ======================================================= */

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}


/* =========================================================
   USE CART
========================================================= */

export function useCart() {

  const context =
    useContext(
      CartContext,
    );


  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider",
    );

  }


  return context;
}