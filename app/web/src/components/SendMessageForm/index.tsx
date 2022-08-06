import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

import s from "./styles.module.scss";
import { api } from "../../services/api";

const SendMessageForm = () => {
  const { signOut, users } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    // Verificar se o texto estiver vazio, mesmo se estiver com espaço
    if (!message.trim()) {
      return;
    }

    await api.post("messages", { message });

    setMessage("");
  };

  return (
    <div className={s.sendMessageFormWrapper}>
      <button className={s.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>
      <header className={s.userInformation}>
        <div className={s.userImage}>
          <img src={users?.avatar_url} alt={users?.avatar_url} />
        </div>
        <strong className={s.userName}>{users?.login}</strong>
        <span className={s.userGithub}>
          <VscGithubInverted size={16} />
          {users?.login}
        </span>
      </header>
      <form onSubmit={handleSendMessage} className={s.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Descreva o seu pessamento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
};

export { SendMessageForm };
