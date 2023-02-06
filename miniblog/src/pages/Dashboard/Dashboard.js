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
  const posts = [];
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noPosts}>
          <p>Não foram encontrados posts</p>
          <Link to='/post/create' className="btn">Criar novo post</Link>

        </div>
      ) : (
        <div>
          <p>Tem posts</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
