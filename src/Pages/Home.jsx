import { FaAccessibleIcon, FaArrowRight, FaArrowLeft, FaPenNib, FaStar, FaInstagram, FaArrowDown, FaArrowUp, FaEnvelope } from "react-icons/fa";
import { Products, DeliveryDetails, items, Latest } from "../Data/data";
import { useEffect, useState } from "react";
import chair from '../Img/chair.jpg';
import chair1 from '../Img/chair1.jpg';
import chair2 from '../Img/chair2.jpg';
import interior from '../Img/interior.jpg';
import interior3 from '../Img/interior3.jpg';
import interior2 from '../Img/interior2.jpg';
import lady from '../Img/lady.jpeg';
import man from '../Img/man.jpeg'
import { Link } from "react-router-dom";
function Home({showData}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, SetProduct]=useState(Products);
  const [currentproduct, setCurrentproduct]=useState(0)
  const [isMobile, setMobile]=useState(window.innerWidth <= 760)
  const Text=[{id:1, img:interior, name:'Furniture Trends 2024', subdetails:'What" Hot and what +' + 's Not', details:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, voluptas ullam, fuga iste animi consequuntur pariatur veritatis rerum repellendus explicabo a illo facilis consectetur similique doloribus, vero voluptatum excepturi quisquam.'},
              {id:2, img:interior, name:'Furniture Trends 2024', subdetails:'What" Hot and what +' + 's Not', details:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, voluptas ullam, fuga iste animi consequuntur pariatur veritatis rerum repellendus explicabo a illo facilis consectetur similique doloribus, vero voluptatum excepturi quisquam.'},
              {id:3, img:interior, name:'Furniture Trends 2024', subdetails:'What" Hot and what +' + 's Not', details:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, voluptas ullam, fuga iste animi consequuntur pariatur veritatis rerum repellendus explicabo a illo facilis consectetur similique doloribus, vero voluptatum excepturi quisquam.'}
  ]

   const Social=[{id:1, img:interior2, icon:FaInstagram},
              {id:2, img:interior2, icon:FaInstagram},
              {id:3, img:interior2,icon:FaInstagram }
  ]

   const FAQ=[{id:1, Question:'What Kind of Furniture Do you Offer?', Answer:'All Kinds of Furniture are Available'},
              {id:2, Question:'Can I Track My Furniture Delivery?', Answer:'Yes Ofcourse Just Message the Customer Care'},
              {id:3, Question:'Are there any discount or promotion available?', Answer:'Yes If you refer people to US'}
  ]


 const [SeeMore, _]=useState(null)
 const [option, setOption]=useState(null)
  const Now=new Date()
const totalSlide = items.length;

  useEffect(() => {
    const Interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % totalSlide);
    }, 3000);

    return () => clearInterval(Interval);
  }, [totalSlide]);

  const slidesPerView = [
    items[currentIndex],
    items[(currentIndex + 2) % totalSlide],
  ];

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % totalSlide);
  }

  function prevSlide() {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlide - 1 : prev - 1
    );
  }

  const ShowProduct= isMobile ? [product[currentproduct], product[(currentproduct + 1) % product.length]] :
  [product[currentproduct],
   product[(currentproduct + 1) % product.length],
   product[(currentproduct + 2) % product.length],
   product[(currentproduct + 3) % product.length],
   ]


   useEffect(()=>{
     const HandSize = () =>{
      setMobile(window.innerWidth <= 760);
     }
     window.addEventListener('resize', HandSize)
     return () => window.removeEventListener('resize', HandSize)
   },[product.length])

   useEffect(()=>{
    const interval = setInterval(() => {
      setCurrentproduct((prev)=> (prev + 1) %product.length)
    }, 2000);

    return () => clearInterval(interval)
   },[product.length])
   
   return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] min-h-screen p-4">

        {/* TOP BADGE */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-white w-fit rounded-lg px-3 py-2 shadow-sm">
            <FaAccessibleIcon className="text-green-900" />
            <p className="text-sm md:text-base">Best Online Store</p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col md:flex-col lg:flex-row gap-8 items-center">

          {/* TEXT */}
          <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-900">
              Explore Our <span className="text-green-700">Modern Furniture Collection</span>
            </h1>

            <p className="text-gray-600">
              Discover stylish, modern furniture designed for comfort and elegance.
            </p>

            <div className="flex gap-4 items-center">
              <Link to='/Product'>
              <button className="bg-green-900 text-white px-5 py-3 rounded-md flex items-center gap-2">
                Shop Now <FaArrowRight />
              </button>
              </Link>
              <a href="/Product" className="underline font-semibold">
                View All Products
              </a>
            </div>
          </div>

          {/* SLIDER */}
          <div className="relative w-full lg:w-1/2">

            <div className="absolute inset-0 flex justify-between items-center px-2 z-10">
              <button onClick={prevSlide} className="bg-green-800 text-white p-3 rounded-full">
                <FaArrowLeft />
              </button>

              <button onClick={nextSlide} className="bg-yellow-500 text-white p-3 rounded-full">
                <FaArrowRight />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {slidesPerView.map((item, index) => (
                <div key={index} className="bg-white rounded-md">
                  <img
                    src={item.img}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                  <div className="flex justify-between p-2">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p>{item.Amount}</p>
                    </div>
                    <FaPenNib className="text-green-900" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* FIXED WHITE BACKGROUND WRAPPER STARTS HERE */}
        <div className="w-full bg-white mt-10 py-10 space-y-10">

          {/* DELIVERY */}
          <div className="flex justify-between shadow-lg flex-wrap p-2">
            {DeliveryDetails.map((item, index) => {
              const Icons = item.icons;

              return (
                <div key={index} className="flex items-center gap-2 p-2">
                  <Icons className="text-[30px] text-green-900" />
                  <div>
                    <p className="font-bold">{item.details}</p>
                    <p>{item.SubDetails}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CHAIRS */}
          <div className="p-2">
            <h1 className="text-center text-green-800 font-bold text-[22px] md:text-[30px] p-4">
              Different Kinds of Chair
            </h1>

            <div className="flex gap-3 h-[500px] p-4 shadow-2xl">

              <div className="w-1/2">
                <img src={chair} className="w-full h-full object-cover rounded-lg" />
              </div>

              <div className="w-1/2 flex flex-col gap-3">

                <img src={chair1} className="h-1/2 object-cover rounded-lg" />
                <img src={chair2} className="h-1/2 object-cover rounded-lg" />

              </div>
            </div>

            <div className="flex justify-center mt-5">
              <Link to='/Product'>
              <button className="bg-yellow-600 text-white cursor-pointer px-6 py-3 rounded-md">
                Check Out Our Product
              </button>
              </Link>
            </div>

          </div>

          {/* PRODUCTS */}
          <div className="mt-10 text-center">
            <p className="font-bold">Our Products</p>
            <h1 className="text-[22px] md:text-[30px] font-bold">
              Our <span className="text-green-800">Products Collections</span>
            </h1>

            <div className="flex gap-4 justify-center p-4">
              <button onClick={() => SetProduct(Products)} className={`p-2 ${product === Products ? 'cursor-pointer rounded-md bg-green-600 text-white font-bold':'cursor-pointer'}`}>All Products</button>
              <button onClick={() => SetProduct(Latest)} className={`p-2 ${product === Latest ? 'cursor-pointer rounded-md bg-green-600 text-white font-bold':'cursor-pointer'}`}>Latest</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">

              {ShowProduct.map((item, index) => {
                const Start = item.Start;

                return (
                  <div key={index} className="bg-gray-200 p-4 relative flex flex-col gap-4">

                    <p className="absolute top-1 left-1 bg-green-900 text-white p-2 rounded-md">
                      {item.discount}
                    </p>

                    <img src={item.img} className="h-[180px] object-contain" />

                    <div className="flex justify-between">
                      <p className="text-gray-500">{item.Category}</p>
                      <Start className="text-yellow-600" />
                    </div>

                    <div>
                      <p className="font-bold">{item.Name}</p>
                      <p className="font-bold">{item.Amount}</p>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </div>
        {/* WHITE WRAPPER ENDS HERE */}


      <div className="flex-wrap items-center bg-white justify-between mt-10 py-10 px-10 space-y-10 w-full h-auto ">
        <div className="flex flex-col items-center w-full justify-center gap-4">
          <h1 className="font-bold text-[22px] md:text-[30px]">Flash <span className="text-green-600">Sale!</span></h1>
           <p className="text-[22px] font-bold text-gray-500">Get 28% off-Limited Time Offer</p>
           <div className="flex item-center font-bold text-[22px] md:text-[30px] gap-4">
            <p className="text-capitalize">{Now.toLocaleString('default', {month:'long'})} :</p>
             
            <p>{Now.getHours()} :</p>
            <p>{Now.getMinutes()} :</p>
            <p>{Now.getSeconds()}</p>
           </div>
           <Link to='/Product'>
           <button className="flex cursor-pointer items-center gap-2 bg-green-600 text-white p-4 font-bold rounded-full">Shop Now <FaArrowRight/> </button>
           </Link>
        </div>
        <div className='flex gap-4 items-center w-full bg-white rounded-md p-2 justify-center h-full'>
          <img src={interior} className="object-cover h-full w-1/2"/>
          <img src={interior3} className="object-cover h-full w-1/2"/>
        </div>         
      </div>
      


       <div className="flex flex-col item-center justify-center w-full h-auto gap-4 mt-10">
               <div className="flex flex-col gap-4">
                <p className="text-gray-600 font-bold">Today Deals</p>
                <h1 className='font-bold text-[22px] md:text-[30px]'><span className='text-green-600'>Deals</span> of the Day</h1>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 mt-4">
              {product.slice(0, 4).map((item, index) => {
                const Start = item.Start;

                return (
                  <div key={index} className="bg-gray-200 p-4 w-full relative flex flex-col gap-4">

                    <p className="absolute top-1 left-1 bg-green-900 text-white p-2 rounded-md">
                      {item.discount}
                    </p>

                    <img src={item.img} className="h-[180px] w-full object-contain" />

                    <div className="flex justify-between">
                      <p className="text-gray-500">{item.Category}</p>
                      <Start className="text-yellow-600" />
                    </div>

                    <div>
                      <p className="font-bold">{item.Name}</p>
                      <p className="font-bold">{item.Amount}</p>
                    </div>

                  </div>
                );
              })}
            </div>
            </div>
            <div className="flex flex-col md:flex-row p-4 item-center justify-center w-full h-auto gap-4 mt-10">
              <div  className="flex flex-col md:flex-row w-full md:w-1/2 gap-4 p-4">
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 font-bold">Flat 20% Discount</p>
                <h1 className='font-bold text-[22px] md:text-[30px]'>Latest Gaming Chairs</h1>
                <p className="text-gray-600 text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, fugiat!</p>
                 <Link to='Product'>
                 <button className="flex cursor-pointer items-center justify-center w-[150px] gap-2 bg-green-600 text-white p-4 font-bold rounded-full">Shop Now <FaArrowRight/> </button>
                </Link>
               </div>
               <img src={chair1} className="object-cover w-full h-[300px]"/>
               </div>

               <div  className="flex flex-col md:flex-row w-full md:w-1/2 gap-4 bg-yellow-500 p-4">
              <div className="flex flex-col  gap-4">
                <p className="text-gray-600 text-white font-bold">Flat 15% Discount</p>
                <h1 className='font-bold text-white text-[22px] md:text-[30px]'>Wood Chairs Collection</h1>
                <p className="text-gray-600 text-white text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, fugiat!</p>
                 <Link to='Product'>
                 <button className="flex cursor-pointer items-center justify-center w-[150px] gap-2 bg-green-600 text-white p-4 font-bold rounded-full">Shop Now <FaArrowRight/> </button>
                 </Link>
               </div>
               <img src={chair2} className="object-cover rounded-md w-full h-[300px]"/>
               </div>

            </div>

          <div className="flex flex-col  p-4 item-center text-center justify-center w-full h-auto gap-4 mt-10">
                <p className="text-gray-600 text-[20px] font-bold">Testimonial</p>
                <h1 className='font-bold text-[22px] md:text-[30px]'>What <span className="text-green-600">Our Clients Say</span></h1> 
          <div className="flex flex-col md:flex-row w-full gap-4 p-4 items-center justify-between">

            <div className='flex flex-col items-start w-full md:w-1/2 gap-4 bg-white p-4'>
             <div className="flex flex-col md:flex-row items-center gap-4 "> 
               <div className="bg-yellow-600 rounded-full p-2">
              <img src={lady} className="object-cover rounded-full w-[100px] h-[100px]"/>
              </div>
              <div className="flex flex-col items-start gap-1">
               <h1 className='font-bold text-[22px] md:text-[30px]'>Lesile Alexander</h1>
                <p className="text-gray-600 text-[20px] font-bold">Architect</p>
                <div className="flex items-center gap-2 ">
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <p>5.0</p>
                </div>
              </div>
             </div>
             <p className="text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident explicabo unde consequatur tenetur cum! Eveniet ut ipsa doloremque pariatur voluptates.</p>
            </div>

            <div className='flex flex-col items-start w-full gap-4 bg-white p-4'>
             <div className="flex flex-col md:flex-row w-full md:w-1/2 items-center gap-4 "> 
              <div className="bg-yellow-600 rounded-full p-2">
              <img src={man} className="object-cover rounded-full w-[100px] h-[100px]"/>
              </div>
              <div className="flex flex-col items-start  gap-1">
               <h1 className='font-bold text-[22px] md:text-[30px]'>John Thomas</h1>
                <p className="text-gray-600 text-[20px] font-bold">Anatomist</p>
                <div className="flex items-center gap-2 ">
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <FaStar className="text-yellow-600" />
                <p>5.0</p>
                </div>
              </div>
             </div>
             <p className="text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident explicabo unde consequatur tenetur cum! Eveniet ut ipsa doloremque pariatur voluptates.</p>
            </div>
         </div>
          </div>

          <div className="flex flex-col w-full gap-4 p-4 items-center justify-between">
         <div className="mt-6">
          {showData && (
            <>
            <div className="flex flex-col items-start w-full ">
                <p className="text-gray-600 font-bold">News & Blogs</p>
                <h1 className='font-bold text-[22px] md:text-[30px]'>Our Latest</h1>
                <h1 className='font-bold text-[22px] md:text-[30px] text-green-600'>News & Blogs</h1>
               </div>
                 <div className="grid grid-cols-2 md:grid-cols-5 w-full gap-4 mt-4">
              {product.slice(0, 4).map((item, index) => {
                const Start = item.Start;

                return (
                  <div key={index} className="bg-gray-200 p-4 w-full relative flex flex-col gap-4">

                    <img src={item.img} className="h-[180px] w-full object-contain" />

                    <div className="flex justify-between">
                      <p className="text-gray-500">{item.Category}</p>
                      <Start className="text-yellow-600" />
                    </div>

                    <div>
                      <p className="font-bold">{item.Name}</p>
                      <p className="font-bold">{item.Amount}</p>
                    </div>

                  </div>
                );
              })}
              <div className="flex flex-col items-center bg-gray-200 p-2 col-span-2 md:col-span-1">
              {showData.preview && (
                <img
                  src={showData.preview}
                  className="w-[300px] h-[100px] object-cover rounded-lg"
                />
              )}
              <h1 className="text-xl font-bold">{showData.Title}</h1>
              <h1>{showData.Description}</h1>
              <h1 className="text-green-700 font-bold">
                ₦{showData.Price}
              </h1>
              </div>
              </div>
            </>
          )}
        </div>

          </div>

              <div className="flex flex-col w-full mt-10 gap-1 p-4 items-center justify-between">
              <p className="font-bold">Follow US</p>
              <h1 className="font-bold text-[22px] md:text-[30px]">On Instagram</h1>        
                <div className='grid grid-cols-1 md:grid-cols-3  w-full items-center gap-4 '>
                  {Social.map((item, index)=>{
                  const Icon=item.icon
                  return(
                    <div key={index} className="flex flex-col bg-white rounded-md p-4  items-start gap-2 relative group overflow-hidden">
                      <img src={item.img} className="object-cover w-full h-[150px]"/>
                      <div className='flex items-center justify-center text-white rounded:md absolute top-0 bottom-0 right-0 left-0 translate-y-full bg-black/70 group-hover:translate-y-0 duration-300 tranition'>
                       <Icon className="w-10 h-10"/>
                       </div>
                    </div>
                  )})}
               </div>
              </div>


              <div className="flex flex-col w-full mt-10 gap-1 p-4 items-center justify-between">
              <p className="font-bold">FAQS</p>
              <h1 className="font-bold text-[22px] md:text-[30px]">Question? <span className="text-green-600">Look Here.</span></h1>        
                <div className="grid grid-cols-1 w-full gap-2">
                  {FAQ.map((item, index)=>(
                    <div key={index} className="bg-white p-2 text-center ">
                      <div onClick={() => setOption(option === index ? null: index)} className="flex justify-between items-center cursor-pointer p-4">
                        <h1>{item.Question}</h1>
                        <div>
                         {option === index ?  <FaArrowUp/> : <FaArrowDown/>}
                        </div>
                        </div>
                    {option === index && ( <div className="flex justify-between items-center p-4">
                        <h1>{item.Answer}</h1>
                        </div>)}   
                    </div>
                  ))}
                </div>
              </div>  

              <div className="flex flex-col w-full mt-10 gap-1 p-4 items-center justify-between">
                 <p className="font-bold">Our NewSLetter</p>
                 <h1 className="font-bold text-[22px] md:text-[30px]">Subscribe to Our Newsletter to Get</h1>
                 <h1 className="font-bold text-[22px] md:text-[30px] text-green-600">Updates to Our Latest Collection</h1>
                 <p className="font-bold text-gray-500">Get 20% of your first order just by subscribing to our newsletter</p>
                  <form className="relative flex flex-col md:flex-row items-center gap-2 pt-4 w-full md:w-[50%]">
                    <div className="absolute left-2 bg-green-600 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                   <FaEnvelope className="text-white text-lg" />
                    </div>
                    <input type='email' placeholder="Enter Email Address" className="rounded-full bg-white border-none h-[50px] w-full focus-outline:none pl-4 "/>
                    <button className="bg-yellow-600 text-white w-full md:w-1/2 font-bold p-2 rounded-full h-[50px]">Subscribe</button>
                  </form>
                  
              </div>
      </div>
    </div>
  );
}

export default Home;