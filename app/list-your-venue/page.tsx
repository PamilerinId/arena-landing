import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";
import { WHATSAPP_NUMBER } from "@/content/placeholders";

export const metadata: Metadata = {
  title: "List your venue — Arena",
  description:
    "List your pitch, court or gym on Arena and sell the off-peak hours you are not filling.",
};

export default function ListYourVenuePage() {
  return (
    <StubPage
      eyebrow="For venue owners"
      title="Let's get your board on Arena."
      body="Onboarding is still hand-run while we add the first Lagos venues. Message us and we will set your calendar up with you."
    >
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        className="btn btn-primary-dark"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: 32, alignSelf: "flex-start" }}
      >
        Talk to us on WhatsApp
      </a>
    </StubPage>
  );
}
