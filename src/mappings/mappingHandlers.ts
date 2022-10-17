import { Transfer } from "../types";
import { EthermintEvmEvent } from "@subql/ethermint-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  tokenId: BigNumber;
};

//Save transfer
export async function handleTransfer(
  event: EthermintEvmEvent<TransferEventArgs>
): Promise<void> {

  const transfer = Transfer.create({
    id: event.transactionHash,
    from: event.args.from,
    to: event.args.to,
    tokenId: event.args.tokenId.toBigInt()
  });

  await transfer.save();
}
