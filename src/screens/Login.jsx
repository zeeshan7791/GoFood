import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
  let navigate=useNavigate()
  const[credentials,setCredentials]=useState({
    
    email:"",
    password:'',
    
})
const handleSubmit=async(e)=>{
e.preventDefault() //synthetic event
const response =await fetch("http://localhost:5000/api/loginuser",{
method:"POST",
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify({
   
    email:credentials.email,
    password:credentials.password,
    
})


})
const json= await response.json()
console.log(json,"json value is")
if(!json.success){
alert('enter valid credentials')
}
else{
  localStorage.setItem("userEmail",credentials.email)
  localStorage.setItem("authToken",json.authToken)
  console.log(localStorage.getItem("authToken"))
  navigate('/')
}
}

const onChangeInput=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    <div>
       <div className='container text-left'>
      <form onSubmit={handleSubmit}>
      
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input 
    type="email" 
    className="form-control"
     id="exampleInputEmail1" 
    aria-describedby="emailHelp" 
    name='email' 
    value={credentials.email}
    onChange={onChangeInput}
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"
     name='password' 
     value={credentials.password}
     onChange={onChangeInput}

      id="exampleInputPassword1"/>
  </div>
 
  
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
</form>
</div>
    </div>
  )
}
