import PaymentCard from "@/components/payment/PaymentCard";
import EscrowCard from "@/components/payment/escrow/EscrowCard";

export default function PayPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-4 xl:flex-row xl:items-start xl:justify-center">
      <PaymentCard />
      <EscrowCard />
    </div>
  );
}
