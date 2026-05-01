import ControlApi from "../Api/ControlApi"
import Quotes from "../Api/Quotes"
import interior from '../Img/interior.jpg'
import interior2 from '../Img/interior2.jpg'
function  Blog({setAdd}){
    

    return(
       <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] min-h-screen p-4">
        <div className="w-full h-[400px] relative">
            <img src={interior} className="object-cover w-full p-4 h-full "/>
           <p className='absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[20px] md:text-[40px]'>Welcome to Our Blog</p>
            </div>
              <div className="w-full max-w-[1200px] min-h-screen p-4">
                <div>
                  <h1 className="text-center text-green-800 font-bold text-[22px] md:text-[30px] p-4">Latest Items</h1>  
                </div>
                <ControlApi setAdd={setAdd}/>
                </div>

                <div className='flex flex-col p-4 gap-2 w-full'>
                  <div> <h1 className="text-center text-green-800 font-bold text-[22px] md:text-[30px] p-4"> Modern Living Ideas </h1>  </div>
                  <div className="flex flex-col md:flex-row w-full items-center gap-4">
                    <img src={interior2} className="object=cober   w-full md:w-1/2 h-[300px]" alt="" />  
                   <p className="w-full md:w-1/2">A modern living room focuses on simplicity, comfort, and elegance. Neutral colors, soft lighting, and minimal furniture create a calm and welcoming atmosphere. Every element is carefully placed to balance beauty and functionality, making the space perfect for relaxation and social interaction.</p>
                  </div>
                                 
                </div>
                </div>
        </div>
    )
}
export default Blog