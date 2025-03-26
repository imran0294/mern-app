import React, { use } from 'react'
import { handleErrors, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const [signupinfo, setsignupinfo] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })
    const HashChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copysignupinfo = { ...signupinfo };
        copysignupinfo[name] = value;
        setsignupinfo(copysignupinfo);
    }

    console.log('Signupif :', signupinfo);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, password } = signupinfo;
        if (name && email && phone && password) {
            try {
                const url = "http://localhost:8089/auth/signup";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupinfo)

                });

                const result = await response.json();
                console.log('result', result);
                const { message, success } = result;
                if (success) {
                    handleSuccess(message);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);

                } else {
                    if (!message && !success) {
                        return handleErrors('Server Error');
                    } else {
                        return handleErrors(message);
                    }
                }

            } catch (error) {
                console.log('error', error);
                return handleErrors(error);
            }
            return handleSuccess('Please fill all the fields');
        } else {
            return handleErrors('Please fill all the fields');
        }
    }
    return (
        <div>
            <h4>ignup</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" value={signupinfo.name} onChange={HashChange} autoFocus placeholder='Enter Name' name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={signupinfo.email} onChange={HashChange} autoFocus placeholder='Enter Email' name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="number" value={signupinfo.phone} onChange={HashChange} autoFocus placeholder='Enter Phon' name="phone" id="phone" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={signupinfo.password} onChange={HashChange} autoFocus placeholder='Enter Password' name="password" id="password" />
                </div>
                <button type='submit'>Register</button>
                <span>
                    Already have an account? <Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
