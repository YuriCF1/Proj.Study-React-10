import React from "react";
import { Link } from "react-router-dom";

//Css
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>
        Sobre o Min<span>Blog</span>
      </h1>
      <p>
        Este projeto é feito para evolução nas prática do React no Frontend,
        utilizando também firebase, no backend. Com criação de usuários, posts,
        login, logout e outras features presentes na maioria das redes sociais
      </p>
      <span>Teste o app agora mesmo!</span>
      <Link to={"/post/create"} >
         <button className="btn">Criar Post</button>
      </Link>
    </div>
  );
};

export default About;
