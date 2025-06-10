import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import WalletIcon from "@/assets/icons/WalletIcon";
import { ConnectButton } from "@/utils/ConnectButton";
import { NetworkStatus, SwitchChainButton } from "@/utils/SwitchChainButton";
import { Button } from "@/components/ui/button";

export function Web3Payment() {

    const { isConnected } = useAccount();

    const PAYMENT_AMOUNT = "0.01"; // ETH
    const RECIPIENT_ADDRESS = process.env.NEXT_PUBLIC_SERVICE_WALLET_ADDRESS;

    // Payment
    const { data: sendTxData, sendTransaction, isPending: isPaying, error: payError } = useSendTransaction();
    const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
        hash: sendTxData,
        query: {
            enabled: !!sendTxData,
        },
    });
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-2xl font-bold flex items-center gap-2"><WalletIcon /> MetaMask Payment</h2>
            <p className="text-gray-300 text-center">To activate your account, please pay <span className="text-blue-400 font-semibold">{PAYMENT_AMOUNT} ETH</span> to our protocol wallet.</p>
            <div className="bg-zinc-800 rounded p-2 text-xs break-all select-all border border-zinc-700">{RECIPIENT_ADDRESS}</div>
            {isConnected ? (
                <Button
                    variant="default"
                    className=" bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isPaying || isTxLoading || isTxSuccess}
                    onClick={RECIPIENT_ADDRESS ? () => sendTransaction({ to: `0x${RECIPIENT_ADDRESS}`, value: parseEther(PAYMENT_AMOUNT) }) : () => alert("Recipient address is not set. Please check your environment variables.")}
                >
                    {isPaying || isTxLoading ? "Processing..." : isTxSuccess ? "Paid!" : `Pay Now`}
                </Button>
            ) : (
                <ConnectButton />
            )}
            <NetworkStatus />
            <SwitchChainButton />
            {payError && <p className="text-red-400 text-xs max-w-[50vw]">{payError.message}</p>}
            {sendTxData && (
                <div className="text-xs text-gray-400">Tx Hash: <a href={`https://etherscan.io/tx/${sendTxData}`} target="_blank" rel="noopener noreferrer" className="underline">{sendTxData}</a></div>
            )}
        </div>
    )
}