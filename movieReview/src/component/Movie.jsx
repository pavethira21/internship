import { useState,useEffect } from "react"
import './movie.css'
import { useNavigate } from "react-router-dom"
// handle Review use state use effect to store the review data
export default function Movie(){
    const navigate = useNavigate()
        const [review,setReviews] = useState([])
        const [text,setText] = useState(' ')
    const [comment,setComment] = useState({
        title:" ",
        review:{ }
    })



    const title= localStorage.getItem('title')
    const year= localStorage.getItem('year')
    const cast= localStorage.getItem('cast')
    const genre= localStorage.getItem('genre')
    const extract= localStorage.getItem('extract')
    const thumbnail= localStorage.getItem('thumbnail')
    
    function handleReview(){
        const title= localStorage.getItem('title')

        fetch(`http://localhost:5000/fetchReviews?title=${title}`)
        .then(res=>res.json())
        .then(data =>setReviews(data))
        .catch(err=>err)

        console.log(review)
    }
    useEffect(()=>{
        handleReview()
    }, [comment])

    function handleChange(e){
     setText(e.target.value)
    }

     const reviewsList =review.review
     console.log(reviewsList)
     if(reviewsList){
        var displayReview = reviewsList.map((items,i)=>{
            return(
                <div key={i}>
                    <p><span>{items.userName}</span>:<span>{items.comment}</span></p>
                </div>
            )
         })
     }
     function handleComment(){
        const uName=localStorage.getItem('userName')
        setComment({

            title:title,
            review:{userName:uName ,comment:text}
     })
     
     
     handlePost()
     }
     console.log(comment);
     function handlePost(){
        let res= fetch('http://localhost:5000/AddReview',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(comment)
          })
        
         console.log(res)

         setText(" ")
     }
     function handleBack(){
        navigate('/userLogged')
     }
     console.log(text)
    return(
    <div className="background">
        <button className="back-btn" onClick={handleBack}>Back</button>
        
        <div className="movie_card" >
                <div className="info_section">
                <h1>{title}</h1>
                <h4>{year}</h4>
                
                <img className='poster' src={thumbnail} />
                
                 
                <p>Casts:{cast}</p><br/>
                <p>Genre: {genre}</p>
                </div>
                <div className="movie_desc">
                <p className="text">{extract}</p><br/>
                </div>
                <div>
                <div className="Reviews" style={{backgroundColor:"gray"}}>
                    {displayReview? <div>{displayReview}</div> : <div>Be the first to add review</div>}
                </div>

                <div className="row">
                <textarea placeholder="addReviews" className="addReviews" onChange={(e)=>handleChange(e)}></textarea>
                <button className="review-btn" onClick={handleComment} >Add review</button>
                </div>
                </div>
        </div>
    </div>
           
            
         
      
    )
}