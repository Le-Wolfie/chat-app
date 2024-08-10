"use client";
import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import ItemList from "@/components/shared/item-list/ItemList";
import AddFriendDialog from "./_components/AddFriendDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import Request from "./_components/Request";

const FriendsPage = () => {
  const requests = useQuery(api.request.get);

  return (
    <>
      <ItemList title='Friends' action={<AddFriendDialog />}>
        {requests ? (
          requests.length === 0 ? (
            <p className='w-full h-full flex items-center justify-center'>
              You have no friend requests!
            </p>
          ) : (
            requests.map((request) => {
              return (
                <Request
                  key={request.request._id}
                  id={request.request._id}
                  imageUrl={request.sender.imageUrl}
                  username={request.sender.username}
                  email={request.sender.email}
                />
              );
            })
          )
        ) : (
          <Loader2 className='animate-spin w-8 h-8' />
        )}
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
