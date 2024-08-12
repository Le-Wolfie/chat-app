"use client";
import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import DMConversationItem from "./_components/DMConversationItem";
import CreateGroupDialog from "./_components/CreateGroupDialog";
import GroupConversationItem from "./_components/GroupConversationItem";

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  return (
    <>
      <ItemList title='Conversations' action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className='flex w-full h-full justify-center items-center'>
              You have no conversations yet, start one!
            </p>
          ) : (
            conversations.map((conversation) => {
              return (
                <div className='w-full' key={conversation.conversation._id}>
                  {conversation.conversation.isGroup ? (
                    <GroupConversationItem
                      key={conversation.conversation._id}
                      id={conversation.conversation._id}
                      name={conversation.conversation.name || ""}
                      lastMessageContent={conversation.lastMessage?.content}
                      lastMessageSender={conversation.lastMessage?.sender}
                    />
                  ) : (
                    <DMConversationItem
                      key={conversation.conversation._id}
                      id={conversation.conversation._id}
                      imageUrl={conversation.otherMember?.imageUrl || ""}
                      username={conversation.otherMember?.username || ""}
                      lastMessageContent={conversation.lastMessage?.content}
                      lastMessageSender={conversation.lastMessage?.sender}
                    />
                  )}
                </div>
              );
            })
          )
        ) : (
          <Loader2 className='animate-spin' />
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConversationsLayout;
