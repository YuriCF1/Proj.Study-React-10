//LÓGICA DE ADIÇÃO DE DADOS NO FIREBASE

import { useEffect, useReducer, useState } from "react";
import { dataBank } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore"; //Collections são lugadores onde salvam os dados(categorias de post e etc). Em outros serviços é chamado de 'tabelas'

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload }; //Enviando o error para 'action'
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  //Programar insere algo no sistema, informa a coleção, então o hook insere qualquer elemento, não só o 'post'
  const [response, dispatch] = useReducer(insertReducer, initialState);

  //deal with memory leak
  const [cancelled, setCanceled] = useState(false);

  const checkCancelForDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };
};

const insertDocument = async (document) => {
  checkCancelForDispatch({
    type: "LOADING",
  });
  try {
    const newDocument = { ...document, createdAt: Timestamp.now() };
    const insertedDocument = await addDoc( //addDoc do Firebase
      collection(dataBank, docCollection), //Procurando no banco de dados a coleção que eu passei como argumento da função || Collection do Firebase
      newDocument //Inserindo uma nova propriedade dentro do objeto enviado. Hora definida
    );

    checkCancelForDispatch({
      type: "INSERTED_DOC",
      payload: insertedDocument,
    //   payload: console.log('Payload'),
    });
  } catch (error) {
    checkCancelForDispatch({
      type: "ERROR",
      payload: error.message,
    });
  }

  useEffect(()=> {
    setCanceled(true)
  }, [])

  return [insertDocument, response]
};
