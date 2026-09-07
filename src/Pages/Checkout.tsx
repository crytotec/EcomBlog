import { useState } from "react";
import {
  Lock,
  ChevronLeft,
  CreditCard,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { cartAuth } from "../context/CartContext";
import { userAuth } from "../context/AuthContext";


// ======================================================
// COLORS
// ======================================================

const C = {
  ink: "#1B1B16",
  paper: "#EFE7D8",
  paperDark: "#E3D9C4",
  cream: "#F7F2E7",
  oxblood: "#7A2E2E",
  forest: "#37483B",
};


// ======================================================
// MINI BOOK COVER
// ======================================================

function MiniCover({
  color,
  image,
  title,
}: {
  color?: string;
  image?: string;
  title?: string;
}) {
  if (image) {
    return (
      <div className="relative h-[68px] w-12 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100 shadow-sm">
        <img
          src={image}
          alt={title || "Book"}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative h-[68px] w-12 flex-shrink-0 overflow-hidden rounded-sm shadow-sm"
      style={{
        backgroundColor: color || C.oxblood,
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
        }}
      />
    </div>
  );
}


// ======================================================
// INPUT FIELD
// ======================================================

function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  span = 1,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  span?: 1 | 2;
}) {
  return (
    <div
      className={
        span === 2
          ? "sm:col-span-2"
          : ""
      }
    >
      <label
        htmlFor={id}
        className="mb-2 block text-xs uppercase tracking-[0.1em]"
        style={{
          fontFamily:
            "'IBM Plex Mono', monospace",
          color: "#4A473E",
        }}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        required
        className="w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition focus:ring-1"
        style={{
          borderColor: C.paperDark,
          fontFamily:
            "'Source Serif 4', serif",
        }}
      />
    </div>
  );
}


// ======================================================
// CHECKOUT
// ======================================================

