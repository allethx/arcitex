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
        border-zinc-800
        bg-zinc-950/60
        p-4
        text-sm
      "
    >
      <div className="flex justify-between">

        <span className="text-zinc-500">
          Estimated Fee
        </span>

        <span>
          {String(fee)}
        </span>

      </div>

      <div className="mt-3 flex justify-between">

        <span className="text-zinc-500">
          Gas
        </span>

        <span>
          {String(gas)}
        </span>

      </div>

      <div className="mt-3 flex justify-between">

        <span className="text-zinc-500">
          Gas Price
        </span>

        <span>
          {String(gasPrice)}
        </span>

      </div>

      <div className="mt-3 flex justify-between">

        <span className="text-zinc-500">
          Network
        </span>

        <span>
          Arc Testnet
        </span>

      </div>

    </div>
  );
}