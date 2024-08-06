"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { error } from "console";
import { ConvexError } from "convex/values";
import { Check, User, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {
  const { mutate: rejectRequest, pending: rejectPending } = useMutationState(
    api.request.reject
  );

  const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
    api.request.accept
  );

  return (
    <Card className='flex w-full p-2 flex-row items-center justify-between gap-2'>
      <div className='flex items-center gap-4 truncate'>
        <Avatar>
          <AvatarImage src={imageUrl} alt={username} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col truncate'>
          <h4 className='truncate'>{username}</h4>
          <p className='text-xs text-muted-foreground truncate'>{email}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          size='icon'
          disabled={acceptPending}
          onClick={() => {
            acceptRequest({ id })
              .then(() => {
                toast.success("Friend request accepted!");
              })
              .catch((error) => {
                if (error instanceof ConvexError) {
                  toast.error(error.data);
                } else {
                  toast.error("Unexpected error");
                }
              });
          }}
        >
          <Check />
        </Button>
        <Button
          size='icon'
          disabled={rejectPending}
          variant={"destructive"}
          onClick={() => {
            rejectRequest({ id })
              .then(() => {
                toast.success("Friend request rejected.");
              })
              .catch((error) => {
                if (error instanceof ConvexError) {
                  toast.error(error.data);
                } else {
                  toast.error("Unexpected error");
                }
              });
          }}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
};

export default Request;
