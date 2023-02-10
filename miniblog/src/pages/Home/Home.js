import React from "react";

//Css
import styles from "./Home.module.css";

// Hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
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
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => (
            // <h3 key={post.id}>{post.title}</h3>
            <PostDetail key={post.id} post={post} />
          ))}
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
