import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Login.css'
import { z } from 'zod'; // Importez Zod


import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'
import signup_icon from '../../assets/img/aziz3.jpg'
import logo from '../../assets/img/logo.png'
import google_icon from '../../assets/img/login3.png'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{email?: string;}>({}); // Définir le type de errors
  const [isSubmitted, setIsSubmitted] = useState(true); // Initialise à true pour désactiver initialement le bouton



  const signupSchema = z.object({
    email: z.string().email(),
  });


 
  const handleChangeemail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangepassword = (e) => {
    setPassword(e.target.value);
  };
  const isFormValid = email !== '' && password !== '';

  
  const handleSubmit = () => {
    setIsSubmitted(true);

    if (isFormValid) {
      
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };
  
    try {
      // Validez les données avec le schéma Zod
      signupSchema.parse(userData);
      // Si la validation réussit, soumettez le formulaire ou appelez une API ici
      console.log("Form data:", userData);
      setErrors({});
  
    } catch (error) {
      // S'il y a des erreurs de validation, mettez à jour l'état des erreurs
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  }
};

const errorMessage = !isFormValid && isSubmitted && (
  <div className="error">Please fill in all the required fields.</div>
);

const buttonClass = `submit ${!isFormValid && isSubmitted ? 'disabled' : ''}`;


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
            <input type="email" placeholder='Email' value={email} onChange={handleChangeemail} />
          </div>
          {errors.email && <div className="error">{errors.email}</div>}

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
        {/* Bouton "Sign up" */}
        <Link to="/signup" className={`submit1 ${isFormValid ? '' : 'disabled'}`}>Sign up</Link>
        {/* Bouton "Login" */}
        <div className={buttonClass} onClick={isFormValid ? handleSubmit : null} style={!isFormValid && isSubmitted ? { cursor: 'not-allowed' } : {}}>
    Login
  </div>

      </div>
     

      {/* Affichez le message d'erreur */}
      {errorMessage}
    </div>
    
      <div className="right-half">
        {/* Ajoutez votre image de profil ici */}
        <img src={signup_icon} alt="Profile" />
      </div>
      </div>

      
    </>
  );
} 
