import { useEffect, useRef, useState } from "react";
import CardPayment from "../PaymentSection/CardPayment";
import BankPayment from "../PaymentSection/BankPaymet";
import { FaTimes } from "react-icons/fa";

function Payment({Add}) {
  const [method, setMethod] = useState(null);
  const modalRef = useRef(null);

  // 👉 CLOSE WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setMethod(null);
      }
    };

    if (method) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [method]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1000px] p-4">

        {/* HEADER */}
        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold text-green-900">
            Payment Methods
          </h1>
          <p className="text-gray-600 mt-2">
            Choose a secure and convenient way to pay
          </p>
        </div>

        {/* OPTIONS */}
        <div className="mt-10 space-y-6">

          {/* CARD */}
          <div
            onClick={() => setMethod("card")}
            className="cursor-pointer bg-white p-6 shadow-md rounded-lg border-l-4 border-green-700 hover:scale-[1.02] hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-green-800">
              Card Payment
            </h2>
            <p className="mt-2 text-gray-600">
              Pay securely using your ATM card.
            </p>
          </div>

          {/* BANK */}
          <div
            onClick={() => setMethod("bank")}
            className="cursor-pointer bg-white p-6 shadow-md rounded-lg border-l-4 border-green-700 hover:scale-[1.02] hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-green-800">
              Bank Transfer
            </h2>
            <p className="mt-2 text-gray-600">
              Transfer directly to our bank account.
            </p>
          </div>

        </div>

        {/* MODAL */}
        {method && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

            <div
              ref={modalRef}
              className="relative w-full max-w-[500px] animate-scaleIn"
            >
              {/* CLOSE BUTTON */}
              <div
                onClick={() => setMethod(null)}
                className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow cursor-pointer"
              >
                <FaTimes size={18} />
              </div>

              {method === "card" && <CardPayment Add={Add} />}
              {method === "bank" && <BankPayment Add={Add}/>}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Payment;