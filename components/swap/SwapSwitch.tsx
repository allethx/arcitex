import { ArrowDownUp } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function SwapSwitch({
  onClick,
}: Props) {
  return (
    <div className="my-3 flex justify-center">
      <button
        onClick={onClick}
        className="
          rounded-full
          border
          border-zinc-700
          bg-zinc-800
          p-3
          transition
          hover:rotate-180
        "
      >
        <ArrowDownUp className="h-5 w-5" />
      </button>
    </div>
  );
}