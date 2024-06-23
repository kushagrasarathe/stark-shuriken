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
      blockId: "latest",
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
        maxFee: "0xaf9e7a00a66",
        signature: [
          "0x565da8b0a0b6437b8194dfac8dcd853c9f45dce495e49414209a80992f91696",
          "0x3ee9bdc4326d57df85d4c97a9ecaddbdb63937aa35b19092c11594e05aee9c3",
        ],
        nonce: "0xcc",
      },
      skipExecute: false,
      skipFeeCharge: false,
      skipValidate: false,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConfigureTransaction />
      <button onClick={handleSimulate}>Simulate</button>
    </main>
  );
}
