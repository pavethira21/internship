import { useState,useEffect } from "react"
import './movie.css'

import { useNavigate } from "react-router-dom"

export default function Movie(){
    
    const data = "https://www.youtube.com/embed/O2NKzO-fxwQ?si=6qj7P6jNR46FSnVo"
    const userName = localStorage.getItem('userName')
    const title= localStorage.getItem('title')
    const year= localStorage.getItem('year')
    const cast= localStorage.getItem('cast')
    const genre= localStorage.getItem('genre')
    const extract= localStorage.getItem('extract')
    const thumbnail= localStorage.getItem('thumbnail')
    

    const navigate = useNavigate()


        const [review,setReviews] = useState([])
        const [text,setText] = useState(' ')
    const [comment,setComment] = useState({
        title:" ",
        review:{userName: userName || "", comment: ""  }
    })



    
    
    function handleReview(){

        fetch(`http://localhost:5000/fetchReviews?title=${title}`)
        .then(res=>res.json())
        .then(data =>setReviews(data))
        .catch(err=>console.error("Error fetching reviews:", err))

        console.log(review)
    }
    useEffect(()=>{
        handleReview()
    }, [comment])

    function handleChange(e){
     setText(e.target.value)
    }

     
   console.log(review)
    const displayReview = (review?.length>0?(
        review.map((items,i)=>{
            return(
                <div key={i}>
                    <p><span>{items.userName}</span>:<span>{items.comment}</span></p>
                </div>
            )
         })
        ):<div>Be the first to add review</div>)
     async function handleComment(){
        
        const addComment={
            title:title,
            review:{userName:userName,comment:text},
        };
        setComment(addComment);
        
            await handlePost(addComment)
     }
     console.log(comment);
     async function handlePost(addComment){
        try{
            let res= fetch('http://localhost:5000/AddReview',{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(addComment)
              })
              if(res.ok){
                setText("")
                handleReview();
              }else{
                console.error("Error adding review")
              }
        }catch(e){
            console.error(e)
        }
        
        
         
     }
     function handleMovie(){
        useEffect(()=>{
            
            (userName!=' '? navigate('/userLogged'):navigate('/login'))
        })
     }
     function handleBack(){
        localStorage.setItem('title',' ')
         localStorage.setItem('year',' ')
        localStorage.setItem('cast',' ')
        localStorage.setItem('genre',' ')
        localStorage.setItem('extract',' ')
        localStorage.setItem('thumbnail',' ')

        navigate('/userLogged')
     }
     console.log(text)
     
    return (
        (title ==" "?handleMovie():
    <div className="background">
        <button className="back-btn" onClick={handleBack}>Back</button>
        
        <div className="movie_card" >
        <div className="Youtube"><iframe className="Youtube-video" src={data} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
                <div className="info_section">
                <h1>{title || "Undefined"}</h1>
                
                <h4>{year || "undefined"}</h4>
                
                <img className='poster' src={thumbnail} alt="Not found"/>
                
                 
                <p>Casts:{cast || "undefined"}</p><br/>
                <p>Genre: {genre|| "undefined"}</p>
                </div>
                <div className="movie_desc">
                <p className="text">{extract|| "undefined"}</p><br/>
                </div>
                
                
                <div>
                <div className="Reviews" style={{backgroundColor:"gray"}}>
                    {displayReview}
                </div>

                <div className="row">
                <textarea placeholder="addReviews" className="addReviews" onChange={(e)=>handleChange(e)}></textarea>
                <button className="review-btn" onClick={handleComment} >Add review</button>
                </div>
                </div> 
        </div>
    </div>
           
    )    )
         
      
}
