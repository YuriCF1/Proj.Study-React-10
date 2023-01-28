import React from "react";
import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; //Redirecionar depois que criar o post
import { useAuthValue } from "../../context/AuthContext"; //Pegar o usuário e atrelar no post, fazendo a dashboard
import { useAuthentication } from "../../hooks/useAuthentication";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setErros] = useState("");

  const handleSubmit = (e) => {
    e.preventDefeault();
  };

  const { login, error: authError, loading } = useAuthentication();

  return (
    <div  className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um ótimo título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que represente o seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgulas"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
      </form>
      <button className="btn">Postar</button>
      {/* {!loading && <button className="btn">Cadastrar</button>}
      {loading && (
        <button className="btn" disabled>
          Aguarde...
        </button>
      )}
      {error && <p className="error">{error}</p>} */}
    </div>
  );
};

export default CreatePost;
