import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AddToCart,
  GetCart,
  IncreaseCartQty,
  DecreaseCartQty,
  RemoveFromCart,
} from "../Connection/connectToDB";

import type { Book } from "../Connection/connectToDB";



export type CartItem = Book & {
  quantity: number;
};


type CartContextType = {
  cart: CartItem[];

  loading: boolean;

  add: (
    book: Book,
    quantity?: number
  ) => Promise<void>;

  increase: (
    bookId: string
  ) => Promise<void>;

  decrease: (
    bookId: string
  ) => Promise<void>;

  remove: (
    bookId: string
  ) => Promise<void>;

  clearCart: () => void;

  cartItemCount: number;

  cartTotal: number;
};


type CartProviderProps = {
  children: ReactNode;
};


const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );


const normalizeCart = (
  items: any[]
): CartItem[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const book = item?.book || item;

      const bookId =
        book?._id ||
        item?.bookId ||
        item?.productId;

      if (!bookId) {
        return null;
      }

      return {
        ...book,

        _id: String(bookId),

        quantity:
          Number(item?.quantity) > 0
            ? Number(item.quantity)
            : 1,
      };
    })
    .filter(
      (item): item is CartItem =>
        item !== null
    );
};



export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [loading, setLoading] =
    useState(false);



  const saveCartToStorage = useCallback(
    (cartItems: CartItem[]) => {
      try {
        localStorage.setItem(
          "book_cart",
          JSON.stringify(cartItems)
        );
      } catch (error) {
        console.error(
          "Failed to save cart to localStorage:",
          error
        );
      }
    },
    []
  );



  const fetchCart = useCallback(
    async () => {
      try {
        setLoading(true);

        console.log(
          "🛒 Fetching cart from server..."
        );

        const response =
          await GetCart();

        console.log(
          "🛒 Cart server response:",
          response
        );



        if (
          !response ||
          response.success === false
        ) {
          console.log(
            "No server cart found."
          );

          return;
        }

        const serverItems =
          response?.cart?.items || [];

        const formattedCart =
          normalizeCart(serverItems);


        console.log(
          "🛒 Formatted cart:",
          formattedCart
        );



        setCart(formattedCart);


        saveCartToStorage(
          formattedCart
        );
      } catch (error) {
        console.error(
          "❌ Failed to fetch cart:",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    [saveCartToStorage]
  );

  useEffect(() => {
    const loadCart = async () => {

      try {
        const savedCart =
          localStorage.getItem(
            "book_cart"
          );

        if (savedCart) {
          const parsedCart =
            JSON.parse(savedCart);

          if (
            Array.isArray(parsedCart)
          ) {
            setCart(
              normalizeCart(parsedCart)
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to load local cart:",
          error
        );

        localStorage.removeItem(
          "book_cart"
        );
      }



      await fetchCart();
    };

    loadCart();
  }, [fetchCart]);


  const add = useCallback(
    async (
      book: Book,
      quantity: number = 1
    ) => {
      if (!book?._id) {
        console.error(
          "Cannot add book without MongoDB _id:",
          book
        );

        return;
      }

      if (quantity < 1) {
        return;
      }

      try {
        setLoading(true);

        console.log(
          "🛒 Adding book:",
          book._id
        );

        const response =
          await AddToCart(
            String(book._id),
            quantity
          );

        console.log(
          "🛒 Add cart response:",
          response
        );

        if (
          response?.success === false
        ) {
          console.error(
            "Add to cart failed:",
            response?.message
          );

          return;
        }



        if (
          response?.cart?.items &&
          Array.isArray(
            response.cart.items
          )
        ) {
          const formattedCart =
            normalizeCart(
              response.cart.items
            );

          setCart(formattedCart);

          saveCartToStorage(
            formattedCart
          );

          return;
        }


        setCart(
          (previousCart) => {
            const existingIndex =
              previousCart.findIndex(
                (item) =>
                  String(item._id) ===
                  String(book._id)
              );



            if (
              existingIndex !== -1
            ) {
              const updatedCart = [
                ...previousCart,
              ];

              updatedCart[
                existingIndex
              ] = {
                ...updatedCart[
                  existingIndex
                ],

                quantity:
                  updatedCart[
                    existingIndex
                  ].quantity +
                  quantity,
              };

              saveCartToStorage(
                updatedCart
              );

              return updatedCart;
            }

            const updatedCart = [
              ...previousCart,
              {
                ...book,
                quantity,
              },
            ];

            saveCartToStorage(
              updatedCart
            );

            return updatedCart;
          }
        );
      } catch (error) {
        console.error(
          "❌ Add to cart failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    [saveCartToStorage]
  );

  const increase =
    useCallback(
      async (
        bookId: string
      ) => {
        if (
          !bookId ||
          bookId === "undefined"
        ) {
          console.error(
            "Invalid book ID:",
            bookId
          );

          return;
        }

        try {
          setLoading(true);

          const response =
            await IncreaseCartQty(
              String(bookId)
            );

          console.log(
            "🛒 Increase response:",
            response
          );



          if (
            response?.success === false
          ) {
            console.error(
              "Increase cart failed:",
              response?.message
            );

            return;
          }


          if (
            response?.cart?.items &&
            Array.isArray(
              response.cart.items
            )
          ) {
            const formattedCart =
              normalizeCart(
                response.cart.items
              );

            setCart(formattedCart);

            saveCartToStorage(
              formattedCart
            );

            return;
          }

          setCart(
            (previousCart) =>
              previousCart.map(
                (item) =>
                  String(item._id) ===
                  String(bookId)
                    ? {
                        ...item,

                        quantity:
                          item.quantity +
                          1,
                      }
                    : item
              )
          );
        } catch (error) {
          console.error(
            "❌ Increase cart quantity failed:",
            error
          );
        } finally {
          setLoading(false);
        }
      },
      [saveCartToStorage]
    );


  const decrease =
    useCallback(
      async (
        bookId: string
      ) => {
        if (
          !bookId ||
          bookId === "undefined"
        ) {
          console.error(
            "Invalid book ID:",
            bookId
          );

          return;
        }

        try {
          setLoading(true);

          const response =
            await DecreaseCartQty(
              String(bookId)
            );

          console.log(
            "🛒 Decrease response:",
            response
          );

          if (
            response?.success === false
          ) {
            console.error(
              "Decrease cart failed:",
              response?.message
            );

            return;
          }

          if (
            response?.cart?.items &&
            Array.isArray(
              response.cart.items
            )
          ) {
            const formattedCart =
              normalizeCart(
                response.cart.items
              );

            setCart(formattedCart);

            saveCartToStorage(
              formattedCart
            );

            return;
          }


          setCart(
            (previousCart) =>
              previousCart
                .map((item) => {
                  if (
                    String(
                      item._id
                    ) !==
                    String(bookId)
                  ) {
                    return item;
                  }

                  return {
                    ...item,

                    quantity:
                      item.quantity -
                      1,
                  };
                })
                .filter(
                  (item) =>
                    item.quantity > 0
                )
          );
        } catch (error) {
          console.error(
            "❌ Decrease cart quantity failed:",
            error
          );
        } finally {
          setLoading(false);
        }
      },
      [saveCartToStorage]
    );


  const remove =
    useCallback(
      async (
        bookId: string
      ) => {
        if (
          !bookId ||
          bookId === "undefined"
        ) {
          console.error(
            "Invalid book ID:",
            bookId
          );

          return;
        }

        try {
          setLoading(true);

          const response =
            await RemoveFromCart(
              String(bookId)
            );

          console.log(
            "🛒 Remove response:",
            response
          );


          if (
            response?.success === false
          ) {
            console.error(
              "Remove cart item failed:",
              response?.message
            );

            return;
          }


          if (
            response?.cart?.items &&
            Array.isArray(
              response.cart.items
            )
          ) {
            const formattedCart =
              normalizeCart(
                response.cart.items
              );

            setCart(formattedCart);

            saveCartToStorage(
              formattedCart
            );

            return;
          }

          setCart(
            (previousCart) =>
              previousCart.filter(
                (item) =>
                  String(
                    item._id
                  ) !==
                  String(bookId)
              )
          );
        } catch (error) {
          console.error(
            "❌ Remove from cart failed:",
            error
          );
        } finally {
          setLoading(false);
        }
      },
      [saveCartToStorage]
    );

  const clearCart =
    useCallback(() => {
      setCart([]);

      try {
        localStorage.removeItem(
          "book_cart"
        );
      } catch (error) {
        console.error(
          "Failed to clear saved cart:",
          error
        );
      }
    }, []);

  const cartItemCount =
    cart.reduce(
      (total, item) => {
        return (
          total +
          Number(
            item.quantity || 0
          )
        );
      },
      0
    );



  const cartTotal =
    cart.reduce(
      (total, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(
            item.quantity
          ) || 0;

        return (
          total +
          price * quantity
        );
      },
      0
    );



  return (
    <CartContext.Provider
      value={{
        cart,

        loading,

        add,

        increase,

        decrease,

        remove,

        clearCart,

        cartItemCount,

        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const cartAuth = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "cartAuth must be used inside CartProvider"
    );
  }

  return context;
};


export default CartContext;