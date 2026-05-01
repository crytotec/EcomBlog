import { Link } from "react-router-dom";

function Cart({ Add, setAdd }) {

  // REMOVE SINGLE ITEM
  const removeItem = (indexToRemove) => {
    const updated = Add.filter((_, index) => index !== indexToRemove);
    setAdd(updated);
  };

  // CLEAR CART
  const clearCart = () => {
    setAdd([]);
  };

 

  const subtotal = Add.reduce((acc, index) => acc + index.price * index.quantity, 0);
  const delivery = Add.length > 0 ? 1500 : 0;
  const total = subtotal + delivery;
 
  
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1000px] p-4">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900">
            Your Cart 🛒
          </h1>
          <p className="text-gray-600 mt-2">
            Review your selected items before checkout
          </p>
        </div>

        {/* ITEMS */}
        {Add.length > 0 ? (
          <div className="space-y-4">

            {Add.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-white p-4 rounded-lg shadow-md items-center"
              >
                {/* IMAGE */}
                <img
                  src={item.urls.small}
                  alt={item.alt_description}
                  className="w-[100px] h-[100px] object-cover rounded-md"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {item.alt_description || "Beautiful Product"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    By {item.user.name}
                  </p>
                  <p className="text-green-700 font-bold mt-1">
                    ${item.price}
                  </p>
                    <p className="text-green-700 font-bold mt-1">
                    Quantity {item.quantity}
                  </p>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* CLEAR CART */}
            <div className="text-right">
              <button
                onClick={clearCart}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"
              >
                Clear Cart
              </button>
            </div>

          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white shadow-md rounded-lg p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Your cart is empty 🛒
            </h2>
            <p className="text-gray-500 mt-2">
              Start shopping to add items to your cart
            </p>

            <Link to="/Product">
              <button className="mt-5 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* SUMMARY */}
        {Add.length > 0 && (
          <div className="mt-10 bg-white shadow-md rounded-lg p-6">

            <h2 className="text-xl font-bold text-green-800 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Delivery</span>
              <span>₦{delivery.toLocaleString()}</span>
            </div>

            <div className="border-t my-3"></div>

            <div className="flex justify-between font-bold text-green-900 text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <Link to="/Payment">
              <button className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg transition">
                Proceed to Checkout
              </button>
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;