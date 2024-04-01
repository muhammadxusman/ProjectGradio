import React from 'react'

export default function adminLogin() {
    return (
        <div className="admin-login-page">
            <div className='d-flex justify-content-center  p-5'>
                <div className="forms login-form admin-login-form  shadow p-3 mb-5 bg-body rounded">
                    <h5 className='fourth-text m-3'>Admin Login</h5>
                    <form className="form form-login"  >
                        <div className="input-block">
                            <input className='form-input' id="login-email" placeholder='Enter email or username' onChange={e => setValues({ ...values, email: e.target.value })} type="email" required />
                        </div>

                        <div className="input-block">
                            <input className='form-input' placeholder='Password' onChange={e => setValues({ ...values, password: e.target.value })} id="login-password" type="password" required />
                        </div>
                        <button type="submit" className="btn-login">Login</button>
                        <div className='d-flex justify-content-center'>


                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
