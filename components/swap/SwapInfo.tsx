type Props = {
  rate: number;
  loading?: boolean;
  fee?: string;
  route?: string;
};

export default function SwapInfo({
  rate,
  loading = false,
  fee = "--",
  route = "--",
}: Props) {
  return (
    <div className="mt-5 rounded-2xl bg-zinc-900/60 p-4">
      <div className="space-y-3 text-sm">

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Exchange Rate
          </span>

          <span className="font-medium text-white">
            {loading ? "Loading..." : rate > 0 ? rate.toFixed(4) : "--"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Estimated Gas
          </span>

          <span className="font-medium text-white">
            {fee}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Route
          </span>

          <span className="font-medium text-white">
            {route}
          </span>
        </div>

      </div>
    </div>
  );
}