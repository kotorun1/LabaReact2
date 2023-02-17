// RegistrationForm.js
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";



export default function RegistrationForm({ onRegister ,isLoggedIn}) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMail, setErrorMail] = useState('')
  const [errorPass, setErrorPass] = useState('')


  const handleClick = () => {
    navigate("/login");
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Проверка наличия имени пользователя, пароля и подтверждения пароля
    if (!username || !password || !confirmPassword) {
        setErrorMessage('Имя пользователя, пароль и подтверждение пароля не могут быть пустыми');
        return;
      }
  
      // Проверка совпадения пароля и подтверждения пароля
    else if (password !== confirmPassword) {
      setErrorPass('Пароль и подтверждение пароля не совпадают');
        return;
      }
  
      // Проверка валидности email-адреса
    else if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMail('Неправильный формат email-адреса');
        return;
      }
    else {
        onRegister({ username, password,email });
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setErrorMessage('');
        setErrorMail('');
        setErrorPass('');
        handleClick('');
        
    }
  };





  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div>{errorMessage}</div>}
      <label>
        Имя пользователя:
        <input type="text" value={username} className={errorMessage && 'validate-error'}onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Пароль:{errorPass&&<p>{errorPass}</p>}
        <input type="password" value={password} className={errorPass && 'validate-error'} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Подтверждение пароля:{errorPass&&<p>{errorPass}</p>}
        <input type="password" value={confirmPassword} className={errorPass && 'validate-error'} onChange={(event) => setConfirmPassword(event.target.value)} />
      </label>
      <label>
        Email:{errorMail&& <p>{errorMail}</p>}
        <input type="email" value={email} className={errorMail && 'validate-error'} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <button type="submit">Зарегистрироваться</button>
    </form>
    );
    }


