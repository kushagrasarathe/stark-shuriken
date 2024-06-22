"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

const netwroks = ["mainnet", "sepolia"];

const transactionTypes = ["INVOKE", "DECLARE", "DEPLOY_ACCOUNT"];

export default function ConfigureTransaction() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("mainnet");
  const [usePendingBlock, setUsePendingBlock] = useState<boolean>(false);
  const [skipFlags, setSkipFlags] = useState<boolean>(false);
  const [selectedDataInputType, setSelectedDataInputType] =
    useState<string>("raw");
  const [selectedTransactionType, setSelectedTransactionType] =
    useState("INVOKE");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [rawInputData, setRawInputData] = useState<string>("");
  const [blockNumber, setBlockNumber] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [calldata, setCalldata] = useState<string>("");
  const [entrypoint, setEntrypoint] = useState<string>("");
  const [senderAddress, setSenderAddress] = useState<string>("");
  const [compiledHash, setCompiledHash] = useState<string>("");
  const [classHash, setClassHash] = useState<string>("");
  const [constructorCalldata, setConstructorCalldata] = useState<string>("");
  const [addressSalt, setAddressSalt] = useState<string>("");
  const [nonce, setNonce] = useState<string>("");
  const [maxFee, setMaxFee] = useState<string>("");
  const [version, setVersion] = useState<string>("");

  const handleSubmit = () => {
    // Perform form submission logic here
    console.log({
      selectedNetwork,
      usePendingBlock,
      skipFlags,
      selectedDataInputType,
      selectedTransactionType,
      contractAddress,
      rawInputData,
      blockNumber,
      signature,
      calldata,
      entrypoint,
      senderAddress,
      compiledHash,
      classHash,
      constructorCalldata,
      addressSalt,
    });
    console.log("Form submitted");
  };

  return (
    <div
      //   onSubmit={handleSubmit}
      className="flex items-start justify-normal w-full gap-4 relative"
    >
      <div className="flex flex-col w-full gap-4 sticky top-8">
        <div>
          <div className="text-2xl font-semibold">Stark Shuriken</div>
          <div className="text-sm font-light text-neutral-500">
            Simulate transactions on StarkNet
          </div>
        </div>
        <Card className="w-full rounded-lg p-2 bg-indigo-500/5">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">
              Simulation Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div>Contract Address</div>
              <Input
                placeholder="e.g: 0x07b696af58c967c1b14c9dde0ace001720635a660a8e90c565ea459345318b30"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2 ">
              <div>Select Network Address</div>
              <div className="flex items-stretch gap-3">
                {netwroks.map((network) => (
                  <div
                    key={network}
                    className="w-full"
                    onClick={() => {
                      setSelectedNetwork(network);
                    }}
                  >
                    <Card
                      className={cn(
                        selectedNetwork === network
                          ? "bg-indigo-100 hover:bg-indigo-100/90 border border-indigo-200 text-black"
                          : "bg-white hover:bg-white/90",
                        `w-full rounded-lg cursor-pointer`
                      )}
                    >
                      <div className="text-center capitalize py-4 font-[500] text-sm">
                        {network}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <RadioGroup
              defaultValue="raw"
              value={selectedDataInputType}
              onValueChange={(event) => {
                setSelectedDataInputType(event);
              }}
              className="flex items-center justify-normal gap-5 py-2"
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem
                  value="functions_and_params"
                  id="functions_and_params"
                />
                <Label htmlFor="functions_and_params">
                  Functions and parameters
                </Label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="raw" id="raw" />
                <Label htmlFor="raw">Raw</Label>
              </div>
            </RadioGroup>

            {selectedDataInputType === "raw" ? (
              <Textarea
                placeholder="raw input data"
                cols={4}
                className="resize-none"
                value={rawInputData}
                onChange={(e) => setRawInputData(e.target.value)}
              />
            ) : (
              <div className="flex items-stretch gap-3"></div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="w-full rounded-lg p-2 bg-indigo-500/5">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">
            Transaction Parameters
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="use_pending_block"
                onCheckedChange={(checked) => {
                  setUsePendingBlock(checked);
                }}
              />
              <Label htmlFor="use_pending_block">Use pending block</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="skipFlags"
                onCheckedChange={(checked) => {
                  setSkipFlags(checked);
                }}
              />
              <Label htmlFor="skipFlags">
                Skip Flags {`( Execute, FeeCharge, Validate )`}
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <div>Block Number</div>
            <Input
              disabled={usePendingBlock}
              placeholder="e.g: 3232882"
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
            />
            <div className="text-xs text-neutral-500">
              Current block: 3232882
            </div>
          </div>

          <div className="space-y-2">
            <div>Select transaction type</div>
            <div className="flex items-stretch gap-3 flex-wrap">
              {transactionTypes.map((type) => (
                <div
                  key={type}
                  className="w-64"
                  onClick={() => {
                    setSelectedTransactionType(type);
                  }}
                >
                  <Card
                    className={cn(
                      selectedTransactionType === type
                        ? "bg-indigo-100 hover:bg-indigo-100/90 border border-indigo-200 text-black"
                        : "bg-white hover:bg-white/90",
                      "w-full rounded-lg cursor-pointer"
                    )}
                  >
                    <div className="text-center capitalize py-4 font-[500] text-sm">
                      {type}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div>Signature</div>
            <Input type="number" placeholder="e.g: 3" />
            <div className="text-xs text-neutral-500">
              use comma for multiple values
            </div>
          </div>

          <div className="space-y-2">
            <div>Signature</div>
            <Input
              type="text"
              placeholder="e.g: 3"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
            <div className="text-xs text-neutral-500">
              use comma for multiple values
            </div>
          </div>

          {selectedTransactionType === "INVOKE" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div>Calldata</div>
                <Input
                  type="text"
                  placeholder="enter constructor calldata"
                  value={calldata}
                  onChange={(e) => setCalldata(e.target.value)}
                />
                <div className="text-xs text-neutral-500">
                  use comma for multiple values
                </div>
              </div>
              <div className="space-y-2">
                <div>Entrypoint</div>
                <Input
                  placeholder="e.g: 0x0000000000000000000000000000000000000000000"
                  value={entrypoint}
                  onChange={(e) => setEntrypoint(e.target.value)}
                />
              </div>
            </div>
          )}

          {selectedTransactionType === "DECLARE" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div>Sender Address</div>
                <Input
                  placeholder="e.g: 0x0000000000000000000000000000000000000000000"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div>Compiled Hash</div>
                <Input
                  type="text"
                  placeholder="enter compiled hash"
                  value={compiledHash}
                  onChange={(e) => setCompiledHash(e.target.value)}
                />
              </div>
            </div>
          )}

          {selectedTransactionType === "DEPLOY_ACCOUNT" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div>Class Hash</div>
                <Input
                  placeholder="enter class hash"
                  value={classHash}
                  onChange={(e) => setClassHash(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div>Constructor calldata</div>
                <Input
                  type="text"
                  placeholder="enter constructor calldata"
                  value={constructorCalldata}
                  onChange={(e) => setConstructorCalldata(e.target.value)}
                />
                <div className="text-xs text-neutral-500">
                  use comma for multiple values
                </div>
              </div>

              <div className="space-y-2">
                <div>Address salt</div>
                <Input
                  type="text"
                  placeholder="enter address salt"
                  value={addressSalt}
                  onChange={(e) => setAddressSalt(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div>Nonce</div>
            <Input
              type="text"
              placeholder="nonce value"
              value={nonce}
              onChange={(e) => setNonce(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div>Max Fee</div>
            <Input
              type="text"
              placeholder="e.g: 8000000"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div>Version</div>
            <Input
              type="text"
              placeholder="e.g: 3"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
        </CardContent>
        <div className="px-6 pb-4">
          <Button variant={"default"} onClick={handleSubmit} className="w-full">
            Simulate Transaction
          </Button>
        </div>
      </Card>
    </div>
  );
}
