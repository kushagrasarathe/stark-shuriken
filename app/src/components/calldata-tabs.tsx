import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, separateDataFormats } from "@/lib/utils";
import React from "react";
import TabRow from "./tab-row";
import { Card } from "./ui/card";

interface CalldataTabsProps {
  calldata: string[];
}

const CalldataTabs: React.FC<CalldataTabsProps> = ({ calldata }) => {
  const tabs = ["Hex", "Dec", "Text"];

  const data = separateDataFormats(calldata);

  return (
    <Card className="w-full rounded-lg px-4 py-6 bg-indigo-400/10">
      <Tabs defaultValue="Hex" className="w-full">
        <TabsList className="flex w-max items-stretch justify-normal rounded-sm border p-0 border-gray-600 bg-transparent mb-5">
          {tabs.map((tab, idx) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                "border-r text-sm font-normal text-foreground border-gray-600 bg-transparent data-[state=active]:bg-secondary-2",
                idx === tabs.length - 1 && "border-r-0"
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={"Hex"}>
          <Card className="w-full rounded-lg p-3">
            {data.hex.map((item, idx) => (
              <TabRow key={idx} text={item.toString()} />
            ))}
            {!data.hex.length && (
              <span className="text-neutral-400">Not Available</span>
            )}
          </Card>
        </TabsContent>
        <TabsContent value={"Dec"}>
          <Card className="w-full rounded-lg p-3">
            {data.dec.map((item, idx) => (
              <TabRow key={idx} text={item.toString()} />
            ))}
            {!data.dec.length && (
              <span className="text-neutral-400">Not Available</span>
            )}
          </Card>
        </TabsContent>
        <TabsContent value={"Text"}>
          <Card className="w-full rounded-lg p-3">
            {data.text.map((item, idx) => (
              <TabRow key={idx} text={item.toString()} />
            ))}
            {!data.text.length && (
              <span className="text-neutral-400">Not Available</span>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CalldataTabs;
