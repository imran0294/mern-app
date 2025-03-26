import React from 'react'
import { handleErrors, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [logininfo, setlogininfo] = React.useState({  // 1
    email: '',
    password: ''
  })

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copylogininfo = { ...logininfo };
    copylogininfo[name] = value;
    setlogininfo(copylogininfo);
  }

  const handleSubmit = async (e) => { // 
    e.preventDefault();
    const { email, password } = logininfo;
    if (email && password) {
      const url = "http://localhost:8089/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logininfo)
      });

      const result = await response.json();
      const { message, JwtToekn, name, success } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', JwtToekn);
        localStorage.setItem('name', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);

      } else {
        if (!message && !success) {
          return handleErrors('Server Error');
        } else {
          return handleErrors(message);
        }
      }
      try {

      }
      catch (error) {
        console.log('error', error);
        return handleErrors(error);
      }
    } else {
      return handleErrors('Email and Password are required');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Email</label>
          <input type="text" value={logininfo.name} onChange={onChange} autoFocus placeholder='Enter Email' name="email" id="email" />
        </div>

        <div>
          <label htmlFor="name">Password</label>
          <input type="password" onChange={onChange} autoFocus placeholder='Enter Password' name="password" id="password" />
        </div>
        <button type='submit'>Login</button>
        <span>
          Don;t  have an account? <Link to='/signup'>Create Account</Link>
        </span>

      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
