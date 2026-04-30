import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

function Adminpanel({setShowData}) {
  const fileRef = useRef(null);

  const [fileName, setFileName] = useState("No file selected");

  // One state for everything
  const [formData, setFormData] = useState({
    image: null,
    preview: "",
    Title: "",
    Price: "",
    Description: "",
  });

  // Final display state
  
  // Open file input
  const handleOpenFile = () => {
    fileRef.current.click();
  };

  // Handle file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));

      setFileName(file.name);
    }
  };

  // Handle inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    setShowData(formData);

    // Optional: reset form
    setFormData({
      image: null,
      preview: "",
      Title: "",
      Price: "",
      Description: "",
    });

    setFileName("No file selected");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center w-full">

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-900">
          Create Item
        </h1>

        <p className="text-gray-600 mb-6">Dashboard</p>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="w-full md:w-1/2 p-4">

            {/* Upload Box */}
            <div
              onClick={handleOpenFile}
              className="w-full h-[300px] border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
            >
              <FaPlus className="text-3xl text-green-700 mb-3" />

              <p className="bg-green-800 text-white px-4 py-2 rounded-md font-bold">
                Browse File
              </p>

              <p className="text-sm text-gray-500 mt-3">
                {fileName}
              </p>
            </div>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
            />

          </div>

          {/* Inputs */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4 p-4 md:p-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-900">
              Main Details
            </h1>

            <div className="w-full grid grid-cols-2 gap-2">

              <div className="flex flex-col gap-2">
                <p>Title</p>
                <input
                  name="Title"
                  type="text"
                  value={formData.Title}
                  onChange={handleInputChange}
                  className="w-full pl-4 h-[100px] border-2 border-dashed border-gray-400 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p>Price</p>
                <input
                  name="Price"
                  type="number"
                  value={formData.Price}
                  onChange={handleInputChange}
                  className="w-full pl-4 h-[100px] border-2 border-dashed border-gray-400 rounded-lg"
                />
              </div>

              <div className="col-span-2 flex flex-col gap-2">
                <p>Description</p>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  className="w-full pl-4 h-[100px] border-2 border-dashed border-gray-400 rounded-lg"
                />
              </div>

            </div>
          </div>

          <button className="p-2 bg-yellow-600 rounded-md text-white font-bold mt-4">
            Create Item
          </button>
        </form>


      </div>
    </div>
  );
}

export default Adminpanel;