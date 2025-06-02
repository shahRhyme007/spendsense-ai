import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/prisma";

export async function POST(req) {
  try {
    // Get the headers
    const headerPayload = req.headers;
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.text();
    const body = JSON.parse(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    // Handle the webhook
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", body);

    switch (eventType) {
      case "user.created":
        // User created - we already handle this in checkUser()
        console.log("User created:", evt.data);
        break;

      case "user.updated":
        // Update user data in database
        try {
          await db.user.update({
            where: { clerkUserId: evt.data.id },
            data: {
              name: `${evt.data.first_name} ${evt.data.last_name}`,
              email: evt.data.email_addresses[0]?.email_address,
              imageUrl: evt.data.image_url,
            },
          });
          console.log("User updated successfully");
        } catch (error) {
          console.error("Error updating user:", error);
        }
        break;

      case "user.deleted":
        // Delete user and all related data from database
        try {
          console.log("Deleting user:", evt.data.id);
          
          // Delete user and all related data (cascading deletes will handle accounts, transactions, budgets)
          await db.user.delete({
            where: { clerkUserId: evt.data.id },
          });
          
          console.log("User and all related data deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
        }
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
} 