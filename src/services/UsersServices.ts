import { prismaClient } from "../prisma";

class UsersServices {
  async profile(userId: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}

export { UsersServices };
