"use client";

type GasFee = {
  name: string;

  token: string;

  blockchain: string;

  fees: {
    fee: string;

    gas: bigint;

    gasPrice: bigint;
  };
};

type Props = {
  estimate?: {
    loading: boolean;

    raw: any;
  };
};

function formatChain(
  chain?: string,
) {
  if (!chain) {
    return "--";
  }

  return chain.replaceAll(
    "_",
    " ",
  );
}

function formatGas(
  gas?: bigint | number,
) {
  if (gas == null) {
    return "--";
  }

  return Number(gas).toLocaleString();
}

export default function BridgeInfo({
  estimate,
}: Props) {
  if (estimate?.loading) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          px-4
          py-3
        "
      >
        <p className="text-sm text-slate-400">
          Estimating bridge...
        </p>
      </div>
    );
  }

  const raw =
    estimate?.raw;

  const gasFees: GasFee[] =
    raw?.gasFees ?? [];

  const route = raw
    ? `${formatChain(
        raw.source?.chain,
      )} → ${formatChain(
        raw.destination?.chain,
      )}`
    : "--";

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
      <div className="flex items-center justify-between">
        <span className="text-slate-400">
          Route
        </span>

        <span className="text-right font-medium text-white">
          {route}
        </span>
      </div>

      {gasFees.length === 0 ? (
        <p className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-500">
          No gas estimate available.
        </p>
      ) : (
        <div className="mt-3 space-y-2 border-t border-white/10 pt-3">

          {gasFees.map(
            (item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-xs text-slate-500">
                  {formatChain(item.blockchain)}
                </span>

                <span className="text-right text-xs font-medium text-white">
                  {item.fees?.fee ?? "--"} {item.token}
                  <span className="ml-1.5 text-slate-500">
                    · Gas {formatGas(item.fees?.gas)}
                  </span>
                </span>
              </div>
            ),
          )}

        </div>
      )}

    </div>
  );
}