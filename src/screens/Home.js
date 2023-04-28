import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { useState,useEffect } from "react";
export default function Home() {
  const[search,setSearch]=useState('')
  const[foodCat,setFoodCat]=useState([])
  const[foodItem,setFoodItem]=useState([])
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fooditems", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodCat(data.foodCategories)
      setFoodItem(data.foodItems)
      console.log(data.foodItems, 'here is food items and category');
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=>{
loadData()
  },[])
  
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
       
       
       <div id="carouselExampleControls" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}} data-bs-ride="carousel">
   <div className="carousel-inner" id='carousel'>
   <div className="carousel-caption" style={{zIndex:"10"}}> 
        <div className="d-flex">
       <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
         />
       {/* <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
     </div>
     </div>
     <div className="carousel-item active">
       <img src="https://source.unsplash.com/random/100×100/?burger" style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
     </div>
     <div className="carousel-item">
       <img src="https://source.unsplash.com/random/300×300/?pastry" style={{filter:"brightness(30%)"}}  className="d-block w-100" alt="..."/>
     </div>
     <div className="carousel-item">
       <img src="https://source.unsplash.com/random/300×300/?barbeque" style={{filter:"brightness(30%)"}}  className="d-block w-100" alt="..."/>
     </div>
   </div>
   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Previous</span>
   </button>
   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
     <span className="carousel-control-next-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Next</span>
   </button>
 </div>
     </div>
      <div className="container">
  {
    foodCat.length !== 0 ? // check if foodCat array is not empty
      foodCat.map((cat) => {
        return (
          <div className="row mb-3" key={cat._id}> {/* add key prop to outer div */}
            <div className="fs-3 m-3">
              {cat.CategoryName}
            </div>
            <hr />
            {
              foodItem.length !== 0 ? // check if foodItem array is not empty
                foodItem.filter((fitem) => fitem.CategoryName === cat.CategoryName&&fitem.name.toLowerCase().includes(search.toLocaleLowerCase())) // filter food items based on category
                  .map((fiterItems) => {
                    return (
                      <div key={fiterItems._id} className="col-12 col-md-4 col-lg-3 mx-4 ">
                        <Cards
                        fiterItems={fiterItems}
                        />
                      </div>
                    )
                  })
                : "no data found" // correct spelling
            }
          </div>
        )
      })
      : "--------"
  }
</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
// {
//   _id:ObjectId("6431c5704586b06cd2e3f7f0"),
//   CategoryName:"Biryani/Rice"<
//   name:"Chicken Fried Rice"
//   img:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-…",
  
//   options,Array, 
//   description:"Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer…"
// }

// {
//   _id:ObjectId('6431c5994586b06cd2e3f7ff"),
// CategoryName:"Pizza"

// }