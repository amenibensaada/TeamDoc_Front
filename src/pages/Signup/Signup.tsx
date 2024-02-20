import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignIn from './SignIn'; // Importez votre composant SignIn
import { signupSchema } from '../../schema/SignupSchema'; // Importez votre schéma de validation
import './signup.css'
import { z } from 'zod'; // Importez Zod


import user_icon from '../../assets/img/person.png'
import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'
import signup_icon from '../../assets/img/signup2.png'
import google_icon from '../../assets/img/login3.png'
import logo from '../../assets/img/logo.png'




export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({}); // Définir le type de errors


  const signupSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const handleChangename = (e) => {
    setName(e.target.value);
  };
  const handleChangeemail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangepassword = (e) => {
    setPassword(e.target.value);
  };
  const isFormValid = name !== '' && email !== '' && password !== '';

  const handleSubmit = () => {
    const userData = {
      name: name.trim(),
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
  };
  



  return (
    <>
      <div className='container '>
      <div className="left-half">

      <div className="header">  
      <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} /> {/* Ajoutez votre logo ici avec la taille désirée */}
      <div className="text">Sign up</div>
      <div className="underline"></div>  
    </div>
    <div className="inputs">
      <div className="input">
      <img src={user_icon} alt="" /> 
      <input type="text" placeholder='Name' value={name} onChange= {handleChangename}  />
      {errors.name && <span className="error">{errors.name}</span>}

      
      </div>

      <div className="input">
      <img src={email_icon} alt="" /> 
      <input type="email" placeholder='Email' value={email} onChange={handleChangeemail}  />
      {errors.email && <span className="error">{errors.email}</span>}

      </div>

      <div className="input">
      <img src={password_icon} alt="" /> 
      <input type="password" placeholder='Password' value={password} onChange={handleChangepassword}  />
      {errors.password && <span className="error">{errors.password}</span>}

      </div>
      </div>
      
      <div>
      <div className="header">  
      <div className="text2">OR</div>
      <div className="underline"></div>  
    </div>
        <Link to="/login" className="d">
  <img src={google_icon} alt="Google Icon" /> 
</Link>
</div>



      <div className="submit-container">
      <div className={`submit ${isFormValid ? '' : 'disabled'}`} onClick={isFormValid ? handleSubmit : null}>Sign up</div>
        <Link to="/login" className="submit1">Login</Link> {/* Redirection vers la page de connexion */}

        

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
