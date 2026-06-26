import TokenButton from "./TokenButton";

type Props = {
  value: string;
  token: string;
  onSelect: () => void;
};

export default function SwapOutput({
  value,
  token,
  onSelect,
}: Props) {
  return (
    <div className="rounded-2xl bg-zinc-800 p-4">

      <p className="mb-2 text-sm text-zinc-400">
        You Receive
      </p>

      <div className="flex items-center justify-between">

        <input
          value={value}
          readOnly
          placeholder="0.0"
          className="w-36 bg-transparent text-3xl font-semibold outline-none"
        />

        <TokenButton
          symbol={token}
          onClick={onSelect}
        />

      </div>

    </div>
  );
}