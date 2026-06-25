export default function SwapInfo() {
  return (
    <div className="mt-5 space-y-3 rounded-2xl bg-zinc-900/60 p-4 text-sm">

      <div className="flex justify-between text-zinc-400">
        <span>Rate</span>
        <span>1 ETH = 2,560 USDC</span>
      </div>

      <div className="flex justify-between text-zinc-400">
        <span>Network Fee</span>
        <span>$1.25</span>
      </div>

      <div className="flex justify-between text-zinc-400">
        <span>Route</span>
        <span>Ethereum → Base</span>
      </div>

    </div>
  );
}