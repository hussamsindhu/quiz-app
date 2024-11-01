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
    return user;
  } catch (err) {}
};
