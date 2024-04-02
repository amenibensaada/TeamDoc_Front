import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginSchema } from "../dto/loginDto";
import { z } from "zod";
import email_icon from "../../assets/img/email.png";
import password_icon from "../../assets/img/password.png";
import signup_icon from "../../assets/img/aziz3.jpg";
import logo from "../../assets/img/logo.png";
import google_icon from "../../assets/img/login3.png";
import { useMutation } from "@tanstack/react-query";
import { loginUser, loginWithGoogle } from "@/services/LoginUser";
import { Button } from "@/components/ui/button";
import firebase, { auth, signInWithGoogle } from "@/firebase/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(true);
  const navigate = useNavigate();

  const handleChangeEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isFormValid = email !== "" && password !== "";
  const mutation = useMutation({
    mutationFn: (body: z.infer<typeof loginSchema>) => loginUser(body),
    onSuccess: () => {
      console.log("User created successfully");
      setErrors({});
      navigate("/");
    },
  });
  useEffect(() => {
    auth.signOut().then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firebase.auth().onAuthStateChanged(async (newUser: any) => {
        if (newUser) {
          await loginWithGoogleMutation.mutate({ googleUuid: newUser.uid });
        }
      });
    });
  });
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const loginWithGoogleMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (body: any) => loginWithGoogle(body),
    onSuccess: () => {
      console.log("User created successfully");
      setErrors({});
      navigate("/sidebar");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response && error.response.status === 404) {
        console.log("User not found. Please create an account.");
        setErrors({ email: "User not found. Do you want to sign up instead?" });
      } else {
        console.log("User not found. Please create an account.");
        setErrors({ email: "User not found. Please create an account." });
      }
    },
  });

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (isFormValid) {
      const userData = {
        email: email.trim(),
        password: password.trim(),
      };

      try {
        loginSchema.parse(userData);
        mutation.mutate(userData);
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

  const buttonClass = `submit ${!isFormValid && isSubmitted ? "disabled" : ""}`;

  return (
    <>
      <div className="container ">
        <div className="left-half">
          <div className="header">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "200px", height: "auto" }}
            />
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
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
            <div className="header">
              <div className="text2">OR</div>
              <div className="underline"></div>
              <Button className="d" onClick={handleGoogleSignIn}>
                <img src={google_icon} alt="Google Icon" />
              </Button>
            </div>
          </div>
          <div className="forgot-password">
            Lost password ? <span>Click here !</span>
          </div>
          <div className="submit-container">
            <Link
              to="/signup"
              className={`submit1 ${isFormValid ? "" : "disabled"}`}>
              Sign up
            </Link>
            <div
              className={buttonClass}
              onClick={isFormValid ? handleSubmit : undefined}
              style={
                !isFormValid && isSubmitted ? { cursor: "not-allowed" } : {}
              }>
              Login
            </div>
          </div>
          {errorMessage}
        </div>
        <div className="right-half">
          <img src={signup_icon} alt="Profile" />
        </div>
      </div>
    </>
  );
}
