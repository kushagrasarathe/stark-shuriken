import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatTimestamp, formatTimestampToDate } from "@/lib/utils";
import React from "react";

import CalldataTabs from "./calldata-tabs";
import TabRow from "./tab-row";
import { Card } from "./ui/card";

const SimulationDetailsTabs: React.FC = () => {
  // const { transactionDetails } = useTransactionsStore();
  const transactionDetails = {
    blockNumber: 1111111,
    timestamp: 1681312000,
    actualFeeUSD: "1.23",
    max_fee: "0",
    gasConsumed: "0",
    sender_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    calldata: [
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x00000",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    ],
    nonce: "0x00000000000000000000000000000000000000000000000000000",
    position: 1,
    version: 1,
    signature: [
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x00000000",
      "0x0000000000000000",
      "0x0000000000000000000000000000000000000000000000000",
      "0x000000000",
    ],
    events: [
      {
        "EVENT NAME": "Transfer",
        "EVENT ARGS":
          "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      },
      {
        "EVENT NAME": "Transfer",
        "EVENT ARGS":
          "0x000000000000000000000000000000000000000000000000000000000000000000000",
      },
    ],
  };

  const tabs = ["Overview", "Events"];

  const transactionDetailsData = [
    {
      "BLOCK NUMBER": transactionDetails?.blockNumber,
      TIMESTAMP: `${formatTimestamp(
        transactionDetails?.timestamp as number
      )} ( ${formatTimestampToDate(transactionDetails?.timestamp as number)} )`,
      "ACTUAL FEE": transactionDetails?.actualFeeUSD,
      "MAX FEE": transactionDetails?.max_fee || "-",
      "GAS CONSUMED": transactionDetails?.gasConsumed || "-",
      "CONTRACT ADDRESS": transactionDetails?.sender_address || "-",
    },
  ];

  return (
    <Tabs defaultValue="Overview" className="w-full">
      <TabsList className="flex w-max items-stretch justify-normal rounded-sm border-0 bg-transparent">
        {tabs.map((tab, idx) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "pb-5 text-sm font-normal text-foreground border-amber-700 bg-transparent data-[state=active]:border-b data-[state=active]:bg-transparent"
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={"Overview"}>
        <div className="space-y-4 py-4">
          <div className="text-xl">Transaction Details</div>
          {transactionDetailsData.map((details, index) =>
            Object.entries(details).map(([key, value]) => (
              <div
                key={`${key}-${index}`}
                className="flex items-center justify-stretch text-sm"
              >
                <div className="w-3/12">{key}:</div>
                <div className="w-9/12 border-b py-2 border-gray-600">
                  {value}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="space-y-4 py-4">
          <div className="text-xl">Developer Info</div>

          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">NONCE:</div>
            <div className="w-9/12 border-b py-2 border-gray-600">
              {transactionDetails?.nonce || "-"}
            </div>
          </div>
          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">POSITION:</div>
            <div className="w-9/12 border-b py-2 border-gray-600">
              {transactionDetails?.position || "-"}
            </div>
          </div>
          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">VERSION:</div>
            <div className="w-9/12 border-b py-2 border-gray-600">
              {transactionDetails?.version || "-"}
            </div>
          </div>

          <div className="flex items-start justify-stretch text-sm">
            <div className="w-3/12">CALLDATA:</div>
            <div className="w-9/12 py-2">
              <CalldataTabs calldata={transactionDetails?.calldata || []} />
            </div>
          </div>

          <div className="flex items-start justify-stretch text-sm">
            <div className="w-3/12">SIGNATURE{`(S)`}:</div>
            <Card className="w-9/12 rounded-lg p-4">
              <div className="border-b pt-2 border-gray-600">
                {transactionDetails?.signature.map((item, idx) => (
                  <TabRow key={idx} text={item} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </TabsContent>
      <TabsContent value={"Events"}>
        {/* <div>
          <EventsTable events={transactionDetails?.events || []} />
        </div> */}
      </TabsContent>
    </Tabs>
  );
};

export default SimulationDetailsTabs;
