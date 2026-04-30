import { useState } from "react";

function BankPayment({Add}) {
  const [copied, setCopied] = useState("");

  const paymentDetails = {
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "Crytotec Events",
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };


  const subtotal = Add.reduce((acc, index) => acc + index.price * index.quantity, 0);
  const delivery = Add.length > 0 ? 1500 : 0;
  const total = subtotal + delivery;
  return (
    <div className="max-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bank Transfer
          </h2>
          <p> Payment to be pay: ₦{total}</p>
          <p className="text-sm text-gray-500">
            Transfer the exact amount to the account below
          </p>
        </div>

        {/* Payment Card */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">

          {/* Bank Name */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Bank</span>
            <span className="font-semibold">{paymentDetails.bankName}</span>
          </div>

          {/* Account Number */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {paymentDetails.accountNumber}
              </span>
              <button
                onClick={() =>
                  handleCopy(paymentDetails.accountNumber, "Account Number")
                }
                className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Account Name */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Account Name</span>
            <span className="font-semibold">
              {paymentDetails.accountName}
            </span>
          </div>
        </div>

        {/* Feedback */}
        {copied && (
          <p className="text-green-600 text-sm text-center">
            {copied} copied!
          </p>
        )}

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-semibold text-yellow-700 mb-2">
            Payment Instructions
          </h4>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Transfer the exact amount</li>
            <li>Use your name as reference</li>
            <li>Click confirm after payment</li>
          </ul>
        </div>

        {/* CTA */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
          I Have Made Payment
        </button>
      </div>
    </div>
  );
}

export default BankPayment;