import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import "./signup.css";

import user_icon from "../../assets/img/person.png";
import email_icon from "../../assets/img/email.png";
import password_icon from "../../assets/img/password.png";
import signup_icon from "../../assets/img/aziz1.jpg";
import logo from "../../assets/img/logo.png";
import { signupSchema } from "../dto/createUserDto";
import { createUser } from "@/services/userService";
//import { createUser } from "@/services/userService";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;

    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
  };

  const isFormValid =
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "";

  const mutation = useMutation({
    mutationFn: (body: z.infer<typeof signupSchema>) => createUser(body),
    onSuccess: () => {
      console.log("User created successfully");
      setErrors({});
      navigate("/login");
    },
  });

  const handleSubmit = async () => {
    setIsSubmitted(true);

    if (isFormValid) {
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      };

      try {
        signupSchema.parse(userData);
        mutation.mutate(userData);
        console.log("User created successfully");
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

  const buttonClass = `submit ${!isFormValid && isSubmitted ? "disabled" : ""}`;

  return (
    <>
      <div className="container">
        <div className="left-half">
          <div className="header">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "200px", height: "auto" }}
            />
            <div className="text">Sign up</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="FirstName"
                value={firstName}
                onChange={handleChangeFirstName}
              />
            </div>
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="LastName"
                value={lastName}
                onChange={handleChangeLastName}
              />
            </div>
            {errors.lastName && <div className="error">{errors.lastName}</div>}

            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}

            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="confirm Password"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
            </div>
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </div>

          <div>
            <div className="header">
              <div className="text2"> </div>
              <div className="text2"> </div>
              <div className="text2"> </div>
              <div className="underline"></div>
            </div>
          </div>

          <div className="submit-container">
            <div
              className={buttonClass}
              onClick={isFormValid ? handleSubmit : null}
              style={
                !isFormValid && isSubmitted ? { cursor: "not-allowed" } : {}
              }>
              Sign up
            </div>
            <Link to="/login" className="submit1">
              Login
            </Link>{" "}
            {/* Redirection vers la page de connexion */}
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
