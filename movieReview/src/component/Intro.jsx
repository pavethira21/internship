import { useEffect, useState } from "react"
// import data from '../assets/data.json'
// import DropDown from "./DropDown"
// import Card from "./Cards"
import actors from '../assets/actors.json'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import { useNavigate } from "react-router-dom" 

const Intro =()=>{
  
  var settings = {
    dots: true,
    infinite: true, 
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800, 
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  const [data,setData] = useState([])
  function handleFetch(){
    fetch('http://localhost:5000/fetchLatest')
    .then(res=>res.json())
    .then(data =>setData(data))
    .catch(err=>err)

   
  }

  useEffect(()=>{
    handleFetch()
    

  },[])
 
   const navigate = useNavigate();
   console.log(data) 
  //  handlefetch()
    // const [category, setCategory] = useState('')
    // const [selectedGenre,setselectedGenre] =useState('')
    // const selectedCategory = data[0][category]
    // const [log,setlog] = useState(false)
  

  function handleMovieList(item,i){
    console.log(item.title)
    return(
      <div key={i} className="latest-movies">
      <img style={{height:"80px"}} src= {`${item.url}`} alt="movie img"/>
      <h3>{item.title}</h3><br/>
      <h4> {item.year}</h4> <h4>  {item.runtime}</h4>
      </div>
    )
  }
  function handleLog(){
    
    localStorage.setItem("userName",'')
    localStorage.setItem("password",'')
    navigate('/login')
  }
  function handleReg(){
    navigate('/register')
  }
  
    return(
      <>

        <ul className="navBar">
          <li ><a style={{backgroundColor:"#f3ce13",color:"black"}}>IMHO</a></li>
          <li style={{float:"right"}}><a onClick={handleReg}>SignUp</a></li>
          <li style={{float:"right"}}><a onClick={handleLog}>SignIn</a></li>
        </ul>
        
        <div className="first-elements">
          <div className="imgdisplay">

          </div>
          <div className="sample-card">
            <div>
              Latest Hits
             </div>
              <div>
               {data && data.map((item,i)=>handleMovieList(item,i))}
           </div> 

            
            
            

          </div>
          
        </div><br/>
        <div className="heading">ACTORS</div>
        <div className="carousel">
          <div className="cor">
            <div className="single-cor">
              <Slider {...settings}>
            
                {actors.map((actor,i)=>(
                  
                 
                  <div key={i} className="cor-back">
                    
                    <div className="img-back"><img  src={actor.url}/></div>
                    <div className="name-back"><p>{actor.Name}</p> </div>
                  </div>
                
                  
                ))}
              
          </Slider>
          </div>
            </div>
           
        </div>
        
        
       <footer className="footer">
        <p>&copy; {new Date().getFullYear()} InMyHonestOpinion. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
       </footer>
            
        
        {/* <div style={{height:"50px"}}>
        <h1>View Movies or Series Details</h1>
        <h3>search your favorite or new movie/series view reviews post reviews and engage with your fellow movie geeks</h3>
        <h3>Sign In for More ....</h3>
        </div> */}

      

        
        
    
        
        </>
            
        
        
    )
    
}

export default Intro;