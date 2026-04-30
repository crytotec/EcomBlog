import deliveryImg from '../Img/interior.jpg';

function Delivery() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] p-4">

        {/* HERO */}
        <div
          style={{
            backgroundImage: `url(${deliveryImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className="relative w-full h-[300px] rounded-lg"
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <h1 className="text-3xl font-bold">Delivery Information</h1>
          </div>
        </div>

        {/* STEP PROCESS (Different from Services) */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
            How Delivery Works
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">

            <div>
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <p className="mt-2 font-semibold">Place Order</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <p className="mt-2 font-semibold">Processing</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <p className="mt-2 font-semibold">Shipping</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                4
              </div>
              <p className="mt-2 font-semibold">Delivered</p>
            </div>

          </div>
        </div>

        {/* DETAILS SECTION (Not cards) */}
        <div className="mt-12 space-y-6">

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-green-800">Delivery Coverage</h3>
            <p>We deliver to all states nationwide including Lagos, Abuja, Port Harcourt and more.</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-green-800">Delivery Time</h3>
            <p>Orders are delivered within 2–5 working days depending on your location.</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-green-800">Delivery Fees</h3>
            <p>Delivery cost is calculated at checkout based on your location.</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-green-800">Order Tracking</h3>
            <p>You will receive updates and can track your order after purchase.</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Delivery;