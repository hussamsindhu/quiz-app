"use server";

import { db } from "@/db";

export const getAllUsers = async () => {
  try {
    const user = await db.user.findMany({
      select: {
        username: true,
        email: true,
        imageUrl: true,
        externalUserId: true,
      },
    });
    console.log("kya tum chal rae hooo", user);

    return user;
  } catch (err) {}
};
