import React from "react";
import { Link } from "react-router-dom";

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

//Components
import PostDetail from "../../components/PostDetail";

import styles from './Search.module.css'

const Search = () => {
  const query = useQuery();
  const search = query.get("q"); //Vem do URLSearchParams, do hook. Pegando o atributo do 'q', cadastrado lá

  const { documents: posts } = useFetchDocuments("posts", search); //Colection pre definida, na criação dos posts

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <p>{search}</p>
      <div>
        {posts && posts.length == 0 && (
          <div className={styles.noPost}>
            <p>
              Não foram encontrados posts a partir da sua busca... tente
              novamente
            </p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts &&
          posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
