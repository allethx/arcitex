export type CircleInstruction = {
  target: string;
  data: string;
  value: string;
  tokenIn?: string;
  amountToApprove?: string;
  tokenOut?: string;
  minTokenOut?: string;
};

export type ExecutionParams = {
  instructions: CircleInstruction[];
};

export type TransactionRequest = {
  from: string;
  to: string;
  data: `0x${string}`;
  value: `0x${string}`;
};

export function buildTransactions(
  executionParams: ExecutionParams,
  fromAddress: string,
): TransactionRequest[] {
  return executionParams.instructions.map(
    (instruction) => ({
      from: fromAddress,

      to: instruction.target,

      data: instruction.data as `0x${string}`,

      value:
        instruction.value === "0"
          ? "0x0"
          : (`0x${BigInt(
              instruction.value
            ).toString(16)}` as `0x${string}`),
    }),
  );
}