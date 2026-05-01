import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FakeStore from "../Api/FakeStore";
import unsplash from "../Api/Unsplash";
import { FaStar } from "react-icons/fa";

function DataFull({ setAdd }) {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
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
          rate: product?.rating?.rate || 0,
          id: product?.id || image.id,
        };
      });

      const found = Combined.find((item) => String(item.id) === id);
      setData(found);
    };

    getData();
  }, [id]);

  if (!data)
    return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* IMAGE */}
      <img
        src={data.urls.small}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      {/* TITLE */}
      <h1 className="text-2xl font-bold mt-4">
        {data.title}
      </h1>

      {/* USER */}
      <p className="text-gray-500 mt-2">
        By {data?.user?.name}
      </p>

      {/* RATING */}
      <div className="flex items-center gap-2 mt-2">
         <p>Rate: {data.rate}</p>
        <FaStar className="text-yellow-500" />
      </div>

      {/* PRICE */}
      <p className="mt-4 text-green-700 font-bold text-xl">
        ${data.price}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-4 text-gray-700">
        {data.description}
      </p>

      {/* ADD TO CART */}
      <button
        onClick={() =>
          setAdd((prev) => {
            const existing = prev.find((i) => i.id === data.id);

            if (existing) {
              return prev.map((p) =>
                p.id === data.id
                  ? { ...p, quantity: (p.quantity || 0) + 1 }
                  : p
              );
            } else {
              return [...prev, { ...data, quantity: 1 }];
            }
          })
        }
        className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg text-sm font-semibold transition"
      >
        Add to Cart
      </button>

    </div>
  );
}

export default DataFull;