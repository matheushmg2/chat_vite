import { Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";


class UsersController {
  
  async profile(request: Request, response: Response) {

    const { userId } = request;

    const services = new UsersServices();

    const result = await services.profile(userId);

    return response.json(result);

  }
}

export { UsersController }