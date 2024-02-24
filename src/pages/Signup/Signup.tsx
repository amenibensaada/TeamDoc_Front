import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { z } from 'zod'; // Importez Zod
import './signup.css';

import user_icon from '../../assets/img/person.png';
import email_icon from '../../assets/img/email.png';
import password_icon from '../../assets/img/password.png';
import signup_icon from '../../assets/img/aziz1.jpg';
import google_icon from '../../assets/img/login3.png';
import logo from '../../assets/img/logo.png';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(true);

  const signupSchema = z.object({
    name: z.string()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]+$/, { message: "Name must contain only letters." }),
    email: z.string().email(),
    password: z.string()
      .min(6)
      .regex(/[0-9]/, { message: "Password must contain at least one digit." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character." }),  
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
    setIsSubmitted(true);

    if (isFormValid) {
      const userData = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      };

      try {
        signupSchema.parse(userData);
        console.log("Form data:", userData);
        setErrors({});
      } catch (error) {
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
      <div className='container'>
        <div className="left-half">
          <div className="header">  
            <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
            <div className="text">Sign up</div>
            <div className="underline"></div>  
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" /> 
              <input type="text" placeholder='Name' value={name} onChange={handleChangename} />
            </div>
            {errors.name && <div className="error">{errors.name}</div>}

            <div className="input">
              <img src={email_icon} alt="" /> 
              <input type="email" placeholder='Email' value={email} onChange={handleChangeemail} />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}

            <div className="input">
              <img src={password_icon} alt="" /> 
              <input type="password" placeholder='Password' value={password} onChange={handleChangepassword} />
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          
          <div>
            <div className="header"> 
              <div className="text2">         </div>
              <div className="text2">         </div>
              <div className="text2">         </div>
              <div className="underline"></div>  
            </div>  
          </div>  

          <div className="submit-container">
  <div className={buttonClass} onClick={isFormValid ? handleSubmit : null} style={!isFormValid && isSubmitted ? { cursor: 'not-allowed' } : {}}>
    Sign up
  </div>
  <Link to="/login" className="submit1">Login</Link> {/* Redirection vers la page de connexion */}
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
