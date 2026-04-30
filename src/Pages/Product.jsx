import ControlApi from "../Api/ControlApi"



function  Product({setAdd}){
    
console.log("Product setAdd:", setAdd);
    return(
       <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] min-h-screen p-4">
              <div className="w-full max-w-[1200px] min-h-screen p-4">
                <div>
                  <h1 className="text-center text-green-800 font-bold text-[22px] md:text-[30px] p-4">Our Product</h1>  
                </div>
                <ControlApi setAdd={setAdd}/>
                </div>

                </div>
        </div>
    )
}
export default Product