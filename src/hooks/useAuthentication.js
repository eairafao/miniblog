import { db } from "../firebase/config"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

import React from 'react'

export function useAuthentication() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // cleanup 
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError(null)
    try {

      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, {
        displayName: data.displayName
      })

      return user

    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message)

      let systemErrorMessage
      if(error.message.includes("Passoword")){
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      }else if(error.message.includes("Email-already")){
        systemErrorMessage = "E-mail já cadastrado";
      }else{
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage)
    }
    setLoading(false)
  };

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
  }
};
