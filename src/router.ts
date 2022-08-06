import { Router } from "express";
import { AuthUserController } from "./controllers/AuthUserController";
import { MessagesController } from "./controllers/MessagesController";
import { UsersController } from "./controllers/UsersController";
import { EnsureAuthenticated } from "./middleware/EnsureAuthenticated";

const router = Router();

const auth = new AuthUserController();

const messages = new MessagesController();

const user = new UsersController();

router.post('/auth', auth.handle);

router.post('/messages', EnsureAuthenticated, messages.handle);

router.get('/messages/lastTreeMessage', messages.lastTreeMessage);
router.get('/messages/allMessages', messages.allMessages);


router.get('/profile', EnsureAuthenticated, user.profile);

export { router }