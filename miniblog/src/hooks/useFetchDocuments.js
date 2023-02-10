import { useEffect, useState } from "react";
import { dataBank } from "../firebase/config";
import {
  collection, //Definir a coleção
  query, //Pegar um dado
  orderBy, //Ordenção
  onSnapshot, //Mapear dados que foram alterados
  where, //Filtro dos resultados que são trazidos
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  //Não usei o reducer como no outro hook pois a estrutura é mais simples, apenas estou carregando dados
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = await collection(dataBank, docCollection);

      try {
        let q;

        //busca
        //dashboard

        if (search) {
          //Pesquisa feita na Home
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search), //Dentro de 'tags, verica se um item está dentro d o array, que seria o 'search'
            orderBy("createdAt", "desc")
          ); //Criando busca de forma mais simples. Pegar dados e ordenar pela data decrescente
        } else if (uid) {
          //Dashboard do usuário
          q = await query(
            collectionRef,
            where("uid", "==", uid), //Quando o uid(do user), for igual ao uid(do post)
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc")); //Criando busca de forma mais simples. Pegar dados e ordenar pela data decrescente
        }

        //Mapear os dados. Toda vez que alterar, vai atualizar com os dados novos
        await onSnapshot(q, (QuerySnapshot) => {
          setDocuments(
            QuerySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), //Pegando dados separando em um array. Vindo quase da mesma maneira como foram inseridos
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return setCancelled(true);
  }, []);

  return { documents, loading, error };
};
