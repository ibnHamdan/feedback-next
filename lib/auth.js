import React, { useState, createContext, useContext, useEffect } from "react";

import firebase from "./firebase";
import { createUser } from "./db";

const authContext = createContext();

export function ProvideAuth({children}) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user =  formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);

      return user;
    } else {
      setUser(false);
      console.log("no user to handling");
      return false;
    }
  };
  const signinWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup( new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      })
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      })
  }
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })
    return () => unsubscribe();

  }, []);

  return {
    user,
    signinWithGitHub,
    signout
  }
}

const formatUser = (user) => {
  //const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoUrl,
  };
};