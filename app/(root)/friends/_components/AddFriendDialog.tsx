"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
type Props = {};

const addFriendFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Invalid email"),
});

const AddFriendDialog = (props: Props) => {
  const { mutate: createRequest, pending } = useMutationState(
    api.request.create
  );

  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
    await createRequest({
      email: values.email,
    })
      .then(() => {
        form.reset();
        toast.success("Friend request sent!");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError ? error.data : "Unexpected error"
        );
      });
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button size='icon' variant='outline'>
            <DialogTrigger>
              <UserPlus />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add a friend</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a friend</DialogTitle>
          <DialogDescription>
            Send a friend request to someone with their email
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={pending} type='submit'>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
