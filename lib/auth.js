import React, { useState, createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import firebase from "./firebase";
import { createUser } from "./db";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      console.log("user isr", rawUser);
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      setUser(user);
      createUser(user.uid, userWithoutToken);
      Cookies.set("fast-feedback-auth", true, {
        expires: 1,
      });

      console.log("retuned user", user);
      return user;
    } else {
      setUser(false);
      Cookies.remove("fast-feedback-auth");
      console.log("no user to handling");
      return false;
    }
  };
  const signinWithGitHub = () => {
    Router.push("/sites");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };
  const signinWithGoogle = () => {
    Router.push("/sites");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    Router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}

const formatUser = (user) => {
  //const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    token: user.user._lat,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
