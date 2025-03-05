import { useState,useEffect } from 'react';
//import users from '../assets/users.json'
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Register(){
    const [error,setError] =useState('')
    const [users,setUsers] =useState()
    console.log(users)
    const [data,setData] = useState({
        uName:"",
        pWord:"",
        email:""
    })
    const navigate = useNavigate()
    function handleFetch(){
        fetch('http://localhost:5000/fetchUsers')
        .then(res=>res.json())
        .then(data =>setUsers(data))
        .catch(err=>err)
        
        console.log(users)
      
      }
      useEffect(()=>{
        handleFetch()
        
    
      },[])
    function handleAdduser(){
        const inputValue ={userName:data.uName,password:data.pWord,email:data.email
        }
       let res= fetch('http://localhost:5000/Adduser',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(inputValue)
          })
         navigate('/login')
        }

        function checkUser(items,i,arr){
            if(items.userName == data.uName){
                if(items.password == data.pWord){
                    alert("User already exists")
                    
                }
                else{
                    handleAdduser()
                }
            }
            else{
                console.log(i)
                if((i+1) ==arr.length){
                    setError('Invalid username /password')
                }
    
            }
            
    
        }



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
            users.forEach(checkUser)
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
                    <input name="pWord" type="password" onChange={handleChange} required/>
                 </div>
                 <div className="content"> 
                    <label htmlFor="email">Email:</label><br/>
                    <input name="email" type="email" onChange={handleChange} required/>
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