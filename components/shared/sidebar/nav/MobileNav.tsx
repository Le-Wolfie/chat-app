"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversation } from "@/hooks/useConversation";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const MobileNav = () => {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) {
    return null;
  }

  return (
    <Card className='lg:hidden flex items-center fixed bottom-4 h-16 p-2 w-[calc(100vw-32px)]'>
      <nav className='w-full'>
        <ul className='flex justify-evenly gap-4'>
          {paths.map((path, id) => {
            return (
              <li className='relative' key={id}>
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size='icon'
                        variant={path.active ? "default" : "outline"}
                      >
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    {path.count ? (
                      <Badge className='absolute left-7 bottom-6 px-2'>
                        {path.count}
                      </Badge>
                    ) : null}
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
