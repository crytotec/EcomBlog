

function CardPayment({Add}) {
 const subtotal = Add.reduce((acc, index) => acc + index.price * index.quantity, 0);
  const delivery = Add.length > 0 ? 1500 : 0;
  const total = subtotal + delivery;
  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">

      <h1 className="text-2xl md:text-3xl font-bold text-center text-green-800">
        Card Payment
      </h1>

      <p className="text-center text-gray-600 mt-2">
        Pay securely using your ATM card
      </p>
       <p> Payment to be pay: ₦{total}</p>
      <form className="mt-6 space-y-4">

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Card Holder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="password"
            placeholder="CVV"
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold">
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default CardPayment;