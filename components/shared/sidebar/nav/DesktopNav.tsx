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
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    // mobile to desktop approach (hidden by default until lg breakpoint)
    <Card className='hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:px-2 lg:py-4 lg:h-full lg:w-16'>
      <nav>
        <ul className='flex flex-col items-center gap-4'>
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
                      {path.count ? (
                        <Badge className='absolute left-6 bottom-7 px-2'>
                          {path.count}
                        </Badge>
                      ) : null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className='flex flex-col items-center gap-4'>
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
