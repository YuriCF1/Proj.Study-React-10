import { useEffect, useState } from "react";
import { dataBank } from "../firebase/config";
import {
  doc, //Instancia de um documento e métodos que o envolvem
  getDoc, //Pegar um documento do banco de dados
} from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  //Não usei o reducer como no outro hook pois a estrutura é mais simples, apenas estou carregando dados
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;

      setLoading(true);
      try {
        const docRef = await doc(dataBank, docCollection, id);
        const docSnap = await getDoc(docRef);
        setDocument(docSnap.data());

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }

    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return setCancelled(true);
  }, []);

  return { document, loading, error };
};
