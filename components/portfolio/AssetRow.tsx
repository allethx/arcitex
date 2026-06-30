"use client";

import Image from "next/image";

type Props = {
  symbol: string;
  name: string;
  logo: string;
  balance: string;
  percent: number;
};

export default function AssetRow({
  symbol,
  name,
  logo,
  balance,
  percent,
}: Props) {
  return (
    <div className="px-5 py-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Image
            src={logo}
            alt={symbol}
            width={42}
            height={42}
            className="rounded-full"
          />

          <div>

            <p className="font-semibold text-white">
              {symbol}
            </p>

            <p className="text-sm text-zinc-500">
              {name}
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="font-semibold text-white">
            {balance}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            {percent.toFixed(0)}%
          </p>

        </div>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">

        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-violet-500
            to-cyan-500
            transition-all
            duration-700
          "
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>
  );
}