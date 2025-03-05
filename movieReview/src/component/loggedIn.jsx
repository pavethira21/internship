import { useState,useEffect } from "react"
import Card from "./Cards"
import { useNavigate } from "react-router-dom"

const Loggedin =()=>{
  const [category, setCategory] = useState('')
    const [selectedGenre,setselectedGenre] =useState('')
    
   const navigate = useNavigate();
    function handleSelectedGenre(event){
        setselectedGenre(event.target.value)
        console.log(selectedGenre)
      }
    const imageCollection=[
        "https://upload.wikimedia.org/wikipedia/en/0/06/The_Gentlemen_poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/1/1f/Dolittle_%282020_film_poster%29.png",
        "https://upload.wikimedia.org/wikipedia/en/e/ed/The_Murder_of_Nicole_Brown_Simpson_poster.jpg",
       

    ]
    const uName=localStorage.getItem('userName')
    const[datas , setData] =useState([])
    function handleFetch(){
      if(category =="Movies"){
        fetch('http://localhost:5000/fetchMovies')
        .then(res=>res.json())
        .then(data =>setData(data))
        .catch(err=>err)
      }else if (category =="Series"){
        fetch('http://localhost:5000/fetchSeries')
        .then(res=>res.json())
        .then(data =>setData(data))
        .catch(err=>err)
      }
    }
    useEffect(()=>{
      handleFetch()
    },[category])
    console.log(datas)   
  const genre = ['Action','Thriller','Horror','Science Fiction','Comedy','Drama','Crime','Mystery','Fantasy','Adventure','Supernatural']
  const selectedCategory = datas
  const [log,setlog] = useState(false)
  function handleHome(){
    console.log(uName)
    setCategory( )
    setselectedGenre('')
    {uName?navigate('/userLogged'):navigate('/')}
  }
  function handleLog(){
    setlog(true);
    localStorage.setItem('userName'," ")
    localStorage.setItem('password'," ")
    navigate('/')
  }
  
    return(
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
        <li><select style={{float:"right" ,backgroundColor:"black",color:"white"}} onChange={handleLog}><option value=''  className="navbut" style={{float:"right"}} >{uName}</option>
        <option className="navbut" style={{float:"right"}} value="logOut" >LogOut</option>
        </select></li>
        <li></li>
        </ul>
        <div>
        
        

        
        {category && category !=" " ? (
          <>
            <div >
            <Card className="card" displayGenre={selectedGenre} val={selectedCategory} />
            </div>  
          
          </>
        ):<div className="first-element">
        
        <div className="imgdisplay">
          
        </div >
        <div className="sample-card" > 
        {imageCollection.map((items,i)=>{
            return(<div key={i} className="latest-movies"><img  style={{height:"100px",width:"auto", padding:"5px"}} src={items} alt="Hello" /></div>)
    

         })}
         </div>
         

         
    </div> }
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
        </>
            
        
        
    )
    
}

export default Loggedin;