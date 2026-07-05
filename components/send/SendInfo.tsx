"use client";

type Props = {
  estimate: any;
};

export default function SendInfo({
  estimate,
}: Props) {
  const fee =
    estimate?.fee ??
    estimate?.fees?.provider?.[0]
      ?.amount ??
    "--";

  const gas =
    estimate?.gas ??
    "--";

  const gasPrice =
    estimate?.gasPrice ??
    "--";

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-4
        text-sm
      "
    >
      <div className="flex justify-between">

        <span className="text-slate-400">
          Estimated Fee
        </span>

        <span className="font-medium text-white">
          {String(fee)}
        </span>

      </div>

      <div className="mt-3 flex justify-between">

        <span className="text-slate-400">
          Gas
        </span>

        <span className="font-medium text-white">
          {String(gas)}
        </span>

      </div>

      <div className="mt-3 flex justify-between">

        <span className="text-slate-400">
          Gas Price
        </span>

        <span className="font-medium text-white">
          {String(gasPrice)}
        </span>

      </div>

      <div className="mt-3 flex justify-between">

        <span className="text-slate-400">
          Network
        </span>

        <span className="font-medium text-white">
          Arc Testnet
        </span>

      </div>

    </div>
  );
}
