import { createFileRoute } from "@tanstack/react-router";
import { FeaturePage, IMAGES, meta } from "@/components/site";

export const Route = createFileRoute("/battery")({
  head: () => meta("Battery Performance — NovaWatch", "Up to 14 days of battery life and fast magnetic charging with NovaWatch."),
  component: () => (
    <FeaturePage
      eyebrow="Battery Performance"
      title="Two weeks. One charge."
      intro="An efficient custom chip and intelligent power management let NovaWatch go further between charges."
      image={IMAGES.battery}
      sections={[
        { title: "Long battery life", text: "Up to 14 days of typical use, or 7 days with the always-on display enabled." },
        { title: "Fast charging", text: "Magnetic fast charging delivers 50% in 20 minutes and a full charge in under an hour." },
        { title: "Power saver", text: "Extended mode keeps essential tracking and time running for up to 30 days." },
      ]}
      benefits={["Track sleep every night without worrying", "Travel for a week without a charger", "Top up during your morning shower", "Smart alerts before battery runs low"]}
      specs={[["Typical use", "Up to 14 days"], ["Always-on display", "Up to 7 days"], ["Power saver", "Up to 30 days"], ["Fast charge", "0–50% in 20 min"], ["Charger", "Magnetic USB-C"]]}
    />
  ),
});
