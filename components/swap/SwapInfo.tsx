"use client";

type Props = {
  rate: string;
  loading: boolean;
  fee: string;
  route: string;
  fromToken: string;
  toToken: string;
};

export default function SwapInfo({
  rate,
  loading,
  fee,
  route,
  fromToken,
  toToken,
}: Props) {
  return (
    <div className="mt-4 space-y-3 rounded-2xl bg-zinc-800 p-4 text-sm">

      <div className="flex items-center justify-between">
        <span className="text-zinc-400">
          Exchange Rate
        </span>

       <span className="font-medium">
        {loading
         ? "Loading..."
          : rate === "--"
         ? "--"
         : `1 ${fromToken} = ${rate} ${toToken}`}
      </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-zinc-400">
          Estimated Fee
        </span>

        <span className="font-medium">
          {loading ? "Loading..." : fee}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-zinc-400">
          Route
        </span>

        <span className="font-medium">
          {route}
        </span>
      </div>

    </div>
  );
}