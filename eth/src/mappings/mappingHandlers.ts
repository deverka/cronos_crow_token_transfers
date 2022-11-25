import { Transfer } from "../types";
import { EthereumLog } from "@subql/types-ethereum";
import { BigNumber } from "@ethersproject/bignumber";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  tokenId: BigNumber;
};

// Save all transfers
export async function handleTransfer(
  log: EthereumLog<TransferEventArgs>
): Promise<void> {
  const transfer = Transfer.create({
    id: log.transactionHash,
    from: log.args.from,
    to: log.args.to,
    tokenId: log.args.tokenId.toBigInt(),
  });

  await transfer.save();
}
