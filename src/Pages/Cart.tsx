import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { cartAuth } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    loading,
    increase,
    decrease,
    remove,
    cartItemCount,
    cartTotal,
  } = cartAuth();


  const formatPrice = (price: number) => {
    return `₦${Number(price || 0).toLocaleString(
      "en-NG"
    )}`;
  };


  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  if (loading && cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
          <div className="w-full rounded-2xl bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Loader2
                size={38}
                className="animate-spin text-gray-500"
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Loading your cart...
            </h1>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              We're retrieving your selected books.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
          <div className="w-full rounded-2xl bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag
                size={38}
                className="text-gray-500"
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven't added any books to your
              cart yet. Explore our collection and
              find something you love.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Browse Books
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">


        <div className="mb-8">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-2 text-gray-500">
                {cartItemCount}{" "}
                {cartItemCount === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">


          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="hidden border-b border-gray-100 px-6 py-4 sm:grid sm:grid-cols-[1fr_120px_140px_120px_40px] sm:items-center sm:gap-4">
                <p className="text-sm font-semibold text-gray-500">
                  Product
                </p>

                <p className="text-center text-sm font-semibold text-gray-500">
                  Price
                </p>

                <p className="text-center text-sm font-semibold text-gray-500">
                  Quantity
                </p>

                <p className="text-right text-sm font-semibold text-gray-500">
                  Total
                </p>

                <div />
              </div>


              <div className="divide-y divide-gray-100">
                {cart.map((item) => {
                  const price =
                    Number(item.price) || 0;

                  const quantity =
                    Number(item.quantity) || 0;

                  const itemTotal =
                    price * quantity;


                  const productSlug =
                    item.title
                      ?.toLowerCase()
                      .replace(
                        /[^a-z0-9]+/g,
                        "-"
                      )
                      .replace(
                        /^-+|-+$/g,
                        "");

                  return (
                    <div
                      key={String(item._id)}
                      className="p-5 sm:px-6"
                    >


                      <div className="hidden sm:grid sm:grid-cols-[1fr_120px_140px_120px_40px] sm:items-center sm:gap-4">

                        {/* PRODUCT */}

                        <div className="flex min-w-0 items-center gap-4">

                          {/* IMAGE */}

                          <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={
                                  item.title ||
                                  "Book"
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <ShoppingBag
                                  size={24}
                                  className="text-gray-400"
                                />
                              </div>
                            )}
                          </div>

                          {/* INFORMATION */}

                          <div className="min-w-0">

                            <Link
                              to={`/product/${productSlug}`}
                              className="line-clamp-2 font-semibold text-gray-900 hover:underline"
                            >
                              {item.title}
                            </Link>

                            <p className="mt-1 text-sm text-gray-500">
                              {item.author}
                            </p>

                            {item.category && (
                              <p className="mt-1 text-xs text-gray-400">
                                {item.category}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* PRICE */}

                        <p className="text-center text-sm font-medium text-gray-700">
                          {formatPrice(price)}
                        </p>

                        {/* QUANTITY */}

                        <div className="flex justify-center">
                          <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">

                            {/* MINUS */}

                            <button
                              type="button"
                              onClick={() =>
                                decrease(
                                  String(
                                    item._id
                                  )
                                )
                              }
                              disabled={
                                loading ||
                                quantity <= 1
                              }
                              className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <Minus
                                size={16}
                              />
                            </button>

                            {/* QUANTITY */}

                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold">
                              {quantity}
                            </span>

                            {/* PLUS */}

                            <button
                              type="button"
                              onClick={() =>
                                increase(
                                  String(
                                    item._id
                                  )
                                )
                              }
                              disabled={loading}
                              className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Increase quantity"
                            >
                              <Plus
                                size={16}
                              />
                            </button>
                          </div>
                        </div>

                        {/* TOTAL */}

                        <p className="text-right font-bold text-gray-900">
                          {formatPrice(
                            itemTotal
                          )}
                        </p>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            remove(
                              String(
                                item._id
                              )
                            )
                          }
                          disabled={loading}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2
                            size={18}
                          />
                        </button>
                      </div>


                      <div className="sm:hidden">
                        <div className="flex gap-4">

                          {/* IMAGE */}

                          <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={
                                  item.title ||
                                  "Book"
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <ShoppingBag
                                  size={25}
                                  className="text-gray-400"
                                />
                              </div>
                            )}
                          </div>

                          {/* INFORMATION */}

                          <div className="min-w-0 flex-1">

                            {/* TITLE + REMOVE */}

                            <div className="flex items-start justify-between gap-2">

                              <div>
                                <Link
                                  to={`/product/${productSlug}`}
                                  className="line-clamp-2 font-semibold text-gray-900 hover:underline"
                                >
                                  {item.title}
                                </Link>

                                <p className="mt-1 text-sm text-gray-500">
                                  {item.author}
                                </p>

                                {item.category && (
                                  <p className="mt-1 text-xs text-gray-400">
                                    {item.category}
                                  </p>
                                )}
                              </div>

                              {/* REMOVE */}

                              <button
                                type="button"
                                onClick={() =>
                                  remove(
                                    String(
                                      item._id
                                    )
                                  )
                                }
                                disabled={loading}
                                className="shrink-0 text-gray-400 transition hover:text-red-500 disabled:opacity-40"
                                aria-label="Remove item"
                              >
                                <Trash2
                                  size={18}
                                />
                              </button>
                            </div>

                            {/* PRICE */}

                            <p className="mt-3 font-semibold text-gray-800">
                              {formatPrice(price)}
                            </p>

                            {/* QUANTITY + TOTAL */}

                            <div className="mt-4 flex items-center justify-between">

                              {/* QUANTITY */}

                              <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">

                                {/* MINUS */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    decrease(
                                      String(
                                        item._id
                                      )
                                    )
                                  }
                                  disabled={
                                    loading ||
                                    quantity <= 1
                                  }
                                  className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus
                                    size={15}
                                  />
                                </button>

                                {/* NUMBER */}

                                <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold">
                                  {quantity}
                                </span>

                                {/* PLUS */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    increase(
                                      String(
                                        item._id
                                      )
                                    )
                                  }
                                  disabled={loading}
                                  className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                  aria-label="Increase quantity"
                                >
                                  <Plus
                                    size={15}
                                  />
                                </button>
                              </div>

                              {/* ITEM TOTAL */}

                              <p className="font-bold text-gray-900">
                                {formatPrice(
                                  itemTotal
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                {/* SUBTOTAL */}

                <div className="flex items-center justify-between text-gray-600">
                  <span>
                    Subtotal
                  </span>

                  <span className="font-medium text-gray-900">
                    {formatPrice(
                      cartTotal
                    )}
                  </span>
                </div>

                {/* SHIPPING */}

                <div className="flex items-center justify-between text-gray-600">
                  <span>
                    Shipping
                  </span>

                  <span className="font-medium text-gray-900">
                    Free
                  </span>
                </div>

                {/* DIVIDER */}

                <div className="border-t border-gray-100 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(
                        cartTotal
                      )}
                    </span>
                  </div>
                </div>
              </div>


              <button
                type="button"
                onClick={handleCheckout}
                disabled={
                  loading ||
                  cart.length === 0
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Proceed to Checkout

                <ArrowRight
                  size={18}
                />
              </button>


              <Link
                to="/"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
              >
                <ArrowLeft
                  size={16}
                />

                Continue Shopping
              </Link>

              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <p className="text-center text-xs leading-5 text-gray-500">
                  Your cart is securely
                  connected to your
                  account. Your selected
                  books will be available
                  when you return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && cart.length > 0 && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg">
            <Loader2
              size={16}
              className="animate-spin"
            />

            Updating cart...
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;