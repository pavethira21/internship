import { useState,useEffect } from 'react';
//import users from '../assets/users.json'
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Register(){
    const [error,setError] =useState('')
    const [alertMessage,setAlert] =useState()
    const [passVisibility,setPassVisibility] = useState(false)
    
    const genre = ['Action','Thriller','Horror','Science Fiction','Comedy','Drama','Crime','Mystery','Fantasy','Adventure','Supernatural']
    
   // console.log(users)
    const [data,setData] = useState({
        uName:"",
        pWord:"",
        email:"",
        genre:'',
        status:'true'
    })
    const navigate = useNavigate()
    // function handleFetch(){
    //     fetch('http://localhost:5000/fetchUsers')
    //     .then(res=>res.json())
    //     .then(data =>setUsers(data))
    //     .catch(err=>err)
        
    //     console.log(users)
      
    //   }
      useEffect(()=>{
        if(alertMessage){
            if(alertMessage.status ==200){
                alert("User registration successful, login to access features")  
                navigate('/login')
    
            }else{
                alert("Could not register")

                setData({
                    uName:"",
                    pWord:"",
                    email:"",
                    genre:'',
                    status:'true'
                })
    
            }
        }
        
        
        
    
      },[alertMessage])
    function handleAdduser(){
        const inputValue ={userName:data.uName,password:data.pWord,email:data.email,genre:data.genre,status:data.status}
        
       let res= fetch('http://localhost:5000/Adduser',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(inputValue)
          }).then(data=>setAlert(data))
          
          
          
        //   alert(JSON.stringify(res))
         //navigate('/login')
        }

        // function checkUser(items,i,arr){
        //     if(items.userName == data.uName){
        //         if(items.password == data.pWord){
        //             alert("User already exists")
                    
        //         }
        //         else{
        //             handleAdduser()
        //         }
        //     }
        //     else{
        //         console.log(i)
        //         if((i+1) ==arr.length){
        //             setError('Invalid username /password')
        //         }
    
        //     }
            
    
        // }
   


    function handleChange(e){
       
        
            const{name,value} = e.target
            setData({
                ...data,
                [name]: value
              });
              
        

              
        };

     
    function handleRegister(e){
        e.preventDefault();
        if(data.uName && data.pWord && data.email){
            //users.forEach(checkUser)
            console.log(data)
            handleAdduser()
        }
        else{
            console.log('hello')
            setError('Fill in all details')
        }
        
    }
   

   

    return(
        <div className="container">
            <div className='login-box'>
            <div className='form-left'>
              
            </div>
            <div className='form-right'>
            <h2>SignUp</h2>
            <form>
               <span style={{color:'red'}}>{error}</span> 
                <div className="content">
                    <label htmlFor="uName">UserName:</label><br/>
                    <input name="uName" type="text" onChange={handleChange} required/>

                </div>
                 <div className="content"> 
                 <label htmlFor="pWord">Password:</label><br/>
                 <input name="pWord" type={passVisibility?"text":"password"}  className='icon-input' onChange={handleChange}/>
                 <i className={passVisibility?"fa fa-eye icon":"fa fa-eye-slash icon"} style={{color:'black'}} onClick={()=>(setPassVisibility(!passVisibility))}></i>
                 </div>
                 <div className="content"> 
                    <label htmlFor="email">Email:</label><br/>
                    <input name="email" type="email" onChange={handleChange} required/>
                 </div>
                 <div >
                 <select className="selectGenre" name="genre" style={{width:"100%",padding:"10px"}}  onChange={handleChange}>
                <option  value=" "  disabled>Favourite genre</option>
                     {genre.map((items,i)=>{
            
                         return(<option key={i} value={items}>{items}</option>)
            
                         })}
         
        
    </select>
                 </div>
                 <button className='userAuth' onClick={handleRegister}>Register</button>
            </form>
            {/* <a href='#'>Forgot Password?</a> */}
            </div>
            
        
            </div>
        </div>
    )
}

export default Register;