import React from "react";
import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //Post do usuário
  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", null, uid);

  const deleteDocument = (id) => {};

  if (loading) {
    return <strong>Carregando...</strong>;
  }
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <h3>{user.displayName}</h3>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts}>
          {" "}
          {/*Tal classe está sendo muito utilizada. Seria melhor tornála global, ou até mesmo um componente*/}
          <p>Não foram encontrados posts</p>
          <Link to="/post/create" className="btn">
            Criar novo post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título: </span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <div className={styles.titlesImage}>
                  <p>{post.title}</p>
                  <img src={post.image} alt={post.title} className={styles.images}/>
                </div>
                <div>
                  <Link to={`/post/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`post/edit/${post.id}`} className="btn btn-outline">
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
