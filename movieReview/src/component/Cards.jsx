import './Cards.css'
import { useNavigate } from 'react-router-dom';


function Card({val}){
  
    const navigate = useNavigate()
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
   const displayAll = val.map((items,i)=>{
    
        return (
            
       
            <div key={i} className="movie-card">
              <img src={items.thumbnail} alt={items.title} className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">{items.title}</h3>
                <p className="movie-year">Year: {items.year}</p>
                <button onClick={()=>handleMovie(items)}>Read More </button>
              </div>
            
         
        
            {/* <div className="movie_card" key={i}>
                <div className="info_section">
                <h1>{items.title}</h1>
                <h4>{items.year}</h4>
                
                <img className='poster' src={items.thumbnail} style={{'width':items.thumbnail_width,"height":items.thumbnail_height}}/>
                
                 ,{items.run_time} 
                <label>Casts:{(items.cast).join(",")}</label><br/>
                <label>Genre: {(items.genres).join(",")}</label>
                </div>
                <div className="movie_desc">
                <p className="text">{items.extract}</p><br/>
                </div>
                
                </div>
           
            
            </div> */}
           </div>
            
        )   
 })
//  let noOfSelectedGenre =0

//  const displaySelectedGenre = val.map((items,i)=>{
//     if((items.genres).includes(displayGenre)){
//         noOfSelectedGenre +=1

//         return(
            
           
//             // <div className="movie_card" key={i}>
//             //     <div className="info_section">
//             //     <div className="movie_header">
//             //     <img className='poster' src={items.thumbnail} />
//             //     <h1>{items.title}</h1>
//             //      <h4>{items.year},{items.run_time}</h4>
//             //     <p className="type">{items.cast.join(" ")}</p><br/>
//             //     <p className="type"> {items.genres.join(",")}</p>
//             //     </div>
//             //     <div className="movie_desc">
//             //     <p className="text">{items.extract}</p><br/>
//             //     </div>
//             //     </div>
//             // <div>
//             // </div>
            
//             // </div>
//             <div key={i} className="movie-card">
//               <img src={items.thumbnail} alt={items.title} className="movie-poster" />
//               <div className="movie-info">
//                 <h3 className="movie-title">{items.title}</h3>
//                 <p className="movie-year">Year: {items.year}</p>
//                 <button onClick={()=>handleMovie(items)}>Read more </button>
//               </div>
//               </div>
           
//         )   
//     }
    
    
// })
 const displayNone=<div className='noDisplay' ><p>No data avalable in that category</p></div>
   
   return(<div className='movie-row'>{displayAll}</div>)
 

}

export default Card;