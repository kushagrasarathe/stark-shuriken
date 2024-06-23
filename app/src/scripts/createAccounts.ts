import {
  Account,
  ec,
  json,
  stark,
  RpcProvider,
  hash,
  CallData,
} from "starknet";
import dotenv from "dotenv";
dotenv.config();

function main() {
  // connect provider
  const provider = new RpcProvider({
    nodeUrl: process.env.STARKNET_RPC_URL,
    headers: {
      "x-apikey": process.env.STARKNET_RPC_KEY,
    },
  });

  //new Argent X account v0.2.3
  const argentXproxyClassHash =
    "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
  const argentXaccountClassHash =
    "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";

  // Generate public and private key pair.
  const privateKeyAX = stark.randomAddress();
  console.log("AX_ACCOUNT_PRIVATE_KEY=", privateKeyAX);
  const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
  console.log("AX_ACCOUNT_PUBLIC_KEY=", starkKeyPubAX);

  // Calculate future address of the ArgentX account
  const AXproxyConstructorCallData = CallData.compile({
    implementation: argentXaccountClassHash,
    selector: hash.getSelectorFromName("initialize"),
    calldata: CallData.compile({ signer: starkKeyPubAX, guardian: "0" }),
  });
  const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentXproxyClassHash,
    AXproxyConstructorCallData,
    0
  );
  console.log("Precalculated account address=", AXcontractAddress);
}

main();
