"use client";
import { Card } from "@/components/ui/card";
import { useConversation } from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import React from "react";

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ children, title, action }: Props) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn("hidden h-full w-full lg:flex-none lg:w-80 p-2", {
        block: !isActive,
        "lg:block": isActive,
      })}
    >
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          {title}
          {action ? action : null}
        </h1>
      </div>
      <div className='w-full h-full flex flex-col items-center justify-start gap-2'>
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
