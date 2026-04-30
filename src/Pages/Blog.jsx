import ControlApi from "../Api/ControlApi"
import Quotes from "../Api/Quotes"
import interior from '../Img/interior.jpg'
import interior2 from '../Img/interior2.jpg'
function  Blog({setAdd}){
    

    return(
       <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] min-h-screen p-4">
        <div className="w-full relative">
            <img src={interior} className="object-cover w-full p-4 h-[400px] "/>
            <div className="absolute z-10 bg-white/90 w-[400px] h-[200px] bottom-10 left-10">
               <Quotes/>
            </div>
            </div>
              <div className="w-full max-w-[1200px] min-h-screen p-4">
                <div>
                  <h1 className="text-center text-green-800 font-bold text-[22px] md:text-[30px] p-4">Latest Items</h1>  
                </div>
                <ControlApi setAdd={setAdd}/>
                </div>

                <div className='flex flex-col p-4 gap-2 w-full'>
                  <div> <h1 className="text-center text-green-800 font-bold text-[22px] md:text-[30px] p-4"> Modern Living Ideas </h1>  </div>
                  <div className="flex w-full items-center gap-2">
                    <img src={interior2} className="object=cober w-1/2 h-[300px]" alt="" />  
                   <p className="w-1/2">A modern living room focuses on simplicity, comfort, and elegance. Neutral colors, soft lighting, and minimal furniture create a calm and welcoming atmosphere. Every element is carefully placed to balance beauty and functionality, making the space perfect for relaxation and social interaction.</p>
                  </div>
                                 
                </div>
                </div>
        </div>
    )
}
export default Blog