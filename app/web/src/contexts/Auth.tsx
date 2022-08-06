import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type TAuth = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    login: string;
  };
};

type TUser = {
  id: string;
  avatar_url: string;
  login: string;
};

type TAuthContext = {
  users: TUser | null;
  signInUrl: string;
  signOut: () => void;
};

type TAuthProvider = {
  children: ReactNode;
};

const AuthContext = createContext({} as TAuthContext);

const AuthProvider = (props: TAuthProvider) => {
  const [users, setUsers] = useState<TUser | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=91102706ff59f66ee00d`;

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    const signIn = async (githubCode: string) => {
      const response = await api.post<TAuth>("auth", {
        code: githubCode,
      });

      const { token, user } = response.data;

      localStorage.setItem("userToken", token);

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUsers(user);
    };

    if (hasGithubCode) {
      const [urlWithOutCode, githubCode] = url.split("?code=");

      /**
       * Estou limpando a url, para que fique visivel apenas a url padrão para o usuário
       */
      window.history.pushState({}, "", urlWithOutCode);

      signIn(githubCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<TUser>("profile").then((response) => {
        setUsers(response.data);
      });
    }
  }, []);

  const signOut = () => {
    setUsers(null);
    localStorage.removeItem("userToken");
  }

  return (
    <AuthContext.Provider value={{ signInUrl, users, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
