import React from "react";

import { useState, useEffect } from "react";

import styles from "./Register.module.css";

const Register = () => {
  return (
    <div>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form action="">
        <label htmlFor="">
          <span>Nome:</span>
          <input
            type="text"
            name="displayname"
            id=""
            required
            placeholder="Nome do usuário"
          />
        </label>
        <label htmlFor="">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            id=""
            required
            placeholder="E-mail do usuário"
          />
        </label>
        <label htmlFor="">
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            id=""
            required
            placeholder="Crie aqui sua senha"
          />
        </label>
        <label htmlFor="">
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            id=""
            required
            placeholder="Confirme aqui sua senha"
          />
        </label>
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
