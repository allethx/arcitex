import TokenButton from "./TokenButton";

type Props = {
  value: string;
  token: string;
  onChange: (value: string) => void;
  onSelect: () => void;
};

export default function SwapInput({
  value,
  token,
  onChange,
  onSelect,
}: Props) {
  return (
    <div className="rounded-2xl bg-zinc-800 p-4">

      <p className="mb-2 text-sm text-zinc-400">
        You Pay
      </p>

      <div className="flex items-center justify-between">

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
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