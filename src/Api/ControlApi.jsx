import { useEffect, useState } from "react";
import FakeStore from "./FakeStore";
import unsplash from "./Unsplash";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function ControlApi({ setAdd }) {
  const [displayApi, setDisplayApi] = useState([]);
  const [error, setError] = useState("");
  const Navigate=useNavigate()

  useEffect(() => {
    const showApi = async () => {
      try {
        const [fakeStoreApi, unsplashApi] = await Promise.all([
          FakeStore(),
          unsplash(),
        ]);

        const Combined = unsplashApi.map((image, index) => {
          const product = fakeStoreApi?.[index];

          return {
            ...image,
            description: product?.description || "No description",
            price: product?.price || 0,
            title: product?.title || image.alt_description,
            Rate:product?.rating.rate || 0,
            id: product?.id || image.id,
          };
        });

        setDisplayApi(Combined);
      } catch (error) {
        console.log(error);
        setError("No Data Connection");
      }
    };

    showApi();
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">
        Featured Products
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayApi.length > 0 ? (
          displayApi.map((item, index) => (
            <div
              key={item.id || index}
              className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={item?.urls?.small}
                  alt={item?.alt_description}
                  className="w-full h-[160px] md:h-[220px] object-cover group-hover:scale-110 transition duration-500"
                />

                {/* OVERLAY */}
                <div onClick={() => Navigate(`/datafull/${item.id}`)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                    View More
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3 space-y-2">
                <h1 className="font-semibold text-sm text-gray-800 line-clamp-1">
                  {item.title}
                </h1>

                <p className="text-xs text-gray-500">
                  By {item?.user?.name}
                </p>
                 <div className="flex item-center justify-between p-2 w-full">
                <p className="font-bold text-green-700">
                  ${item.price}
                </p>
                <div className="flex items-center gap-2 ">
                  <FaStar className="text-yellow-600"/>
                <p>
                  {item.Rate}
                </p>
                </div>
                </div>
                {/* BUTTON */}
                <button
                  onClick={() =>
                    setAdd((prev) => {
                      const existing = prev.find((i) => i.id === item.id);

                      if (existing) {
                        return prev.map((p) =>
                          p.id === item.id
                            ? { ...p, quantity: (p.quantity || 0) + 1 }
                            : p
                        );
                      } else {
                        return [...prev, { ...item, quantity: 1 }];
                      }
                    })
                  }
                  className="w-full mt-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 col-span-4">
            {error || "Loading..."}
          </p>
        )}
      </div>
    </div>
  );
}

export default ControlApi;