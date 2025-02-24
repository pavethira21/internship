import { useState } from "react"
import data from '../assets/data.json'
import DropDown from "./DropDown"
import Card from "./Cards"
import './home.css'

import { useNavigate } from "react-router-dom"

const Intro =()=>{

   
   const navigate = useNavigate();
    function handleSelectedGenre(event){
        setselectedGenre(event.target.value)
        console.log(selectedGenre)
      }
    const imageCollection=[
        "https://upload.wikimedia.org/wikipedia/en/0/06/The_Gentlemen_poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/1/1f/Dolittle_%282020_film_poster%29.png",
        "https://upload.wikimedia.org/wikipedia/en/e/ed/The_Murder_of_Nicole_Brown_Simpson_poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/1/1c/Inherit_the_Viper_%282019%29_Film_Poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/9/9d/The_Last_Full_Measure_2019_poster.jpg"

    ]
    const [category, setCategory] = useState('')
    const [selectedGenre,setselectedGenre] =useState('')
    const selectedCategory = data[0][category]
    const [log,setlog] = useState(false)
  const genre = ['Action','Thriller','Horror','Science Fiction','Comedy','Drama','Crime','Mystery','Fantasy','Adventure','Supernatural']

  function handleHome(){
    setCategory('')
    setselectedGenre('')
  }
  function handleLog(){
    setlog(true);
    localStorage.setItem("userName",'')
    localStorage.setItem("password",'')
    navigate('/login')
   
      
   
   

  }
  
    return(
      <>

<ul style={{borderRadius:"8px"}}>
        <li><button className="navbut"  onClick={handleHome}>Home</button></li>
        <li><button className="navbut" onClick={()=>{setCategory("Movies"), setselectedGenre('')}} style={{backgroundColor:(category=="Movies")&&"red"}} >Movie</button></li>
        <li><button className="navbut" onClick={()=>{setCategory("Series"), setselectedGenre('')}} style={{backgroundColor:(category=="Series")&&"red"}} >Series</button></li>
       
        <li><button className="navbut" style={{float:"right"}}  onClick={handleLog}>LogIn</button></li>
        </ul>
        <div>
        
        

        
        {selectedCategory && selectedCategory.length > 0 ? (
          <>
          
          
            <DropDown handleChange={handleSelectedGenre}>{genre}</DropDown>
            <Card className="card" displayGenre={selectedGenre} val={selectedCategory} />
           
          
          </>
        ):<div>

        <h1>View Movies or Series Details</h1>
        <h3>Select the Option You want to choose</h3>
        
        <div className="imgdisplay">
          
        </div>
        {imageCollection.map((items,i)=>{
            return(<img key={i} style={{height:"100px",width:"auto"}} src={items} alt="Hello" />)
    

         })}
        
    </div>}
        </div>
        </>
            
        
        
    )
    
}

export default Intro;