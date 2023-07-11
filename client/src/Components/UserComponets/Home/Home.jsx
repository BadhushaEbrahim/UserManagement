import React from 'react'
import { useSelector } from 'react-redux'

import './Home.css'

function Home() {

    const username=useSelector((state=>state.username))

  return (
    <div id="carouselExampleControls" className="carousel slide " data-bs-ride="carousel" >
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="https://www.wallpapertip.com/wmimgs/66-666819_website-design-background-creative-background-image-for-website.jpg" className="homePageImage" alt="..."/>
        <span className="homeHeader">WELCOME HOME </span>
        <span className="homeName">{username}</span>
     </div>  
    </div>
    </div>
 
  )
}

export default Home

