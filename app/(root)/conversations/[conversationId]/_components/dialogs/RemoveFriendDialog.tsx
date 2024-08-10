"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type Props = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const RemoveFriendDialog = ({ conversationId, open, setOpen }: Props) => {
  const { mutate: removeFriend, pending } = useMutationState(api.friend.remove);

  const handleRemoveFriend = async () => {
    await removeFriend({
      conversationId,
    })
      .then(() => {
        toast.success("Friend removed");
        setOpen(false);
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError ? error.data : "Unexpected error"
        );
      });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove this friend?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All messages will be deleted and you
            won't be able to send messages to this user anymore.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveFriend} disabled={pending}>
            Remove friend
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFriendDialog;
