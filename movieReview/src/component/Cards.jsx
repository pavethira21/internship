import './Cards.css'

function Card({val,displayGenre}){
   
   const displayAll = val.map((items,i)=>{
        return (
            <div className="movie_card" key={i}>
                <div className="info_section">
                <div className="movie_header">
                <img className='poster' src={items.thumbnail} style={{'width':items.thumbnail_width,"height":items.thumbnail_height}}/>
                <h1>{items.title}</h1>
                <h4>{items.year}</h4>
                 {/* ,{items.run_time} */}
                <label>Casts:{(items.cast).join(",")}</label><br/>
                <label>Genre: {(items.genres).join(",")}</label>
                </div>
                <div className="movie_desc">
                <p className="text">{items.extract}</p><br/>
                </div>
                </div>
            <div>
            </div>
            
            </div>
        )   
 })
 let noOfSelectedGenre =0
 const displayNone=<div className='noDisplay'><p>No Details avalable in that category</p></div>
 const displaySelectedGenre = val.map((items,i)=>{
    if((items.genres).includes(displayGenre)){
        noOfSelectedGenre +=1

        return(
           
            <div className="movie_card" key={i}>
                <div className="info_section">
                <div className="movie_header">
                <img className='poster' src={items.thumbnail} />
                <h1>{items.title}</h1>
                 <h4>{items.year},{items.run_time}</h4>
                <p className="type">{items.cast.join(" ")}</p><br/>
                <p className="type"> {items.genres.join(",")}</p>
                </div>
                <div className="movie_desc">
                <p className="text">{items.extract}</p><br/>
                </div>
                </div>
            <div>
            </div>
            
            </div>
        )   
    }
    
    
})
   
   return(displayGenre==''?displayAll:(noOfSelectedGenre==0?displayNone:displaySelectedGenre))
 

}

export default Card;