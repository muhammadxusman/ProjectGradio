import React from 'react';
import { useState } from 'react'
import pic1 from "../images/pic1.png";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Pic1 from "../images/pic1.png"
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react'

export default function Signup() {
    useEffect(() => {
        AOS.init({ duration: 2500 });
    }, []);

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [backendError, setbackendError] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/signup', values);

            if (response.data && response.data.errors) {
                setbackendError(response.data.errors);
            } else {
                if (response.data && response.data.Status === "success") {
                    navigate("/signin");
                    Swal.fire({
                        title: "Successful!",
                        text: "Your account has been created!",
                        icon: "success"
                    });
                } else {
                    throw new Error("Registration failed");

                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration failed",
                text: "Passwords don't match",
            });

        }
    };

    return (
       <>
         <div className="login-section">
                <div className="login-section2">
                    <div className="d-flex align-items-center justify-content-center  another-try">
                        <div className="d-flex justify-content-center " >
                            <div className='kojo ' >

                                <h2 className='loging-text-1'>Sign in to</h2>
                                <h5 className='second-text'>Navigate Your Future, <br /> Excel with Grad.io!</h5>
                                <p className='third-text'>
                                    If you have an account, Login <br />
                                    You can <span className='Regis' >
                                        <Link to="/signin" className='Register-login-text' style={{ textDecoration: 'none', fontWeight: 600 }}>Login here!</Link>
                                    </span>
                                </p>


                            </div>
                        </div>
                        <div className="">
                            <img className='female' src={Pic1} alt="Picture not found" />
                        </div>
                        <div className="pb-5">
                            <section class="mt-5" >
                                <div class="form-box form-box2" data-aos="fade-down" id='form-boxx'>
                                    <div class="form-value">
                                        <form onSubmit={handleSubmit}>
                                            <h2>Signup</h2>
                                            <div class="inputbox">
                                                <ion-icon name="mail-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, email: e.target.value })} type="email" required />
                                                <label>Email</label>
                                            </div>
                                            <div class="inputbox">
                                            <ion-icon name="person-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, name: e.target.value })} type="text" required />
                                                <label>Username</label>
                                            </div>
                                            <div class="inputbox">
                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, password: e.target.value })} type="password" required />
                                                <label>Password</label>
                                            </div>
                                            <div class="inputbox">
                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, confirmPassword: e.target.value })} type="password" required />
                                                <label>Confirm Password</label>
                                            </div>
                                        
                                               
                                            <button type='submit' class="login-button shadow">Register</button>
                                            <div class="register">
                                                <p>Already have an account? <Link to='/signin' >Sign In</Link></p>
                                                {
                                        backendError ? backendError.map(e => (
                                            <p className='text-danger validation'>{e.msg}</p>
                                        )) : <span></span>
                                    }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>


                </div>

            </div>
       </>
    )
}
