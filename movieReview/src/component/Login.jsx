import { useState } from 'react';
import users from '../assets/users.json'
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Login(){
    const [error,setError] =useState('')
    const [data,setData] = useState({
        uName:"",
        pWord:""
    })
    const navigate = useNavigate()




    function handleChange(e){
       
        
            const{name,value} = e.target
            setData({
                ...data,
                [name]: value
              });
        

        
        };

     
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
                localStorage.setItem("userName",data.uName)
                localStorage.setItem("password",data.pWord)
                navigate('/userLogged')
                
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

    return(
        <div className="container">
            
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
                    <input name="pWord" type="password" onChange={handleChange}/>
                 </div>
                 <button className='userAuth' onClick={handleLogin}>LogIn</button>
            </form>
            <a href='#'>Forgot Password?</a>
            </div>
            
        

        </div>
    )
}

export default Login;