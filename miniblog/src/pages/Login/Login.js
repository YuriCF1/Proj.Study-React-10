import React from "react";

import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user)
    console.log(res);
  };

  useEffect(()=> {
    if(authError) {
      setError(authError)
    }
  },[authError])

  return (
    <section className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça seu login para poder usar o sistema</p>
      <form onSubmit={handleSubmit}>
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
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
};

export default Login;
