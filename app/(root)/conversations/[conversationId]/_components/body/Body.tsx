"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import Message from "./Message";
import { useMutationState } from "@/hooks/useMutationState";
import { useEffect } from "react";

type Props = {
  members: {
    lastSeenMessageId?: Id<"messages">;
    username?: string;
    [key: string]: any;
  }[];
};

const Body = ({ members }: Props) => {
  const { conversationId } = useConversation();

  const messages = useQuery(api.message.get, {
    id: conversationId as Id<"conversations">,
  });

  const { mutate: markAsRead } = useMutationState(api.conversations.markRead);

  useEffect(() => {
    if (messages && messages.length > 0) {
      markAsRead({
        conversationId,
        messageId: messages[0].message._id,
      });
    }
  }, [messages?.length, conversationId, markAsRead]);

  const getSeenMessage = (messageId: Id<"messages">) => {
    const seenUser = members
      .filter((member) => member.lastSeenMessageId === messageId)
      .map((member) => member.username!.split(" ")[0]);

    if (seenUser.length === 0) {
      return undefined;
    }

    return formatSeenBy(seenUser);
  };

  const formatSeenBy = (names: string[]) => {
    switch (names.length) {
      case 1:
        return (
          <p className='text-muted-foreground text-sm text-right'>
            Seen by {names[0]}
          </p>
        );
      case 2:
        return (
          <p className='text-muted-foreground text-sm text-right'>
            Seen by {names[0]} and {names[1]}
          </p>
        );
      default:
        return (
          <p className='text-muted-foreground text-sm text-right'>
            Seen by {names[0]}, {names[1]} and {names.length - 2} others
          </p>
        );
    }
  };

  return (
    <div className='flex flex-1 overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar'>
      {messages?.map(
        ({ message, senderImage, senderName, isCurrentUser }, index) => {
          const lastByUser =
            messages[index - 1]?.message.sender ===
            messages[index].message.sender;

          const seenMessage = isCurrentUser
            ? getSeenMessage(message._id)
            : undefined;

          return (
            <Message
              key={message._id}
              fromCurrentUser={isCurrentUser}
              senderImage={senderImage}
              senderName={senderName}
              lastByUser={lastByUser}
              content={message.content}
              seen={seenMessage}
              createdAt={message._creationTime}
              type={message.type}
            />
          );
        }
      )}
    </div>
  );
};

export default Body;
