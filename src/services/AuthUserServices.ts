import axios from "axios";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../prisma";

interface IAccessToken {
  access_token: string;
  token_type: string;
  scope: string;
}

interface IUser {
  avatar_url: string;
  login: string;
  name: string;
  id: number;
}

class AuthUserServices {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    /**
     * 1ª Qual a url
     * 2º Ele espera um "data / dados" -> "data" || null caso não passe
     * 3º Alguns paramentros para que possamos usar o token de acesso ou para acesso
     */
    const { data: accessToken } = await axios.post<IAccessToken>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const response = await axios.get<IUser>("https://api.github.com/user", {
      headers: {
        authorization: "Bearer " + accessToken.access_token,
      },
    });

    const { login, id, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          avatar_url,
          login,
        },
      });
    }

    const token = sign(
      {
        user: {
          id: user.github_id,
          avatar_url: user.avatar_url,
          login: user.login,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthUserServices };
