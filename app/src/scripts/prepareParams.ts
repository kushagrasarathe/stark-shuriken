async function main() {
  const calldata = JSON.stringify([
    "0x01",
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    "0x0219209e083275171774dab1df80982e9df2096516f06319c5c6d71ae0a8480c",
    "0x03",
    "0x06f52ba412b2b8fd27bd552f734265bf0071808587aca3552bd80bb58e17741a",
    "0x01",
    "0x00",
  ]);

  console.log(calldata);

  const signature = JSON.stringify([
    "0x565da8b0a0b6437b8194dfac8dcd853c9f45dce495e49414209a80992f91696",
    "0x3ee9bdc4326d57df85d4c97a9ecaddbdb63937aa35b19092c11594e05aee9c3",
  ]);

  console.log(signature);
}

main();
