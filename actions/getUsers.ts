"use server";

import { db } from "@/db";

export const getAllUsers = async () => {
  try {
    const user = await db.user.findMany();
    console.log(user);

    return user;
  } catch (err) {}
};
