import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/backend";

const validatePayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-signature": req.headers.get("svix-signature")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
    return event;
  } catch (e) {
    console.error("Error validating webhook payload", e);
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  // Handle the webhook
  const event = await validatePayload(req);

  if (!event) {
    return new Response("Could not validate Clerk payload", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created":
      const user = await ctx.runQuery(internal.user.get, {
        clerkId: event.data.id,
      });

      if (user) {
        console.log("Updating user", event.data.id);
      }
    case "user.updated":
      await ctx.runMutation(internal.user.create, {
        // if the user's last name is empty, we'll just use the first name
        username: event.data.last_name
          ? `${event.data.first_name} ${event.data.last_name}`
          : `${event.data.first_name}`,
        imageUrl: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
      });
      break;

    default:
      console.log("Unhandled event", event.type);
  }

  return new Response("OK", {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
