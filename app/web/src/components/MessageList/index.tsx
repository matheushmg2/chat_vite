import s from "./styles.module.scss";

import LogoImg from "../../assets/images/logo.svg";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import io from "socket.io-client";
import classnames from "classnames";
import { AuthContext } from "../../contexts/Auth";

type TMessages = {
  id: string;
  text: string;
  user: {
    id: string;
    avatar_url: string;
    login: string;
  };
};

const messagesQueue: TMessages[] = []; // Fila de mensagem, que retorna uma lista

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: TMessages) => {
  messagesQueue.push(newMessage);
});

const MessageList = () => {
  const { users } = useContext(AuthContext);
  const [messages, setMessages] = useState<TMessages[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {

        api.get<TMessages[]>("messages/allMessages").then((response) => {
          const concatenado = messagesQueue.concat(response.data);
          setMessages(concatenado);
        });

        messagesQueue.shift();
      }
    }, 100);
  }, []);

  useEffect(() => {
    api.get<TMessages[]>("messages/allMessages").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={s.messageListWrapper}>
      <img src={LogoImg} alt="LogoImg" />
      <div className={s.talvez}></div>
      <ul className={s.messageList}>
        {messages.map((message, key) => {
          return (
            <li
              className={classnames(
                s.messages,
                message.user.id === users?.id ? s.leftMessage : s.rightMessage
              )}
              key={key}
            >
              <p className={s.messageContent}>{message.text}</p>
              <div className={s.messageUser}>
                <div className={s.userImage}>
                  <img
                    src={message.user.avatar_url}
                    alt={message.user.avatar_url}
                  />
                </div>
                <span>{message.user.login}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { MessageList };
