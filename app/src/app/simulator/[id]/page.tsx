"use client";

import SimulationDetailsTabs from "@/components/simulation-details-tabs";
import TransactionBadge from "@/components/transaction-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulationResponse } from "@/types";
import { getSimulateTransactionResponse } from "@/utils/apiMethod";
import { Check, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface DataObject {
  [key: string]: any;
}

export default function SimulationDetails() {
  const path = usePathname();
  const simulationId = path.split("/")[2];
  const [simulationDetails, setSimulationDetails] =
    useState<null | SimulationResponse>(null);

  const renderKeyValuePairs = (obj: DataObject) => {
    return Object.entries(obj).map(([key, value]) => (
      <div key={key}>
        <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
      </div>
    ));
  };

  useEffect(() => {
    const data = getSimulateTransactionResponse(simulationId);

    if (data) {
      data.then((data) => {
        if (data) {
          setSimulationDetails(data as SimulationResponse);
        }
      });
    }
    // console.log({ simulationDetails }, simulationDetails?.isSuccess);
  }, []);

  return (
    <Card className="w-full rounded-lg p-2 bg-indigo-500/5">
      <CardHeader>
        <CardTitle className="font-normal">Simulation Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* <div className="space-y-1">
          <span className="text-sm text-neutral-500">Hash</span>
          <div className="flex items-center gap-2">
            <span className="text-base tracking-wide">
              transaction Hash here
            </span>
          </div>
        </div> */}
        <div className="flex items-center justify-between md:max-w-xl">
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">TYPE</div>
            <TransactionBadge type={"INVOKE"} />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">TIMESTAMP</div>
            <div>5/10/2024, 10:10:10 AM</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-neutral-500">STATUS</div>
          <div className="relative flex items-center">
            {simulationDetails?.isSuccess ? (
              <Badge className="group flex w-fit cursor-pointer items-center gap-2 px-3 py-1.5 hover:pr-5 bg-green-700 text-white hover:bg-green-800">
                <Check className="size-4 group-hover:translate-x-1" />
                <div className="text-xs font-normal group-hover:translate-x-1">
                  Success
                </div>
              </Badge>
            ) : (
              <Badge className="group flex w-fit cursor-pointer items-center gap-2 px-3 py-1.5 hover:pr-5 bg-red-600 text-white hover:bg-red-700">
                <X className="size-4 group-hover:translate-x-1" />
                <div className="text-xs font-normal group-hover:translate-x-1">
                  Failed
                </div>
              </Badge>
            )}
          </div>
        </div>

        {simulationDetails?.llmResponse ? (
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">REASON</div>
            <div>
              <div className="relative flex items-center bg-neutral-800 text-white p-3 px-4 rounded-md">
                <pre
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {simulationDetails?.llmResponse?.variables &&
                    renderKeyValuePairs(
                      simulationDetails?.llmResponse?.variables
                    )}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">REASON</div>
            <div className="relative flex items-center bg-neutral-800 text-white p-3 px-4 rounded-md">
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {simulationDetails?.error}
              </pre>
            </div>
          </div>
        )}

        <div>
          <SimulationDetailsTabs
            simulationDetails={simulationDetails as SimulationResponse}
          />
        </div>
      </CardContent>
    </Card>
  );
}
