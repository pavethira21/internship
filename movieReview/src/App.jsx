import { useState } from 'react'
import './App.css'
import Loggedin from './component/loggedIn'
import Register from './component/register'
import Movie from './component/Movie'
//import Card from './component/Cards'
import data from './assets/data.json'
//import DropDown from './component/DropDown'
import Intro from './component/Intro'
import Login from './component/Login'
import { Routes,Route,Navigate } from 'react-router-dom'


function App() {
  // const [category, setCategory] = useState('')
  // const categoy=true
  // const [selectedGenre,setselectedGenre] =useState('')
  // const selectedCategory = data[0][category]
  // const genre = ['Action','Thriller','Horror','Science Fiction','Comedy','Drama','Crime','Mystery','Fantasy','Adventure','Supernatural']
  
  

  //  const routes =useRoutes([
  //   {
  //     path:"/",
  //     element:<Intro />
  //   }
  //  ]

  //  )

  // function handleSelectedGenre(event){
  //   setselectedGenre(event.target.value)
  //   console.log(selectedGenre)
  // }
  
 
  

  return (
<><Routes>
      <Route path="/" element={<Intro />} />
      <Route path='/userLogged' element={<Loggedin/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<Movie />}/>
    </Routes></>
  )
    //(<>

   
    //   {/* <div>
    //     <p style={{borderRadius:"8px"}}>
    //     <button onClick={()=>{setCategory("Movies")}} style={{backgroundColor:(category=="Movies")?"red":"black"}} >Movie</button>
    //     <button onClick={()=>{setCategory("Series")}} style={{backgroundColor:(category=="Series")?"red":"black"}} >Series</button>
    //     </p>
        
    //     {selectedCategory && selectedCategory.length > 0 && (
    //       <>
          
          
    //         <DropDown handleChange={handleSelectedGenre}>{genre}</DropDown>
    //       <Card className="card" displayGenre={selectedGenre} val={selectedCategory} />
           
          
    //       </>
    //     )
            
    //     // ) : (
    //     //   <Login/>
    //     //   // <Intro></Intro>
    //     // )
    //     }
        
        

    //    </div>
       
    // </>  ) */}
    
 
}

export default App
