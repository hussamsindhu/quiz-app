import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(req: Request) {
  try {
    console.log("yey chala");

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", body);

    if (eventType === "user.created") {
      console.log("idr a gya hoon");

      await db.user.create({
        data: {
          username: payload.data.first_name || "",
          externalUserId: payload.data.id || "",
          imageUrl: payload.data.image_url || "",
          email: payload.data.email_addresses[0].email_address || "",
        },
      });
    }

    if (eventType === "user.updated") {
      console.log("here update the call");
      await db.user.update({
        where: {
          externalUserId: payload.data.id,
        },
        data: {
          username: payload.data.first_name || "",
          imageUrl: payload.data.image_url || "",
          email: payload.data.email_addresses[0].email_address || "",
        },
      });
    }

    // delete user
    if (eventType === "user.deleted") {
      console.log("here delete the call");
      await db.user.delete({
        where: {
          externalUserId: payload.data.id,
        },
      });
      return NextResponse.redirect(new URL("/", req.url));
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    return new Response("An unexpected error occurred", { status: 500 });
  }
}

//https://apt-freely-bear.ngrok-free.app/api/webhooks/clerk
