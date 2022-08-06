import { Request, Response } from "express";
import { AuthUserServices } from "../services/AuthUserServices";


class AuthUserController {
  async handle(request: Request, response: Response) {

    const { code } = request.body;

    const service = new AuthUserServices();

    try {
      
      const result = await service.execute(code);

      return response.json(result);

    } catch (error) {
      return response.json(error.message);
    }

    

  }
}

export { AuthUserController }