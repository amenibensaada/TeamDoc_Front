import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Login.css'

import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'
import signup_icon from '../../assets/img/login.png'
import logo from '../../assets/img/logo.png'
import google_icon from '../../assets/img/login3.png'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



 
  const handleChangeemail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangepassword = (e) => {
    setPassword(e.target.value);
  };
  const isFormValid = email !== '' && password !== '';

  const handleSubmit = () => {
   
    if (email.trim() === '' || password.trim() === '') {
      alert('Veuillez remplir tous les champs du formulaire.');
    } else {
      console.log(email, password);
    }
  };



  return (
    <>
      <div className='container '>
      <div className="left-half">

      <div className="header">  
      <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} /> {/* Ajoutez votre logo ici avec la taille désirée */}

      <div className="text">Login</div>
      <div className="underline"></div>  
    </div>
    <div className="inputs">
      

      <div className="input">
      <img src={email_icon} alt="" /> 
      <input type="email" placeholder='Email' value={email} onChange={handleChangeemail}  />
      </div>

      <div className="input">
      <img src={password_icon} alt="" /> 
      <input type="password" placeholder='Password' value={password} onChange={handleChangepassword}  />
      </div>
      <div className="header">  
      <div className="text2">OR</div>
      <div className="underline"></div>  
        <Link to="/login" className="d">
  <img src={google_icon} alt="Google Icon" /> 
</Link>
</div>
    
      </div>
      <div className="forgot-password">Lost password ? <span>Click here !</span></div>
      <div className="submit-container">
        <Link to="/signup" className="submit1">Sign up</Link> {/* Redirection vers la page de connexion */}
        <div className={`submit ${isFormValid ? '' : 'disabled'}`} onClick={isFormValid ? handleSubmit : null}>Login</div>


        

      </div>
      </div>
      <div className="right-half">
        {/* Ajoutez votre image de profil ici */}
        <img src={signup_icon} alt="Profile" />
      </div>
      </div>

      
    </>
  );
} 
