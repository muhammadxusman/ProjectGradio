import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link, Navigate } from 'react-router-dom';
import floatwomen from '../images/floatwomen.png';
import doodle2 from '../images/doodle2.png';
import floatmen from '../images/float-men.png';

function Fourth() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [userResponses, setUserResponses] = useState([]);
  const [totalZeroWeight, setTotalZeroWeight] = useState(0);
  const [loading, setLoading] = useState(true);

  const [values, setValues] = useState({
    // user_id: "1",
    user_desire: "",
    user_target: "",

  })

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:8081/submituser_preference', values)
  //     .then(res => {
  //       console.log("This is err", res.data.Status);
  //       if (res.data.Status === "success") {
  //         Swal.fire({
  //           title: "Successful !",
  //           text: "Your preference is submitted!",
  //           icon: "success"
  //         });
  //       } else {

  //         Swal.fire({
  //           icon: "error",
  //           title: "error1",
  //           text: "Please try again",
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "error2",
  //         text: "Please try again",
  //       });
  //     });
  // };


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
    axios.get('http://localhost:8081/getuserresponse')
      .then(res => {
        const { userResponses, personalityScores } = res.data;

        console.log('User Responses:', userResponses);
        console.log('Personality Scores:', personalityScores);

        const dominantTraits = getDominantTraits(personalityScores);
        console.log('Dominant Traits:', dominantTraits);

      })
      .catch(error => {
        console.error('Error fetching user response:', error);
        // Handle the error, show a message to the user, etc.
      });


    axios.get('http://localhost:8081/getuser_preference')
      .then(res => {
        const preferences = res.data.preferences;

        preferences.forEach(preference => {
          const { user_id, user_desire, user_target } = preference;
          console.log('User ID:', user_id);
          console.log('User Desire:', user_desire);
          console.log('User Target:', user_target);
        });
      })
      .catch(error => {
        console.error('Error fetching user preferences:', error);
      });

    axios.get('http://localhost:8081/getuserresponse')
      .then(res => {
        const { userResponses, personalityScores } = res.data;

        console.log('User Responses:', userResponses);
        console.log('Personality Scores:', personalityScores);

        // Determine dominant personality traits
        const dominantTraits = getDominantTraits(personalityScores);
        console.log('Dominant Traits:', dominantTraits);

        // Continue with your code as needed
      })
      .catch(error => {
        console.error('Error fetching user response:', error);
        // Handle the error, show a message to the user, etc.
      });


    // Function to determine dominant personality traits
    function getDominantTraits(scores) {
      // Find the two highest scoring traits
      const sortedTraits = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
      const dominantTraits = sortedTraits.slice(0, 2);

      // Return the dominant traits
      return dominantTraits.join('');
    }
  }, []);


  return (
    <div className="">
      {loading ? (
        <div></div>
      ) : auth ? (
        <div className="">
          <Navbar />
          {auth ? (
            <div className="container mt-1">
              <h4 className='second-first-text text-center'>
              </h4>
              <div className="row second-page-row">
              </div>
              <div className="container second-page-row p-4">
                <div className="container ppt-cont">
                  <div className="pt-5">
                    <div className="row ps-5">
                      <div className="col-md-4">
                        <img className="floatwomen2 m-2" src={floatmen} alt="Logo" />

                      </div>
                      <div className="col-md-4">
                        <div className='rbox d-flex justify-content-center align-items-center'>
                          <h1>Your Test Completed</h1>
                          {/* <form onSubmit={handleSubmit} action="" className="mt-3  d-flex flex-column justify-content-center align-items-center">


                            <div className="">
                              <textarea
                                className='fourth-textarea shadow-lg p-3 mb-2 bg-body-tertiary rounded'
                                placeholder="What your desired job on the future?" required
                                onChange={e => setValues({ ...values, user_desire: e.target.value, user_target: values.user_target })}
                              ></textarea>

                            </div>
                            <div className="">
                              <textarea
                                className='fourth-textarea shadow-lg p-3 mb-2 bg-body-tertiary rounded'
                                placeholder="What are your current area of interest?" required
                                onChange={e => setValues({ ...values, user_target: e.target.value, user_desire: values.user_desire })}
                              ></textarea>
                            </div>
                            <button type="submit" className="submit-btn-fourth ">Submit</button>
                          </form> */}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-end">
                          <img className="floatwomen2 " src={floatwomen} alt="Logo" />
                        </div>
                        <div className='d-flex justify-content-center'>
                          <img className="doodle12" src={doodle2} alt="Logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container mt-3 p-0 d-flex justify-content-between">

                </div>
              </div>

            </div>
          ) : (
            <div>
              <h3>You are not Authorized </h3>
              <Link to="/" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>

      ) : (
        <Navigate to='/' replace />
      )}
    </div>
  );
}

export default Fourth;
