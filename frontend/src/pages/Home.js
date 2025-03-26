import React, { use, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { handleErrors, handleSuccess } from '../utils';
function Home() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('name'));
  }, [])

  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('name');
    setTimeout(() => {
      navigate('/login');
      handleSuccess('Logout Successfully');
    }, 1000);
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8089/products/list";
      const headers = {
        headers: {
          "authorization": localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log('result', result);
      setProducts(result);
    } catch (error) {
      console.log('error', error);
      return handleErrors(error);
    }
  }

  useEffect(() => {
    fetchProducts()
  },[])
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <ul>
          {products && products.map((product) => {
            return <li key={product._id}>{product.name} : {product.price}</li>
          })}
        </ul>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