function Checkout() {
  const navigate = useNavigate();

  const [step, setStep] =
    useState<1 | 2>(1);

  const [placing, setPlacing] =
    useState(false);

  const [placedOrder, setPlacedOrder] =
    useState(false);

  const {
    cart,
    cartTotal,
    clearCart,
  } = cartAuth();

  const { user } = userAuth();


  // ====================================================
  // SHIPPING
  // ====================================================

  const [shipping, setShipping] =
    useState({
      fullName: "",
      address: "",
      city: "",
      postal: "",
      country: "",
    });


  // ====================================================
  // PAYMENT
  // ====================================================

  const [payment, setPayment] =
    useState({
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    });


  // ====================================================
  // ORDER TOTAL
  // ====================================================

  const subtotal = cartTotal;

  /*
    You can change this later when you connect
    your real shipping/payment system.
  */

  const shippingCost =
    subtotal >= 40 ? 0 : 4.5;

  const total =
    subtotal + shippingCost;


  // ====================================================
  // PLACE ORDER
  // ====================================================

  const handlePlaceOrder = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (cart.length === 0) {
      return;
    }

    setPlacing(true);

    /*
      This is currently only a frontend
      confirmation.

      When you create your real order
      backend endpoint, replace this
      section with your API call.
    */

    setTimeout(() => {
      console.log("Order details:", {
        customer: user?.email,
        shipping,
        payment: {
          cardName: payment.cardName,
          cardNumber: payment.cardNumber,
          expiry: payment.expiry,
        },
        items: cart,
        subtotal,
        shippingCost,
        total,
      });

      clearCart();

      setPlacing(false);
      setPlacedOrder(true);
    }, 1200);
  };


  // ====================================================
  // EMPTY CART
  // ====================================================

  if (
    cart.length === 0 &&
    !placedOrder
  ) {
    return (
      <div
        style={{
          backgroundColor: C.paper,
          color: C.ink,
        }}
        className="flex min-h-screen w-full items-center justify-center px-5"
      >
        <div className="max-w-md text-center">
          <h1
            className="mb-3 text-3xl"
            style={{
              fontFamily:
                "'Fraunces', serif",
              fontWeight: 700,
            }}
          >
            Your cart is empty.
          </h1>

          <p
            className="mb-8 text-sm"
            style={{
              color: "#4A473E",
              fontFamily:
                "'Source Serif 4', serif",
            }}
          >
            Add a few books before
            heading to checkout.
          </p>

          <Link
            to="/"
            className="inline-block rounded-sm px-6 py-3 text-sm uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            style={{
              backgroundColor: C.ink,
              fontFamily:
                "'IBM Plex Mono', monospace",
            }}
          >
            Browse the shelves
          </Link>
        </div>
      </div>
    );
  }


  // ====================================================
  // ORDER SUCCESS
  // ====================================================

  if (placedOrder) {
    return (
      <div
        style={{
          backgroundColor: C.paper,
          color: C.ink,
        }}
        className="flex min-h-screen w-full items-center justify-center px-5"
      >
        <div className="max-w-md text-center">

          <CheckCircle2
            size={40}
            strokeWidth={1.4}
            style={{
              color: C.forest,
            }}
            className="mx-auto mb-5"
          />

          <h1
            className="mb-3 text-3xl"
            style={{
              fontFamily:
                "'Fraunces', serif",
              fontWeight: 700,
            }}
          >
            Order placed.
          </h1>

          <p
            className="mb-8 text-sm"
            style={{
              color: "#4A473E",
              fontFamily:
                "'Source Serif 4', serif",
            }}
          >
            Your order has been placed
            successfully. Thank you for
            shopping with us.
          </p>

          <Link
            to="/"
            className="inline-block rounded-sm px-6 py-3 text-sm uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            style={{
              backgroundColor: C.ink,
              fontFamily:
                "'IBM Plex Mono', monospace",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }


  // ====================================================
  // MAIN CHECKOUT
  // ====================================================

  return (
    <div
      style={{
        backgroundColor: C.paper,
        color: C.ink,
      }}
      className="min-h-screen w-full"
    >
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              navigate("/cart")
            }
            className="flex items-center gap-1 text-sm transition-opacity hover:opacity-60"
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",
              color: "#4A473E",
            }}
          >
            <ChevronLeft size={15} />
            Cart
          </button>

          <span
            style={{
              color: "#8A8674",
            }}
          >
            /
          </span>

          <h1
            className="text-3xl md:text-4xl"
            style={{
              fontFamily:
                "'Fraunces', serif",
              fontWeight: 700,
            }}
          >
            Checkout
          </h1>
        </div>


        {/* =================================================
            STEP INDICATOR
        ================================================= */}

        <div
          className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.1em]"
          style={{
            fontFamily:
              "'IBM Plex Mono', monospace",
          }}
        >

          {/* SHIPPING */}

          <span
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              backgroundColor:
                step >= 1
                  ? C.ink
                  : "transparent",

              color:
                step >= 1
                  ? C.cream
                  : "#8A8674",

              border:
                `1px solid ${
                  step >= 1
                    ? C.ink
                    : C.paperDark
                }`,
            }}
          >
            <Truck size={12} />

            Shipping
          </span>


          <div
            className="h-px w-8"
            style={{
              backgroundColor:
                C.paperDark,
            }}
          />


          {/* PAYMENT */}

          <span
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              backgroundColor:
                step >= 2
                  ? C.ink
                  : "transparent",

              color:
                step >= 2
                  ? C.cream
                  : "#8A8674",

              border:
                `1px solid ${
                  step >= 2
                    ? C.ink
                    : C.paperDark
                }`,
            }}
          >
            <CreditCard size={12} />

            Payment
          </span>
        </div>


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              FORM
          ================================================= */}

          <div>

            {/* =================================================
                SHIPPING FORM
            ================================================= */}

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="flex flex-col gap-6"
              >

                <h2
                  className="text-xl"
                  style={{
                    fontFamily:
                      "'Fraunces', serif",
                    fontWeight: 600,
                  }}
                >
                  Shipping address
                </h2>


                <div className="grid gap-4 sm:grid-cols-2">

                  <Field
                    label="Full name"
                    id="fullName"
                    placeholder="Your full name"
                    value={
                      shipping.fullName
                    }
                    onChange={(value) =>
                      setShipping(
                        (current) => ({
                          ...current,
                          fullName: value,
                        })
                      )
                    }
                    span={2}
                  />

                  <Field
                    label="Address"
                    id="address"
                    placeholder="Your delivery address"
                    value={
                      shipping.address
                    }
                    onChange={(value) =>
                      setShipping(
                        (current) => ({
                          ...current,
                          address: value,
                        })
                      )
                    }
                    span={2}
                  />

                  <Field
                    label="City"
                    id="city"
                    placeholder="Lagos"
                    value={
                      shipping.city
                    }
                    onChange={(value) =>
                      setShipping(
                        (current) => ({
                          ...current,
                          city: value,
                        })
                      )
                    }
                  />

                  <Field
                    label="Postal code"
                    id="postal"
                    placeholder="100001"
                    value={
                      shipping.postal
                    }
                    onChange={(value) =>
                      setShipping(
                        (current) => ({
                          ...current,
                          postal: value,
                        })
                      )
                    }
                  />

                  <Field
                    label="Country"
                    id="country"
                    placeholder="Nigeria"
                    value={
                      shipping.country
                    }
                    onChange={(value) =>
                      setShipping(
                        (current) => ({
                          ...current,
                          country: value,
                        })
                      )
                    }
                    span={2}
                  />
                </div>


                <button
                  type="submit"
                  className="self-start rounded-sm px-6 py-3 text-sm uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: C.ink,
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                  }}
                >
                  Continue to payment
                </button>
              </form>
            )}


            {/* =================================================
                PAYMENT FORM
            ================================================= */}

            {step === 2 && (
              <form
                onSubmit={
                  handlePlaceOrder
                }
                className="flex flex-col gap-6"
              >

                <div className="flex items-center justify-between">

                  <h2
                    className="text-xl"
                    style={{
                      fontFamily:
                        "'Fraunces', serif",
                      fontWeight: 600,
                    }}
                  >
                    Payment details
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      setStep(1)
                    }
                    className="text-xs transition-opacity hover:opacity-60"
                    style={{
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      color: C.oxblood,
                    }}
                  >
                    Edit shipping
                  </button>
                </div>


                <div className="grid gap-4 sm:grid-cols-2">

                  <Field
                    label="Name on card"
                    id="cardName"
                    placeholder="Your name"
                    value={
                      payment.cardName
                    }
                    onChange={(value) =>
                      setPayment(
                        (current) => ({
                          ...current,
                          cardName: value,
                        })
                      )
                    }
                    span={2}
                  />

                  <Field
                    label="Card number"
                    id="cardNumber"
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={
                      payment.cardNumber
                    }
                    onChange={(value) =>
                      setPayment(
                        (current) => ({
                          ...current,
                          cardNumber: value,
                        })
                      )
                    }
                    span={2}
                  />

                  <Field
                    label="Expiry"
                    id="expiry"
                    placeholder="MM/YY"
                    value={
                      payment.expiry
                    }
                    onChange={(value) =>
                      setPayment(
                        (current) => ({
                          ...current,
                          expiry: value,
                        })
                      )
                    }
                  />

                  <Field
                    label="CVC"
                    id="cvc"
                    type="password"
                    placeholder="123"
                    value={
                      payment.cvc
                    }
                    onChange={(value) =>
                      setPayment(
                        (current) => ({
                          ...current,
                          cvc: value,
                        })
                      )
                    }
                  />
                </div>


                {/* SECURITY */}

                <p
                  className="flex items-center gap-2 text-xs"
                  style={{
                    color: "#8A8674",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                  }}
                >
                  <Lock size={12} />

                  Payments are encrypted
                  and secure.
                </p>


                {/* PLACE ORDER */}

                <button
                  type="submit"
                  disabled={placing}
                  className="self-start rounded-sm px-6 py-3.5 text-sm uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor:
                      C.oxblood,
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                  }}
                >
                  {placing
                    ? "Placing order..."
                    : `Place order — ₦${total.toLocaleString(
                        "en-NG"
                      )}`}
                </button>
              </form>
            )}
          </div>


          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div
            className="rounded-sm border-2 border-dashed p-6 md:p-7 lg:sticky lg:top-24"
            style={{
              borderColor: C.oxblood,
              backgroundColor: C.cream,
            }}
          >

            <span
              className="mb-5 block text-xs uppercase tracking-[0.15em]"
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",
                color: C.oxblood,
              }}
            >
              Order Summary
            </span>


            {/* =================================================
                CART ITEMS
            ================================================= */}

            <div className="mb-5 flex flex-col gap-4">

              {cart.map((item) => {

                const itemPrice =
                  Number(item.price) || 0;

                const itemTotal =
                  itemPrice *
                  item.quantity;

                return (
                  <div
                    key={String(
                      item._id
                    )}
                    className="flex items-center gap-3"
                  >

                    <MiniCover
                      color={item.color}
                      image={item.image}
                      title={item.title}
                    />

                    <div className="flex-1">

                      <p
                        className="text-sm"
                        style={{
                          fontFamily:
                            "'Fraunces', serif",
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </p>

                      <p
                        className="text-xs"
                        style={{
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          color: "#8A8674",
                        }}
                      >
                        Qty {item.quantity}
                      </p>
                    </div>

                    <span
                      className="text-sm"
                      style={{
                        fontFamily:
                          "'IBM Plex Mono', monospace",
                      }}
                    >
                      ₦
                      {itemTotal.toLocaleString(
                        "en-NG"
                      )}
                    </span>
                  </div>
                );
              })}
            </div>


            {/* =================================================
                SUBTOTAL / SHIPPING
            ================================================= */}

            <div
              className="flex flex-col gap-3 border-t pt-4 text-sm"
              style={{
                borderColor:
                  C.paperDark,
                fontFamily:
                  "'Source Serif 4', serif",
              }}
            >

              <div className="flex justify-between">

                <span
                  style={{
                    color: "#4A473E",
                  }}
                >
                  Subtotal
                </span>

                <span
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                  }}
                >
                  ₦
                  {subtotal.toLocaleString(
                    "en-NG"
                  )}
                </span>
              </div>


              <div className="flex justify-between">

                <span
                  style={{
                    color: "#4A473E",
                  }}
                >
                  Shipping
                </span>

                <span
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                  }}
                >
                  {shippingCost === 0
                    ? "Free"
                    : `₦${shippingCost.toLocaleString(
                        "en-NG"
                      )}`}
                </span>
              </div>
            </div>


            {/* =================================================
                TOTAL
            ================================================= */}

            <div
              className="mt-4 flex items-baseline justify-between border-t pt-4"
              style={{
                borderColor:
                  C.paperDark,
              }}
            >

              <span
                style={{
                  fontFamily:
                    "'Fraunces', serif",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                }}
              >
                Total
              </span>

              <span
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "1.1rem",
                  color: C.oxblood,
                }}
              >
                ₦
                {total.toLocaleString(
                  "en-NG"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;