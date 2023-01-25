// import { dataBank } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  upDateProfile,
  signOut,
  updateProfile,
} from "firebase/auth"; //O firebase salva email e senha apenas. Depois que que atualizar o perfil com o nome do usuário

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //Cleanup - Dealing with memory leak - Por conta das mudanças de componentes entre páginas
  //Eliminando resquícios de funções ainda sendo executadas
  const [cancelled, setCanceled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []);

  return {createUser, error, loading, auth}
};
