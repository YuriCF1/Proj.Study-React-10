import React from "react";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./Register.module.css";

const Register = () => {
  const [displayname, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayname,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais. Por vafor, verifique novamente");
      return console.error(error);
    }

    const rest = await createUser(user)
    console.log(rest);
  };

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Nome:</span>
          <input
            type="text"
            name="displayname"
            required
            placeholder="Nome do usuário"
            autoComplete="username"
            value={displayname}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            autoComplete="username email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="">
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Crie aqui sua senha"
            autoComplete="username new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label htmlFor="">
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme aqui sua senha"
            autoComplete="username new-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
