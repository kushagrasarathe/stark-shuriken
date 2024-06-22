import ConfigureTransaction from "@/components/configure-transaction";
"use client";
import { startSimulateTransaction } from "@/utils/apiMethod";
import Image from "next/image";
import { TransactionType } from "starknet";

export default function Home() {
  const handleSimulate = async () => {
    await startSimulateTransaction({
      blockId: "latest",
      transaction: {
        type: TransactionType.INVOKE,
        version: "0x1",
        contractAddress:
          "0x00fff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
        entrypoint: "burn",
        calldata: ["0xfa98", "0x00"],
        maxFee: "0x0",
        signature: [
          "0x1",
          "0x7811a391737bd7de21fa99e5e99bfb5fb8105d9c46f6fc05949f619aa8e5d17",
          "0x3dd4032745750c7c6026c59fa1508dc2548c447b990c9600654fd2bcb155c3d",
        ],
        nonce: "0x0",
      },
      skipExecute: false,
      skipFeeCharge: false,
      skipValidate: false,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <button onClick={handleSimulate}>Simulate</button>
        </div>
      </div>
    </main>
  );
}
