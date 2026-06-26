import { Settings2 } from "lucide-react";

export default function SwapHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-semibold">
        Swap
      </h2>

      <button
        className="
          rounded-xl
          p-2
          transition
          hover:bg-zinc-800
        "
      >
        <Settings2 className="h-5 w-5" />
      </button>
    </div>
  );
}