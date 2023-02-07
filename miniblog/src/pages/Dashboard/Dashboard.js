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
    return <strong>Carregando...</strong>
  }
  return ( 
    <div>
      <h2>Dashboard</h2>
      <h3>{user.displayName}</h3>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noPosts}>
          <p>Não foram encontrados posts</p>
          <Link to="/post/create" className="btn">
            Criar novo post
          </Link>
        </div>
      ) : (
        <>
          <div>
            <span>Título: </span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id}>
                <p>{post.title}</p>
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
