// CENTRALIZAÇÃO DAS FUNÇÕES DE AUTENTIFICAÇÃO

import { dataBank } from "../firebase/config";

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

  // REGISTER_____________________________
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Ops, email já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarde :)";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []);

  // LOG-OUT_______________________
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  return { createUser, error, loading, auth, logout };
};
