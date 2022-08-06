import { io } from "../app";
import { prismaClient } from "../prisma"


class MessagesServices {
  async execute(text: string, userId: string){
    const messages = await prismaClient.message.create({
      data: {
        text,
        userId
      },
      // Trazendo as informações do Usuário
      include: {
        user: true,
      },
    });

    const infoMessageUser = {
      text: messages.text,
      userId: messages.userId,
      created_at: messages.created_at,
      user: {
        avatar_url: messages.user.avatar_url,
        login: messages.user.login,
      }
    }

    io.emit("new_message", infoMessageUser);

    return messages;
  }

  async messages() {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true,
      },
    })

    return messages;
  }

  async allMessages() {
    const messages = await prismaClient.message.findMany({
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true,
      },
    })

    return messages;
  }
}

export { MessagesServices }