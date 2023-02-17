// LoginForm component
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function LoginForm({ onLogin, users,isLoggedIn }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState("");
  const [validateError,setValidateError] = useState(false)
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleClick = () => {
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundUser = users.find(
      (user) => user.name === username && user.password === password
    );
    if (foundUser) {
      onLogin();
      setValidate('')
      handleClick()
    } else {
      setValidateError(true)
      setValidate("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
        className={validateError&&"validate-error"}
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          className={validateError&&"validate-error"}
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Log in</button>
      {validate}
    </form>
  );
}




