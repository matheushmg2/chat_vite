import { useContext } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { AuthContext } from "../../contexts/Auth";

import s from "./styles.module.scss";

const LoginBox = () => {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className={s.loginBoxWrapper}>
      <strong>Entre e compartilhe Ideias</strong>
      <a href={signInUrl} className={s.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar em GitHub
      </a>
    </div>
  );
};

export { LoginBox };
