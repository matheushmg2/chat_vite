import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}


/**
 * Garantir Autenticado
 */
export function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "Token not valid | Token inválido",
    });
  }

  /**
   * Estou fazendo uma desestruturação em um "texto", e trazendo apenas o necessário e colocando dentro de uma variavel token
   * [0] = Bearer
   * [1] = o valor do token. Ex: 1af006749142b692814b
   */

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.userId = sub;

    return next();
    
  } catch (error) {
    return response.status(401).json({ errorCode: "Token expired | Token expirado"})
  }

}
