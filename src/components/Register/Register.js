import "./Register.css";
import axios from 'axios';
import { useState } from "react";
function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        reEnterPassword: '' 
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleClick = () =>{
      const {name, email, password, reEnterPassword} = user;
      if(name && email && password && (password === reEnterPassword)){
        axios.post('http://localhost:3001/register', user)
        .then(res => alert(res.data.message))
      } else{
        alert('Invalid User');
      }
    }

  return (
    <div className="Register">
      <div className="Register-content">
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name"></input>
        <br></br>
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email"></input>
        <br></br>
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
        <br></br>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange} placeholder="Re-enter"></input>
        <br></br>
        <button onClick={handleClick}>Register</button>        
        <br></br>
        or
        <br></br>
        <button>Login</button>
      </div>
    </div>
  );
}

export default Register;