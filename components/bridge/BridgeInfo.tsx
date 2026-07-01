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
          border-zinc-800
          bg-zinc-950/50
          p-4
        "
      >
        <p className="text-sm text-zinc-400">
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
        border-zinc-800
        bg-zinc-950/50
        p-4
      "
    >
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            Route
          </span>

          <span className="text-right text-sm font-semibold text-white">
            {route}
          </span>
        </div>

        <div className="border-t border-zinc-800 pt-4">

          <h3 className="mb-4 text-sm font-semibold text-zinc-300">
            Estimated Network Fees
          </h3>

          {gasFees.length ===
            0 && (
            <p className="text-sm text-zinc-500">
              No gas estimate
              available.
            </p>
          )}

          <div className="space-y-4">

            {gasFees.map(
              (
                item,
                index,
              ) => (
                <div
                  key={`${item.name}-${index}`}
                  className="
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900/50
                    p-3
                  "
                >
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="font-medium text-white">
                        {item.name}
                      </p>

                      <p className="text-xs text-zinc-500">
                        {formatChain(
                          item.blockchain,
                        )}
                      </p>
                    </div>

                    <div className="text-right space-y-2">

                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                          Fee
                        </p>

                        <p className="text-sm font-semibold text-white">
                          {item
                            .fees
                            ?.fee ??
                            "--"}{" "}
                          {
                            item.token
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                          Gas
                        </p>

                        <p className="text-sm text-zinc-300">
                          {formatGas(
                            item
                              .fees
                              ?.gas,
                          )}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              ),
            )}

          </div>

        </div>

      </div>
    </div>
  );
}