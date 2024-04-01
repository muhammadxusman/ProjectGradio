import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link, Navigate } from 'react-router-dom';



function Academic() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);


  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/home')
      .then(res => {
        console.log(res);
        if (res.data.Status === 'success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => {
        console.error('Error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const handledelete = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        location.reload(true);
      }).catch(err => console.log(err));
  }

  return (
    <div className="">
      {loading ? (
        <div></div>
      ) : auth ? (
        <div>
          <Navbar />

          <div className="container mt-1">
            <h4 className='second-first-text'>Enter Academic Records
            </h4>

            <div className="row second-page-row">
              <div className="col-md-6 second-page-firstcolumn mt-2">

                <div className="pt-3">
                  <h3 className='secQ1'>Select Marking Criteria (of your College)</h3>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" defaultChecked type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Percentage</label>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Grade</label>
                      </label>

                    </div>
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className='secQ1'>Select Percentage that Secured</h3>

                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" defaultChecked type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>90% - 99%</label>
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>80% - 89%</label>
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>70% - 79%</label>
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>60% - 69%</label>
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>50% - 59%</label>
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Below 50%</label>
                      </label>

                    </div>
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className='secQ1'>Select Grades that you secured</h3>

                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" defaultChecked type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>A*</label>
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>A</label>
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>B</label>
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>C</label>
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>D</label>
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>E</label>
                      </label>

                    </div>
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className='secQ1'>Select Group (of your College)</h3>

                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" defaultChecked type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Science</label>
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Commerce</label>
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Arts</label>
                      </label>

                    </div>

                  </div>
                </div>

              </div>
              <div className="col-md-6 mt-2 mb-5">

                <div className="pt-3">
                  <h3 className='secQ1'>Select Preferred University Sector</h3>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" defaultChecked type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Private</label>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="checkbox-container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark"></span>
                        <label htmlFor="" className='check-box-text'>Govt.
                        </label>
                      </label>

                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <h3 className='secQ1'>Select Preferred City For University</h3>

                  <div className="dropdown mt-3">
                    <button className="btn second-btn-dropdown  dropdown-toggle shadow-sm mb-5 bg-body-tertiary rounded"
                      type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Karachi, Pakistan
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#" onClick={() => updateDropdown('Action')}>Islamabad,
                        Pakistan</a></li>
                      <li><a className="dropdown-item" href="#" onClick={() => updateDropdown('Action')}>Lahore, Pakistan</a>
                      </li>
                      <li><a className="dropdown-item" href="#" onClick={() => updateDropdown('Action')}>Quetta, Pakistan</a>
                      </li>
                      <li><a className="dropdown-item" href="#" onClick={() => updateDropdown('Action')}>Peshawar, Pakistan</a>
                      </li>
                      <li><a className="dropdown-item" href="#" onClick={() => updateDropdown('Action')}>Rawalpindi,
                        Pakistan</a></li>

                    </ul>
                  </div>
                </div>
                <Link to="/PersonalityTraitTest ">
                  <button type="button" class="btn btn-secondary second-proceed-btn ms-2 ">Proceed</button></Link>




              </div>
            </div>

          </div>





        </div>

      ) : (
        <Navigate to='/' replace />
      )}
    </div>
  );
}

export default Academic;
