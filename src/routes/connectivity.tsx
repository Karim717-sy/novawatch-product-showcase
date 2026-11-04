import { createFileRoute } from "@tanstack/react-router";
import { FeaturePage, IMAGES, meta } from "@/components/site";

export const Route = createFileRoute("/connectivity")({
  head: () => meta("Smart Connectivity — NovaWatch", "Notifications, calls and seamless smartphone connectivity on your wrist with NovaWatch."),
  component: () => (
    <FeaturePage
      eyebrow="Smart Connectivity"
      title="Stay connected, hands free."
      intro="NovaWatch pairs instantly with your phone so messages, calls and apps are always a glance away."
      image={IMAGES.connect}
      sections={[
        { title: "Notifications", text: "Messages, emails and app alerts arrive instantly, with quick replies and smart filtering for what matters." },
        { title: "Calls", text: "Answer and make calls directly from your wrist with a built-in speaker and noise-cancelling microphone." },
        { title: "Phone sync", text: "Bluetooth 5.3 and Wi-Fi keep your watch in sync with iOS and Android — music, maps and payments included." },
      ]}
      benefits={["Leave your phone in your pocket", "Never miss an important call", "Pay with a tap using NFC", "Control music and smart-home devices"]}
      specs={[["Bluetooth", "5.3 Low Energy"], ["Wi-Fi", "802.11 b/g/n"], ["NFC", "Contactless payments"], ["Compatibility", "iOS 15+ / Android 9+"], ["Audio", "Speaker + dual mics"]]}
    />
  ),
});
