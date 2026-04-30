import interior from '../Img/interior.jpg';

function Service() {

  const services = [
    {
      id: 1,
      title: 'Delivery Services',
      details: [
        'Nationwide / local delivery',
        'Delivery timeframe 2–5 days',
        'Tracking availability'
      ]
    },
    {
      id: 2,
      title: 'Payment Options',
      details: [
        'Card payment',
        'Bank transfer',
        'Pay on delivery'
      ]
    },
    {
      id: 3,
      title: 'Additional Services',
      details: [
        'Gift packaging',
        'Personal shopping assistance',
        'Customer support (24/7)'
      ]
    },
    {
      id: 4,
      title: 'Why Choose Us',
      details: [
        'High-quality products',
        'Fast delivery',
        'Secure payment'
      ]
    }
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] min-h-screen p-4">

        {/* HERO SECTION */}
        <div
          style={{
            backgroundImage: `url(${interior})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className="relative w-full h-[400px] rounded-lg overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center  text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              Our Services
            </h1>
            <p className="font-semibold mt-2 font-bold">
              Best Online Interior Decoration Experience
            </p>
            <a href='/'>
            <button className='bg-green-900 hover:bg-green-500 duration-300 transform transition  font-bold p-2 rounded-md cursor-pointer mt-4'>Home</button>
            </a>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <div className="w-full pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center hover:scale(105) duration-300 transform transition justify-center text-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition"
              >
                <h2 className="text-green-800 font-bold text-xl mb-3">
                  {service.title}
                </h2>

                {service.details.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    • {item}
                  </p>
                ))}
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Service;