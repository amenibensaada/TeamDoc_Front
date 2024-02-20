import React, { ChangeEvent, useState } from 'react';
import './ForgetPassword.css';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isValidPassword = password.length >= 8 && password.includes(' ');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!password.includes(' ')) {
      setErrorMessage('Password must contain at least one space character.');
      return;
    }

    if (password.length > 80) {
      setErrorMessage('Password cannot be longer than 80 characters.');
      return;
    }

    // Submit the form data to the server here

    setSuccessMessage('Your password has been successfully reset.');
    setErrorMessage('');
  };

  return (
    <div className="container">
      <div className="left-half">
        <div className="header">
          <div className="text">Reset Password</div>
          <div className="underline"></div>
        </div>
        <div className="frame">
          <div className="inputs">
            {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}
            <form onSubmit={handleFormSubmit}>
              <div className="input">
                <input type="password" placeholder="New password" value={password} onChange={handlePasswordChange} />
              </div>
              <div className="input mb-4">
                <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              </div>
              <div className="flex items-center">
  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
  <label htmlFor="terms" className="ml-2 font-light text-gray-500 dark:text-gray-300">
    I accept the <Link to="/conditions" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</Link>
  </label>
</div>
              <div className="submit-container">
                <button type="submit" className={`submit1 ${!isValidPassword || password !== confirmPassword || errorMessage ? "disabled" : ""}`}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="right-half">
        <img src="/girl.svg" alt="Password Reset" className="password-image" />
      </div>
    </div>
  );
}
