import React from "react";
import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; //Redirecionar depois que criar o post
import { useAuthValue } from "../../context/AuthContext"; //Pegar o usuário e atrelar no post, fazendo a dashboard
import { useAuthentication } from "../../hooks/useAuthentication";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setErros] = useState("");
  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErros("");
    console.log(response);    
    //Validate image's URL

    //Criar o array das tags

    //Checar todos os valores

    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      cratedBy: user.displayName,
    });

    //Redirect home page
  };

  const { login, error: authError, loading } = useAuthentication();

  return (
    <div className={styles.create_post}>
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
        {!response.loading && <button className="btn">Criar post</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
