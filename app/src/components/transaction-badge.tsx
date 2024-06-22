import { cn } from "@/lib/utils";
import { TTransactionType } from "@/types";
import React from "react";
import { Badge } from "./ui/badge";
import { ButtonProps } from "./ui/button";

interface BadgeProps {
  type: TTransactionType;
}

const typeColors: Record<TTransactionType, ButtonProps["className"]> = {
  DECLARE:
    "bg-[#202e26] hover:bg-[#202e26] border border-[#6b7d07] text-[#feffb5]",
  DEPLOY:
    "bg-[#223655] hover:bg-[#223655] border border-[#3C506E] text-[#d2e5ff]",
  DEPLOY_ACCOUNT:
    "bg-[#223655] hover:bg-[#223655] border border-[#3C506E] text-[#d2e5ff]",
  INVOKE:
    "bg-[#202e26] hover:bg-[#202e26] border border-[#2E4C3C] text-[#82f4bb]",
  L1_HANDLER:
    "bg-[#383838] hover:bg-[#383838] border border-[#5E5E5E] text-white",
};

const TransactionBadge: React.FC<BadgeProps> = ({ type }) => {
  const colorClass = typeColors[type] || "bg-gray-500 text-white";

  return (
    <Badge className={cn(colorClass, "rounded px-2 py-1 font-normal")}>
      {type.toUpperCase()}
    </Badge>
  );
};

export default TransactionBadge;
