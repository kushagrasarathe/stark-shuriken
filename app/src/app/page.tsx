"use client";
import ConfigureTransaction from "@/components/configure-transaction";
import { startSimulateTransaction } from "@/utils/apiMethod";
import Image from "next/image";
import { TransactionType } from "starknet";

export default function Home() {
  const handleSimulate = async () => {
    // await startSimulateTransaction({
    //   blockId: "latest",
    //   transaction: {
    //     type: TransactionType.INVOKE,
    //     version: "0x1",
    //     contractAddress:
    //       "0x00fff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff",
    //     entrypoint: "burn",
    //     calldata: ["0xfa98", "0x00"],
    //     maxFee: "0x0",
    //     signature: [
    //       "0x1",
    //       "0x7811a391737bd7de21fa99e5e99bfb5fb8105d9c46f6fc05949f619aa8e5d17",
    //       "0x3dd4032745750c7c6026c59fa1508dc2548c447b990c9600654fd2bcb155c3d",
    //     ],
    //     nonce: "0x0",
    //   },
    //   skipExecute: false,
    //   skipFeeCharge: false,
    //   skipValidate: false,
    // });

    await startSimulateTransaction({
      blockId: 75682,
      transaction: {
        type: TransactionType.INVOKE,
        version: "0x1",
        contractAddress:
          "0x04835541fd87cddbc3b48ad08e53ffa1e4d55ab21a46900a969df326c9276326",
        calldata: [
          "0x01",
          "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "0x0219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
          "0x03",
          "0x06f52ba412b2b8fd27bd552f734265bf0071808587aca3552bd80bb58e17741a",
          "0x01",
          "0x00",
        ],
        maxFee: "0x0",
        signature: [
          "0x565da8b0a0b6437b8194dfac8dcd853c9f45dce495e49414209a80992f91696",
          "0x3ee9bdc4326d57df85d4c97a9ecaddbdb63937aa35b19092c11594e05aee9c3",
        ],
        nonce: "0xc3",
      },
      skipExecute: false,
      skipFeeCharge: false,
      skipValidate: false,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConfigureTransaction />
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <button onClick={handleSimulate}>Simulate</button>
        </div>
      </div> */}
    </main>
  );
}
