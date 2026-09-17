import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Log in — Arena",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <StubPage
      eyebrow="Accounts"
      title="Log in is coming."
      body="Booking and accounts ship with the first live venues. Until then, everything on Arena is browsable without one."
    />
  );
}
