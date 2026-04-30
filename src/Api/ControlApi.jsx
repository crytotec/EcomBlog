import { useEffect, useState } from "react";
import FakeStore from "./FakeStore";
import unsplash from "./unsplash";
import { ImInsertTemplate } from "react-icons/im";

function ControlApi({setAdd}) {
  const [displayApi, setDisplayApi] = useState([]);

  useEffect(() => {
    const showApi = async () => {
      const fakeapi = await FakeStore();
      const title = fakeapi[0]?.title;

      const GetApi = await unsplash(title);
      setDisplayApi(GetApi);
    };

    showApi();
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      
      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">
        Featured Products
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {displayApi.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={item.urls.small}
                alt={item.alt_description}
                className="w-full h-[160px] md:h-[220px] object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-3 space-y-2">

              <h1 className="font-semibold text-sm md:text-base text-gray-800 line-clamp-1">
                {item.alt_description || "Beautiful Product"}
              </h1>

              <p className="text-xs text-gray-500">
                By {item.user.name}
              </p>
                <h1 className="font-semibold text-sm md:text-base text-gray-800 line-clamp-1">
              Price:  ₦5000
              </h1>
              {/* BUTTON */}
              <button onClick={() => setAdd(prev => {
                const existing = prev.find(i => i.id === item.id)

                if (existing) {
                  return prev.map((index)=> index.id === item.id ? {...index, quantity: (index.quantity || 0) + 1, price: 5000}: index)
                }else{
                  return [...prev, {...item, quantity: 1, price: 5000}]
                }
              })}  className="w-full mt-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm transition">
                Add to Cart
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ControlApi;