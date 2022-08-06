import { Request, Response } from "express";
import { MessagesServices } from "../services/MessagesServices";


class MessagesController {
  
  async handle(request: Request, response: Response) {

    const { message } = request.body;

    const { userId } = request;

    const service = new MessagesServices();

    const result = await service.execute(message, userId);

    return response.json(result);

  }

  async lastTreeMessage(request: Request, response: Response) {

    const service = new MessagesServices();

    const result = await service.messages();

    return response.json(result);

  }

  async allMessages(request: Request, response: Response) {

    const service = new MessagesServices();

    const result = await service.allMessages();

    return response.json(result);

  }
}

export { MessagesController }