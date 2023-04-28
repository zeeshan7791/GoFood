import React from 'react'
import { useState } from 'react'
export default function Carousel() {
  const[search,setSearch]=useState('')

  return (
    <div>
       
       
      <div id="carouselExampleControls" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}} data-bs-ride="carousel">
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption" style={{zIndex:"10"}}> 
       <div className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.ta
        .value)}}/>
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
  )
}
