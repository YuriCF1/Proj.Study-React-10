import React from "react";

//Css
import styles from "./Home.module.css";

// Hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// Components

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Não foram encontrados posts ainda...</p>{" "}
            <Link to="/post/create" target="_blanked" className="btn">
              Criar primeiro post :)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
