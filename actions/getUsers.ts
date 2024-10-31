"use server";
import { db } from "@/db";

export const getAllUsers = async () => {
  try {
    const user = await db.user.findMany();
    return user;
  } catch (err) {}
};
