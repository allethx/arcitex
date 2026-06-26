"use client";

type Props = {
  balance: number;
  amount: string;
};

export function useSwapValidation({
  balance,
  amount,
}: Props) {
  const value = Number(amount);

  if (!amount || isNaN(value)) {
    return {
      valid: false,
      message: "Enter amount",
    };
  }

  if (value <= 0) {
    return {
      valid: false,
      message: "Invalid amount",
    };
  }

  if (value > balance) {
    return {
      valid: false,
      message: "Insufficient Balance",
    };
  }

  return {
    valid: true,
    message: "Swap",
  };
}