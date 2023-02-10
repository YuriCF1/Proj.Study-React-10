//LÓGICA DE ADIÇÃO DE DADOS NO FIREBASE

import { useEffect, useReducer, useState } from "react";
import { dataBank } from "../firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore"; //Collections são lugadores onde salvam os dados(categorias de post e etc). Em outros serviços é chamado de 'tabelas'

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload }; //Enviando o error para 'action'
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  //Programar insere algo no sistema, informa a coleção, então o hook insere qualquer elemento, não só o 'post'
  const [response, dispatch] = useReducer(updateReducer, initialState);

  //deal with memory leak
  const [cancelled, setCanceled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    console.log("checkCancelBeforeDispatch");
    if (cancelled) {
      console.log("!cancelled");
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = await doc(dataBank, docCollection, id);
      const updatedDocument = await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []);

  return { updateDocument, response };
};
