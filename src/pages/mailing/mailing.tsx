//import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  HiOutlineMail,
  HiOutlineClipboardList,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { useSpring } from "react-spring";
import Footer from "../footer/footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FormContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto;
  width: 90%;
  max-width: 1000px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormSection = styled.section`
  padding: 20px;
  width: 60%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #7e57c2; /* Violet */
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #4c566a;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  padding-left: 40px;
  transition: border-color 0.3s ease; /* Transition uniquement sur la couleur du bord */
  &:focus {
    border-color: #7e57c2;
    box-shadow: 0 0 5px rgba(126, 87, 194, 0.5);
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #7e57c2;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s ease; /* Transition uniquement sur la couleur du bord */
  &:focus {
    border-color: #7e57c2;
    box-shadow: 0 0 5px rgba(126, 87, 194, 0.5);
  }
`;

/*const StyledButton = styled(Button)`
  background-color: #7e57c2;
  border-color: #7e57c2;
  &:hover {
    background-color: #5e35b1;
    border-color: #5e35b1;
  }
`;*/

const ImageContainer = styled.div`
  width: 40%;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`;

function ContactForm() {
  const [recipient_email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);

  const inputProps = useSpring({ opacity: 1, from: { opacity: 0 } });

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
    <>
      <FormContainer>
        <FormSection>
          <Title>Envoyer un email</Title>
          <Description>
            Remplissez le formulaire ci-dessous pour nous contacter.
          </Description>
          <form>
            <InputGroup>
              <IconWrapper>
                <HiOutlineMail />
              </IconWrapper>
              <Input
                type="email"
                style={inputProps}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
              />
            </InputGroup>
            <InputGroup>
              <IconWrapper>
                <HiOutlineClipboardList />
              </IconWrapper>
              <Input
                type="text"
                style={inputProps}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Objet du message"
                required
              />
            </InputGroup>
            <InputGroup>
              <IconWrapper>
                <HiOutlineChatAlt2 />
              </IconWrapper>
              <StyledTextArea
                style={inputProps}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message ici"
                required
                rows={4}
              />
            </InputGroup>
            <Button onClick={sendMail}>Envoyer</Button>
            {isMailSent && (
              <p className="text-success mt-3">Mail envoyé avec succès!</p>
            )}
          </form>
        </FormSection>
        <ImageContainer>
          {/* Ajoutez votre image/logo ici */}
          <img src="./logo.png" alt="Logo de l'application" width="100%" />
        </ImageContainer>
      </FormContainer>
      <Footer />
    </>
  );
}

export default ContactForm;
