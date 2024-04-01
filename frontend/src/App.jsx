import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/First'
import Academic from './pages/Second';
import PersonalityTraitTest from './pages/third';
import Fourth from './pages/Fourth';
import Admin from './Admin/admin';
import AdminLogin from './Admin/adminLogin';
import Gradadmin from './Admin/GradAdmin';
import User from './Admin/admin-pages/User';
import Question from './Admin/admin-pages/Question';
import Index from './pages';
import Login from './UserAuth/Login';
import Signup from './UserAuth/Signup';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        

        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/" element={<Signin />} /> */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/PersonalityTraitTest" element={<PersonalityTraitTest />} />
          <Route path="/Fourth" element={<Fourth />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/the_admin_of_gradio" element={<AdminLogin />} />
          <Route path="/Gradadmin" element={<Gradadmin />} />
          <Route path="/manage-users" element={<User />} />
          <Route path="/personality-trait-type-question" element={<Question />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
