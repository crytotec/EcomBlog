import { Link } from "react-router-dom";

function Footer() {
    
  return (
    <div className="w-full bg-gray-900 text-white mt-20">

      <div className="max-w-[1200px] mx-auto px-4 py-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <h1 className="text-2xl font-bold text-yellow-500">
              My Store
            </h1>
            <p className="text-gray-300 mt-3">
              We deliver quality products with fast and secure shipping.
              Your satisfaction is our priority.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>

            <div className="flex flex-col gap-2 text-gray-300">
              <Link to="/" className="hover:text-yellow-500">Home</Link>
              <Link to="/service" className="hover:text-yellow-500">Service</Link>
              <Link to="/delivery" className="hover:text-yellow-500">Delivery</Link>
              <Link to="/cart" className="hover:text-yellow-500">Cart</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>

            <p className="text-gray-300">Email: support@mystore.com</p>
            <p className="text-gray-300 mt-2">Phone: +234 800 000 0000</p>
            <p className="text-gray-300 mt-2">
              Location: Rivers State, Nigeria
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">

          <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-yellow-500 cursor-pointer">Privacy</span>
            <span className="hover:text-yellow-500 cursor-pointer">Terms</span>
            <span className="hover:text-yellow-500 cursor-pointer">Support</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Footer;