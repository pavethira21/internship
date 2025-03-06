import { useState,useEffect } from 'react';
//import users from '../assets/users.json'
import './Login.css';
// import {Icon} from 'react-icons-kit';
// import {eyeOff} from 'react-icons-kit/feather/eyeOff';
// import {eye} from 'react-icons-kit/feather/eye'
import { useNavigate } from 'react-router-dom';


function Login(){
    
    const [error,setError] =useState('')
    const [users,setUsers] =useState()
    const [passVisibility,setPassVisibility] = useState(false)
    // const [type, setType] = useState('password');
    // const [icon, setIcon] = useState(eyeOff);
    const [data,setData] = useState({
        uName:"",
        pWord:""
    })
    const navigate = useNavigate()
    // const handleToggle = () => {
    //     if (type==='password'){
    //        setIcon(eye);
    //        setType('text')
    //     } else {
    //        setIcon(eyeOff)
    //        setType('password')
    //     }
    //  }
     
    function handleFetch(){
          fetch('http://localhost:5000/fetchUsers')
          .then(res=>res.json())
          .then(data =>setUsers(data))
          .catch(err=>err)
          
          
        
        }
        
            useEffect(()=>{
                handleFetch()
                
            
              },[])
        
        



    function handleChange(e){
       
        
            const{name,value} = e.target
            setData({
                ...data,
                [name]: value
              });
        

        
        };
       
     console.log(users)
    function handleLogin(e){
        
        e.preventDefault();
        if(data.uName && data.pWord){
            users.forEach(checkUser)
            console.log('false')
        }
        else{
            console.log('hello')
            setError('Fill in username and password')
        }
        
    }
   
  
    function checkUser(items,i,arr){
        if(items.userName == data.uName){
            if(items.password == data.pWord){
                if(items.status == "true"){
                    localStorage.setItem("userName",data.uName)
                localStorage.setItem("password",data.pWord)
                localStorage.setItem("userGenre",items.genre)
                navigate('/userLogged')
                }else{
                    alert("user Deactivated")
                }
                
                
            }
            else{
                setError('Invalid password')
            }
        }
        else{
            console.log(i)
            if((i+1) ==arr.length){
                setError('Invalid username /password')
            }

        }
        

    }
    function handleNavi(){
        navigate("/register")
    }

    return(
        <div className="container">
            <div className='login-box'>
            <div className='form-left'>
              
            </div>
            <div className='form-right'>
            <h2>Login</h2>
            <form>
               <span style={{color:'red'}}>{error}</span> 
                <div className="content">
                    <label htmlFor="uName">UserName:</label><br/>
                    <input name="uName" type="text" onChange={handleChange}/>

                </div>
                 <div className="content"> 
                    <label htmlFor="pWord">Password:</label><br/>
                    <input name="pWord" type={passVisibility?"text":"password"} className='icon-input' onChange={handleChange}/>
                    <i className={passVisibility?"fa fa-eye icon":"fa fa-eye-slash icon"} style={{color:'black'}} onClick={()=>(setPassVisibility(!passVisibility))}></i>
                    {/* <span  onClick={handleToggle}><Icon /> </span> */}
                     
              
                 </div>
                 <button className='userAuth' onClick={handleLogin}>LogIn</button>
            </form>
            <button className='signup' onClick={handleNavi}>SignIn</button>
            <div className='link'><a href='#'>Forgot Password?</a></div>
            
            </div>
            
        
            </div>
        </div>
    )
}

export default Login;