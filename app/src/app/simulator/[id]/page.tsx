"use client";

import TransactionBadge from "@/components/transaction-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function SimulationDetails() {
  return (
    <Card className="w-full rounded-lg p-2 bg-indigo-500/5">
      <CardHeader>
        <CardTitle className="font-normal">Simulation Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-1">
          <span className="text-sm text-neutral-500">Hash</span>
          <div className="flex items-center gap-2">
            <span className="text-base tracking-wide">
              transaction Hash here
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between md:max-w-xl">
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">TYPE</div>
            <TransactionBadge type={"DEPLOY_ACCOUNT"} />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">TIMESTAMP</div>
            <div>5/10/2024, 10:10:10 AM</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-neutral-500">STATUS</div>
          <div className="relative flex items-center">
            <Badge className="group flex w-fit cursor-pointer items-center gap-2 px-3 py-1.5 hover:pr-5 bg-green-700 text-white hover:bg-green-800">
              <Check className="size-4 group-hover:translate-x-1" />
              <div className="text-xs font-normal group-hover:translate-x-1">
                ACCEPTED_ON_L2
              </div>
            </Badge>
            {/* <Separator className="w-10 bg-neutral-400 h-px" />

            <div className="flex size-8 items-center justify-center rounded-full border border-gray-400 text-gray-400">
              <LucideLoader2 className="size-7 animate-spin" />
            </div> */}
          </div>
        </div>

        <div>{/* <TransactionDetailsTabs /> */}</div>
      </CardContent>
    </Card>
  );
}
