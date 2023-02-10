import React, { useEffect } from "react";
import styles from "./EditPost.module.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //Redirecionar depois que criar o post
import { useAuthValue } from "../../context/AuthContext"; //Pegar o usuário e atrelar no post, fazendo a dashboard

import { useAuthentication } from "../../hooks/useAuthentication";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams(); //Entrega um objeto com os dados que vieram da url
  const { user } = useAuthValue();
  const { document: post } = useFetchDocument("posts", id);

  const { updateDocument, response } = useUpdateDocument("posts");

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formErrors, setFormErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors("");

    //Validate image's URL
    try {
      new URL(image);
    } catch (error) {
      setFormErrors("A imagem precisa ser um URL");
    }

    //Criar o array das tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase()); //Padronizar tudo em lowercase para que haja a busca mais facilmente

    //Checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormErrors("Por favor, preencha todos os campos.");
    }

    if (formErrors) return;

    const newData = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(id, newData);
    console.log("tried");

    //Redirect home page
    navigate("/dashboard");
  };

  const { login, error: authError, loading } = useAuthentication();

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post {post.title}</h2>
          <p>Altere os dados do post como desejar</p>

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
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
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
            {!response.loading && <button className="btn">Editar post</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formErrors && <p className="error">{formErrors}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
