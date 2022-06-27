import axios from "axios";
import { useState } from "react";
import "./Login.css";
function Login() {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
const handleChange = (e) =>{
  const {name, value} = e.target;
  setLogin({
    ...login,
    [name]: value
  })
}

const handleClick = () =>{
  axios.post('http://localhost:3001/login', login)
  .then(res => alert(res.data.message));
}
  return (
    <div className="Login">
      <div className="Login-content">
        <h1>Login</h1>
        <input type="email" placeholder="Email" name="email" value={login.email} onChange={handleChange}></input>
        <br></br>
        <input type="password" placeholder="Password" name="password" value={login.password} onChange={handleChange}></input>
        <br></br>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
}

export default Login;
