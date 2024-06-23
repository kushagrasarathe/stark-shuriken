import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatTimestamp, formatTimestampToDate } from "@/lib/utils";

import { SimulationResponse } from "@/types";
import CalldataTabs from "./calldata-tabs";
import TabRow from "./tab-row";
import { Card } from "./ui/card";

const SimulationDetailsTabs = ({
  simulationDetails,
}: {
  simulationDetails: SimulationResponse;
}) => {
  // const { transactionDetails } = useTransactionsStore();
  const transactionDetails = {
    blockNumber: simulationDetails?.simulateArgs.blockId || "",
    timestamp: simulationDetails?.timestamp,
    max_fee: simulationDetails?.simulateArgs.transaction.maxFee || "0",
    sender_address:
      // @ts-ignore
      simulationDetails?.simulateArgs.transaction.contractAddress || "-",
    calldata:
      // @ts-ignore
      simulationDetails?.simulateArgs.transaction?.calldata || [],
    nonce: simulationDetails?.simulateArgs.transaction?.nonce || 0,
    version: simulationDetails?.simulateArgs.transaction.version || 0,
    signature:
      (simulationDetails?.simulateArgs.transaction.signature as []) || [],
    // events: simulationDetails.
  };

  const tabs = ["Overview", "Events"];

  const transactionDetailsData = [
    {
      "BLOCK NUMBER": transactionDetails?.blockNumber,
      TIMESTAMP: `${formatTimestamp(
        transactionDetails?.timestamp as number
      )} ( ${formatTimestampToDate(transactionDetails?.timestamp as number)} )`,
      "MAX FEE": transactionDetails?.max_fee || "-",
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
              {transactionDetails?.nonce.toLocaleString() || "-"}
            </div>
          </div>

          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">VERSION:</div>
            <div className="w-9/12 border-b py-2 border-gray-600">
              {transactionDetails?.version.toString() || "-"}
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
      {/* <TabsContent value={"Events"}>
        <div>
          <EventsTable events={transactionDetails?.events || []} />
        </div> 
      </TabsContent> */}
    </Tabs>
  );
};

export default SimulationDetailsTabs;
