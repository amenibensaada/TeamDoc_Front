import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

const FormContainer = styled(animated.div)`
  background-color: #f3f1f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto;
  width: 90%;
  max-width: 1000px;
`;

const FormSection = styled.section`
  padding: 20px;
  width: 60%;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2e3440;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #4c566a;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #7e57c2;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #7e57c2;
  }
`;

const StyledButton = styled(Button)`
  background-color: #7e57c2;
  border-color: #7e57c2;
  &:hover {
    background-color: #5e35b1;
    border-color: #5e35b1;
  }
`;

const ImageContainer = styled.div`
  width: 40%;
  margin-left: 20px;
`;

function ContactForm() {
  const [recipient_email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { duration: 500 },
  });

  function sendMail() {
    if (recipient_email && subject && message) {
      axios
        .post("http://localhost:3000/mailing/send_email", {
          recipient_email,
          subject,
          message,
        })
        .then(() => {
          setIsMailSent(true);
        })
        .catch(() => alert("Oops! Something went wrong."));
      return;
    }
    return alert("Please fill in all fields to continue");
  }

  return (
    <FormContainer style={animationProps}>
      <FormSection>
        <Title>Envoyer un mail</Title>
        <Description>
          Remplissez le formulaire ci-dessous pour nous contacter.
        </Description>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Votre Email
            </label>
            <Input
              type="email"
              id="email"
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setEmail(e.target.value)}
              placeholder="username@gmail.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Sujet
            </label>
            <Input
              type="text"
              id="subject"
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setSubject(e.target.value)}
              placeholder="Indiquez comment nous pouvons vous aider"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Votre message
            </label>
            <TextArea
              id="message"
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setMessage(e.target.value)}
              placeholder="Votre message ici"
              required
              rows={4}
            />
          </div>
          <StyledButton variant="primary" onClick={() => sendMail()}>
            Envoyer
          </StyledButton>
          {isMailSent && (
            <p className="text-success mt-3">Mail envoyé avec succès!</p>
          )}
        </form>
      </FormSection>
      <ImageContainer>
        {/* Ajoutez votre image ici */}
        <img src="./mailing.jpg" alt="Image Description" width="100%" />
      </ImageContainer>
    </FormContainer>
  );
}

export default ContactForm;
