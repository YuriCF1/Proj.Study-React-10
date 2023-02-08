//LÓGICA DE ADIÇÃO DE DADOS NO FIREBASE

import { useEffect, useReducer, useState } from "react";
import { dataBank } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore"; //Collections são lugadores onde salvam os dados(categorias de post e etc). Em outros serviços é chamado de 'tabelas'


const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload }; //Enviando o error para 'action'
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const [cancelled, setCanceled] = useState(false);
  //deal with memory leak

  const checkCancelBeforeDispatch = (action) => {
    if (cancelled) {
      console.log("!cancelled");
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const deletedDocument = await deleteDoc(doc(dataBank, docCollection, id)); //Referenciando com a docColection, e o id do post

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deleteDoc,
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

  return { deleteDocument, response };
};
