import { useState,useEffect } from "react"
import Card from "./Cards"
import { useNavigate } from "react-router-dom"
import Modal from "./Modal"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"


const Loggedin =()=>{
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
  const [modalState,setModal] = useState(false)
  const [category, setCategory] = useState('')
    const [selectedGenre,setselectedGenre] =useState('')
    const userGenre = localStorage.getItem("userGenre")
    console.log(userGenre)
   const navigate = useNavigate();
    
    const imageCollection=[
        "https://upload.wikimedia.org/wikipedia/en/0/06/The_Gentlemen_poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/1/1f/Dolittle_%282020_film_poster%29.png",
        "https://upload.wikimedia.org/wikipedia/en/e/ed/The_Murder_of_Nicole_Brown_Simpson_poster.jpg",
       

    ]
    const uName=localStorage.getItem('userName')
    const[datas , setData] =useState([])
    function handleFetch(){
      
      if(category =="Movies"){
        fetch(`http://localhost:5000/fetchMovies?genre=${selectedGenre}`)
        .then(res=>res.json())
        .then(data =>setData(data))
        .catch(err=>err)
      }else if (category =="Series"){
        fetch(`http://localhost:5000/fetchSeries?genre=${selectedGenre}`)
        .then(res=>res.json())
        .then(data =>setData(data))
        .catch(err=>err)
      }
      else{
        fetch(`http://localhost:5000/fetchMovies?genre=${userGenre}`)
        .then(res=>res.json())
        .then(data =>setData(data))
        .catch(err=>err)

      }
    }
    useEffect(()=>{
      handleFetch()
    },[category,selectedGenre])
    console.log(datas)   
  const genre = ['Action','Thriller','Horror','Science Fiction','Comedy','Drama','Crime','Mystery','Fantasy','Adventure','Supernatural']
  const selectedCategory = datas

  function handleSelectedGenre(event){
    setselectedGenre(event.target.value)
    
    console.log(selectedGenre)
  }
  function handleHome(){
    
    setCategory( )
    setselectedGenre('')
    {uName?navigate('/userLogged'):navigate('/')}
  }
  function handleMovie(items){
    
    const {title,year,cast,genres,extract,thumbnail } = items
    localStorage.setItem("title",title)
                localStorage.setItem("year",year)
                localStorage.setItem("cast",cast)
                localStorage.setItem("genre",genres)
                localStorage.setItem("extract",extract)
                localStorage.setItem("thumbnail",thumbnail)
                
                navigate('/movies')

   } 
  function handleLog(e){
    if(e.target.value =="logOut"){
    localStorage.setItem('userName'," ")
    localStorage.setItem('password'," ")
    navigate('/')
    }else if(e.target.value =="delete"){
        setModal(true)
        e.target.value = ''
    }
  }
  function handleLogged(){
    useEffect(()=>{
      navigate('/login')
    })
  }
  
  function handleDelete(val){
    if(val){
      let res = fetch(`http://localhost:5000/DeactuvateUser?uName=${uName}`,{
        method:"DELETE",
        headers:{'content-type':'application/json'},
        
      })
      console.log(res)
      localStorage.setItem('userName'," ")
    localStorage.setItem('password'," ")
    navigate('/')
      setModal(false)
      
    }
    else
      setModal(false)
  }
  console.log(uName)
    return((uName !=' '?
      <>
       
        <ul className="navBar" >
        <li><a className="navbut" style={{backgroundColor:"#f3ce13",color:"black"}}  onClick={handleHome}>IMHO</a></li>
        <li><a className="navbut" onClick={()=>{setCategory("Movies"), setselectedGenre('')}} style={{backgroundColor:(category=="Movies")&&"#f3ce13"}} >Movie</a></li>
        <li><a className="navbut" onClick={()=>{setCategory("Series"), setselectedGenre('')}} style={{backgroundColor:(category=="Series")&&"#f3ce13"}} >Series</a></li>
        <li><select className="selectGenre" style={{visibility:(category?"visible":"hidden")}} defaultValue={"select"}   onChange={handleSelectedGenre}>
        <option  value=" " disabled  >GENRE</option>
        {genre.map((items,i)=>{
            
            return(<option key={i} value={items}>{items}</option>)
            
        })}
         
        
    </select></li>
        <li><select  style={{float:"right" ,backgroundColor:"black",color:"white",WebkitAppearance:"none"}} onChange={handleLog}>
          <option value=''  className="navbut" style={{float:"right"}} >{uName}</option>
        <option className="navbut" style={{float:"right"}} value="logOut" >LogOut</option>
        <option className="navbut" style={{float:"right"}} value="delete" >Delete Account</option>
        </select></li>
        <li></li>
        </ul>
        {modalState&&<Modal handle={handleDelete}>You want to deactivate account?</Modal>}
        <div>
        
        
        

        
        {category && category !=" " ? (
          <>
            <div >
            <Card className="card"  val={selectedCategory} />
            </div>  
          
          </>
        ):<><div className="first-element">
        
        <div className="imgdisplay">
          
        </div >

        <div className="sample-card" > 
        {imageCollection.map((items,i)=>{
            return(<div key={i} className="latest-movies"><img  style={{height:"100px",width:"auto", padding:"5px"}} src={items} alt="Hello" /></div>)
    

         })}
         </div>
         

         
    </div><br/>

    <div style={{margin:"5%"}}><p style={{fontSize:"large",fontWeight:"bold"}}>View Latest Movies / Series .Engage with Community and interact with fello cinephile </p></div>
    
    
    <div className="carousel">
    
    <div className="cor">
      <div className="single-cor">
        
        <Slider {...settings}>
      
          {datas.map((data,i)=>(
           
            <div key={i} className="cor-back">
              
              <div className="img-back"><img  src={data.thumbnail} onClick={()=>handleMovie(data)}/></div>
              <div className="name-back"><p>{data.title}</p> </div>
            </div>
           
            
          ))}
        
    </Slider>
    </div>
      </div>
      
  </div>
  <div className="heading"><h3>Recommmended for you</h3></div>
  
  </>
    }
    <div>
          
          </div>
    
        </div>
        <footer className="footer">
       
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
        <p>InMyHonestOpinion</p>
        <p>&copy; {new Date().getFullYear()}@ IMHO . All rights reserved.</p>
      </footer>
        </>:handleLogged()
    )
       
            
        
        
    )
    
}

export default Loggedin;