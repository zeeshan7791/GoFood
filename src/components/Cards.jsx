import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer'
export default function Cards(props) {
  let dispatch=useDispatchCart()
  let data=useCart()

  console.log(props.fiterItems.options[0])
  let options=props.fiterItems.options[0]
  let priceOptions=Object.keys(options)
  // console.log(priceOptions)
  const handleAddtoCart=async()=>{
    let food=[]
    for(const item of data){
      if(item.id===props.fiterItems._id){
        food=item
        break;
      }
    }
    if(food.size===size){
await dispatch({type:"UPDATE",id:props.fiterItems._id,price:finalPrice,qty:qty})
return
    }
    else if(food.size!==size){

      await dispatch({type:"ADD",id:props.fiterItems._id,name:props.fiterItems.name,price:finalPrice,qty:qty,size:size,img:props.fiterItems.img})
      // console.log(data,'here is cart value')
      return
    }
    await dispatch({type:"ADD",id:props.fiterItems._id,name:props.fiterItems.name,price:finalPrice,qty:qty,size:size,img:props.fiterItems.img})
return
}
  const[qty,setQty]=useState(1)
  const[size,setSize]=useState('')
  let finalPrice=qty*parseInt(options[size])
  const priceRef = useRef()

useEffect(() => {
  setSize(priceRef.current.value)
}, [setSize])
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
        <img src={props.fiterItems.img} className="imageCon" alt="..." />

          <div className="card-body">
            <h5 className="card-title">{props.fiterItems.name}</h5>
            <div className="container ">
            <select
              className='m-2 h-100 bg-success rounded'
              onChange={(e)=>setQty(e.target.value)} >
                {/* {[...Array(6)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))} */}
                 {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
              className='m-2 h-100 bg-success rounded'
              ref={priceRef}
              onChange={(e)=>setSize(e.target.value)} >
                {
                  priceOptions.map((item)=>{
                    return <option key={item} value={item}>{item}</option>
                  })
                }
                
              </select>
              <div className="d-inline  h-100 fs-5">{finalPrice}</div>
            </div>
            <hr/>
            <hr/>
            <button className={`btn btn-success justify-center ms-2`}
            onClick={handleAddtoCart}
            
            >Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
